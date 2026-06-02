'use strict';
// Headless playtest harness: runs the real game logic in a stubbed DOM/canvas/audio
// sandbox, drives the player through every stage, and reports errors + state.
const fs = require('fs'), vm = require('vm');

const path=require('path');
const html = fs.readFileSync(path.join(__dirname,'..','index.html'), 'utf8');
let code = html.match(/<script>([\s\S]*)<\/script>/)[1];

// Inspection / control hooks share lexical scope with the game's top-level `let`s.
code += `
;var __h = {
  start:()=>{ introActive=false; },
  step:(ts)=>loop(ts),
  add:(m)=>{ P.mass+=m; },
  initAudio:()=>{ try{ initAudio(); }catch(e){} },
  evo:()=>{ for(let k=0;k<3;k++) checkEvo(); },
  tap:()=>{ ptr.on=true; ptr.x=P.x+40; ptr.y=P.y; ptr.tap=true; },
  cycle:()=>{ try{ cycleColony(); }catch(e){} },
  micro:()=>({ mode:microMode, shape:colonyShape, cells:cells.length, press:+breakPressure.toFixed(2),
    cmass: cells.reduce((a,c)=>a+c.mass,0)|0,
    spread:(function(){let mx=0;for(const c of cells)mx=Math.max(mx,Math.hypot(c.x-P.x,c.y-P.y));return mx|0;})() }),
  state:()=>({ mass:+P.mass.toFixed(0), stg:P.stg, stage:STAGES[P.stg].name,
    orgs:orgs.length, parts:parts.length,
    titanPhase:(typeof titanPhase!=='undefined'?titanPhase:-1),
    r:Math.round(P.r), zm:+zm.toFixed(3), viewR:Math.round(viewR), frenzy:!!frenzy }),
};`;

const clock = { t: 0 };

// Generic stub: callable, constructable, any property → another stub.
const imgData = new Uint8ClampedArray(1024 * 1024 * 4);
function S() {
  const f = function () {};
  return new Proxy(f, {
    get(t, p) {
      if (p === 'then') return undefined;
      if (p === Symbol.iterator) return undefined;
      if (p === Symbol.toPrimitive) return () => 0;
      if (p === 'length') return 0;
      if (p === 'data') return imgData;
      return S();
    },
    set() { return true; },
    apply() { return S(); },
    construct() { return S(); },
    has() { return true; },
  });
}
// Audio stub with a few real-number props so scheduling math stays finite.
function AG() {
  return new Proxy(function () {}, {
    get(t, p) {
      if (p === 'then') return undefined;
      if (p === 'state') return 'running';
      if (p === 'currentTime') return clock.t / 1000;
      if (p === 'sampleRate') return 44100;
      return AG();
    },
    set() { return true; }, apply() { return AG(); }, construct() { return AG(); },
  });
}
const AudioStub = function () { return AG(); };

const documentStub = {
  hidden: false,
  getElementById: () => S(),
  createElement: () => S(),
  querySelector: () => S(),
  addEventListener: () => {},
  removeEventListener: () => {},
  body: S(),
  fonts: { ready: Promise.resolve(), add(){}, },
};
const windowStub = {
  devicePixelRatio: 2,
  innerWidth: 1280, innerHeight: 720,
  AudioContext: AudioStub, webkitAudioContext: AudioStub,
  addEventListener: () => {}, removeEventListener: () => {},
  requestAnimationFrame: () => 0, cancelAnimationFrame: () => {},
};

const sandbox = {
  console,
  Math, Date, JSON, Array, Object, Number, String, Boolean, Symbol,
  Uint8ClampedArray, Float32Array, Map, Set, parseInt, parseFloat, isFinite, isNaN,
  Infinity, NaN, undefined,
  window: windowStub,
  document: documentStub,
  navigator: { userAgent: 'harness', vibrate: () => {} },
  innerWidth: 1280, innerHeight: 720,
  devicePixelRatio: 2,
  performance: { now: () => clock.t },
  requestAnimationFrame: () => 0,
  cancelAnimationFrame: () => {},
  setTimeout: () => 0,        // suppress async respawns (deterministic frame stepping)
  clearTimeout: () => {},
  setInterval: () => 0, clearInterval: () => {},
  addEventListener: () => {}, removeEventListener: () => {},
  AudioContext: AudioStub, webkitAudioContext: AudioStub,
  Image: function () { return S(); },
};
sandbox.globalThis = sandbox;

