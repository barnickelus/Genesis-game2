# GENESIS — Rebuild II: Levels of Organization (cell → organism → superorganism)

> Resolves two conceptual holes the player named:
> 1. "Are we multicellular before the multicellular phase?" — yes, that was the bug.
> 2. "Prey match my size as I grow" — breaks the scale fantasy; you should OUTSCALE
>    your origins.
> Preserved snapshots: genesis-classic.html (pre-spine) · genesis-v1-apex.html (full
> apex-framed build before this rebuild).

## The corrected arc — three true levels of organization
| Phase | Stages | You are | Prey scale |
|-------|--------|---------|-----------|
| **I · THE CELL** | MOTE · DRIFTER · MEDUSA | a single cell / protist growing in a microbial sea | microbes & plankton |
| **II · THE ORGANISM** | NAGA · PRIMORDIAL · TITAN | a true multicellular animal — you have BECOME a body | small animals (the squid/fish) |
| **III · THE SUPERORGANISM** | (mitosis) → COLONY | many bodies acting as one — hive-mind / colony | (the macro plankton field) |
| **IV · CIVILIZATION** | settlements → trade → rival | organized society | — |

The Singularity / mitosis is no longer "becoming multicellular" (you already were,
as an ORGANISM). It is **organism → superorganism**: one body chooses to become many
acting as one. Faithful, and it keeps every existing creature render.

## Prey scale — OUTSCALE YOUR ORIGINS  🟢 (this layer)
The old "elder scaling" grew prey WITH the player to keep them edible — which made
prey track your size and killed the sense of growth. Replaced:
- Each species has an **organism tier** (microbe → small animal → large animal).
- As you climb, species **below your tier shrink** in relative presence and are
  **culled from spawns**; species **at/above your tier populate**. You literally
  leave your origins behind — early prey dwindle to motes, larger fauna replace them.
- Net: every stage you feel the jump; the things you started among become irrelevant.

## This layer's scope (Rebuild II.1)
- 🟢 Reframe PHASES to the 4 organization levels (CELL/ORGANISM/SUPERORGANISM/
  CIVILIZATION); reword the mitosis beat to organism→superorganism.
- 🟢 Prey scale: kill elder-with-player scaling; add tier-based spawn weighting so
  you outscale origins.

## Rebuild II.2 — microbial LEVEL I + character designs  🟢
- Two new microbe species so the CELL phase reads cellular, not animal:
  · DIATOM — glassy faceted silica shell, rotating lattice + bright core (tier 0).
  · CILIATE — ovoid cell rimmed with beating cilia + contractile vacuole (tier 0).
  Both omni-edible microbes, schooling, wired into PREY_OF / tiers / families /
  VULN; ~24+26 seed the opening sea.
- MOTE reworked from a flat dot into a flagellated cell (membrane, nucleus,
  drifting organelles, whipping tail).
- All render without error; outscale-origins shrinks them as you climb.

## Rebuild II.3 — the cell→organism transition beat  🟢
- The LEVEL I→II boundary (entering NAGA) is now a true metamorphosis, not a normal
  stage-up. A dedicated beat fires: **"YOU KNIT INTO A BODY"** — scattered cells are
  drawn INWARD (three converging implosion waves via `converge()`), then the new body
  blooms outward (burst + double ring + shake + evo chord). It is second in weight
  only to the Singularity, and reads as the moment you stop being a single cell.
- Sequenced through the beat queue: knit beat → stage name → phase card → adaptation
  cards (delayed to 11.5s so the ceremony breathes fully before the choice).
- `transitionBeat(ph, col)` + `converge(x,y,c,n,rad,sp)` helpers; verified clean
  across 6000 frames.

## Rebuild II.4 — larger apex fauna (the ABYSSAL)  🟢
- **ABYSSAL** — a new late-ORGANISM apex predator, bigger and tougher than the
  behemoth (mass 300, r 58–92, hp 100, tier 3). A dark deep-sea body with a dorsal
  spine ridge, a jagged white MAW along its leading edge, a luminous lure on a
  forward stalk, and a cold eye. It hunts everything up to behemoth/grazer (its
  `PREY_OF`), patrols a 320px hunt radius, and carries the narrowest weak-spot arc
  in the game (rear, w 0.55) — the hardest strike, so it stays fearsome until you
  truly outscale it.