vm.createContext(sandbox);
try {
  vm.runInContext(code, sandbox, { filename: 'game.js' });
} catch (e) {
  console.log('LOAD ERROR:', e.message); process.exit(1);
}
console.log('Script loaded OK (init + draw pipeline constructed without error).');

const h = sandbox.__h;
h.initAudio();
h.start();

const errors = [];
let lastStage = -1, lastPhase = -2, lastMicro='single', tapped=false, swarmFrames=0, lastShape='swarm';
const samples = [];
const FRAMES = 6000;

for (let i = 0; i < FRAMES; i++) {
  clock.t += 16;
  // Climb: feed mass briskly until apex, then coast to test stability at the top.
  const st = (() => { try { return h.state(); } catch (e) { return null; } })();
  if (st && st.mass < 13000) h.add(st.stg >= 5 ? 30 : st.stg >= 4 ? 12 : 16);
  try { h.evo(); } catch(e){}  // simulate the eat-triggered evolution check

  try { h.step(clock.t); }
  catch (e) {
    errors.push({ frame: i, msg: e.message, stack: (e.stack || '').split('\n')[1] });
    if (errors.length >= 8) { console.log('Too many errors, stopping early.'); break; }
  }

  const s = (() => { try { return h.state(); } catch (e) { return null; } })();
  if (!s) continue;
  if (s.stg !== lastStage) {
    console.log(`  → frame ${i}: STAGE → ${s.stage} (stg ${s.stg}) @ ${s.mass} mass, zm=${s.zm}, orgs=${s.orgs}, viewR=${s.viewR}`);
    lastStage = s.stg;
  }
  if (s.titanPhase !== lastPhase && s.stg === 4) {
    console.log(`  → frame ${i}: TITAN phase → ${s.titanPhase === 1 ? 'COLOSSUS' : 'AWAKENING'} @ ${s.mass} mass, zm=${s.zm}, orgs=${s.orgs}`);
    lastPhase = s.titanPhase;
  }
  const mc = (()=>{ try { return h.micro(); } catch(e){ return null; } })();
  if (mc) {
    if (mc.mode !== lastMicro) {
      console.log(`  → frame ${i}: MICRO mode → ${mc.mode}  press=${mc.press} cells=${mc.cells} cmass=${mc.cmass}`);
      lastMicro = mc.mode;
    }
    if (mc.mode === 'choice' && !tapped) { h.tap(); tapped = true; console.log(`  → frame ${i}: (harness tapped to divide)`); }
    if (mc.mode === 'swarm') {
      swarmFrames++;
      if (swarmFrames === 120 || swarmFrames === 360 || swarmFrames === 600) { h.cycle(); }
      if (mc.shape !== lastShape) { console.log(`  → frame ${i}: COLONY shape → ${mc.shape}  cells=${mc.cells} spread=${mc.spread} cmass=${mc.cmass}`); lastShape = mc.shape; }
    }
  }
  if (i % 200 === 0) samples.push({ frame: i, ...s, mmode: mc?mc.mode:'?', cells: mc?mc.cells:0 });
}

console.log('\n── State samples ──');
console.log('frame   mass   stage        r     orgs  phase  zm     viewR');
for (const s of samples) {
  console.log(
    String(s.frame).padEnd(7),
    String(s.mass).padEnd(6),
    s.stage.padEnd(12),
    String(s.r).padEnd(5),
    String(s.orgs).padEnd(5),
    String(s.titanPhase).padEnd(6),
    String(s.zm).padEnd(6),
    s.viewR
  );
}

console.log('\n── Result ──');
if (errors.length === 0) {
  console.log('NO RUNTIME ERRORS across', FRAMES, 'frames (MOTE → … → NAGA → PRIMORDIAL → TITAN Awakening → Colossus).');
} else {
  console.log(errors.length, 'runtime error(s):');
  for (const e of errors) console.log(`  frame ${e.frame}: ${e.msg}   ${e.stack || ''}`);
}