- Seeded at PRIMORDIAL (stg≥4) and TITAN (stg≥5) via the evolution burst, and held
  at ~1 by the maintenance loop once you reach its tier — a rare ceiling threat,
  not a farmable meal. Wired into ORGS / PREY_OF / ECO_HUNT_R / ORG_TIER /
  COLOR_FAMILY(red) / VULN. Verified clean across 6000 frames.

## Rebuild II.5 — the enhanced world (sailfish · reefs · medusa rework)  🟢
- **SAILFISH / SLIPSTREAM** — the last lone-predator fork (trait `slipstream`,
  cat `pursuit`). Sustained swimming compounds into a slipstream: up to
  +25/37/50% speed at full stream, with a speed-line wake that goes hot white at
  ram-readiness. At full stream your momentum IS the weapon — a spearing RAM
  (3+2.5/lv damage) that gores prey too big to swallow, spends the stream, and
  grants a glancing blink as you blow through. All four archetypes now live:
  SPIDER · MANTIS · CRAB · SAILFISH.
- **ROCKS & REEFS** — the world gains PLACES. 14 stone clusters (jagged dark
  silhouettes with cool rims) crowned with swaying coral sprigs, seeded in a ring
  through the hunting range each run. Small prey inside a reef read dim on your
  senses (cover, pierced at sense lvl ≥ 3, composing with family camo), and ~30%
  of small/schooling spawns settle into nearby reefs — so reefs become where life
  gathers and where hunters learn to look.
- **POLYP + TENDRIL reworked** (the queued character pass): polyp is now a budding
  colonial animal — oral disc, tentacle-nub crown, two daughter buds pinching off
  mid-division; tendril is a true pulsing medusa whose bell contracts on the same
  phase as its swim pulse, with radial canals, a gonad ring, oral arms and fine
  trailing tentacles.
- Verified: 6000-frame harness clean + 13/13 targeted tests (momentum build,
  speed fold, ram damage/spend/cooldown, reef mask + pierce, render).

## Rebuild II.6 — THE LIVING DEEP (night + murmurations)  🟢
- **THE DEEP DARK** — the ocean breathes on a ~2-minute sim-time cycle (gt-driven,
  never wall-clock → deterministic/multiplayer-safe). Night sinks only the
  backdrop toward black while every living thing's bioluminescence INTENSIFIES
  (`nightGlow()` boosts bioGlow, LOD dots, reef sprigs → the reefs become
  constellations). Gameplay turns with the light: senses dim to ×0.82 at deep
  night (Deep Scan is immune — the dark becomes home water), predators' hunt
  radius grows +40%, and the first nightfall gets its own story card.
- **MURMURATIONS** — the player's rug vision ("illusionary prey structures",
  beauty + bait) made real. Periodically — preferentially at night — the most
  common schooling species becomes ENTRANCED: each body owns a traveling slot on
  a rotating, breathing two-turn ribbon (`murmurPoint`), so the school pours into
  a living bait-ball vortex. Entranced prey do not scatter (the bait): swim the
  river and feed. Announced, species-coloured, glowing ribbon + offscreen
  chevron, drifts, dissolves in ~16s, releases the school on end.
- Verified: 6000-frame harness clean (the run itself crosses a nightfall and a
  murmuration window); 25/25 targeted assertions ×5 runs (light curve, sense
  penalty + deepscan immunity, vortex formation, ≥10 entranced, racing speed
  signature, dissolve + release + cooldown).

## Future layers (Rebuild II.7+)  ⚪
- Continue the character rework upward (the apex animals).
- Reef-aware AI (prey actively fleeing INTO cover) + hive anchoring on reefs.
- Night-blooming anomalies / lures that only surface in the dark.
