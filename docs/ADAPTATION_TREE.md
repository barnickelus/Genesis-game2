# GENESIS EVOLUTION — Adaptation Tree & Long-Horizon Vision

> Strategy doc for the player's "many forks, user-decided adaptations, ultimately
> open-world multiplayer" direction. Status: 🟢 built · 🟡 partial · ⚪ planned · 💭 idea

---

## The pillar idea: food acquisition is a TREE, not a ladder

Today evolution is **linear** (MOTE → … → TITAN), one ability per stage. The vision
is that at key points the player **chooses an acquisition strategy**, and each choice
opens its own branch of further adaptations. Survival of the fittest, player-authored.

### Acquisition archetypes (the trunk forks)
Each is a fundamentally different way to get mass. They already exist piecemeal in
the game as stage abilities — the plan is to make them **chooseable branches** instead
of a fixed sequence.

| Archetype | In-game seed today | Branch fantasy |
|-----------|-------------------|----------------|
| **PROJECTILE / hunter** | PRIMORDIAL `bolt` | ranged kills; tough prey = big payoff (🟢 effort-scaled payout) |
| **GRAVITY / trapper** | TITAN intake + `gravity` seed | pull prey in; area control, passive |
| **CAMOUFLAGE / ambush** | lurker AI, color-family masking | hide, lure, burst — high reward per strike |
| **SPEED / pursuit** | DRIFTER `dash`, NAGA `whip` | run prey down; chase build |
| **SIZE / engulf** | TITAN filter-feeder, MEDUSA sting | overwhelm by mass; tanky |
| **SWARM / colony** | micro branch (mitosis) | many bodies; shape = ability (🟢 filament/radial/sphere) |
| **VENOM / sting** | MEDUSA sting aura | damage-over-time fields |

> Note the symmetry the player called out: **PRIMORDIAL projectile** (reach out and
> strike) vs **TITAN gravity** (draw prey in) are *opposite predatory techniques* — a
> natural first fork pair. PROJECTILE = active/precision, GRAVITY = passive/area.

---

## Phased roadmap

### Phase A — make payoffs reward effort  🟢 (this commit)
Projectile kills now scale with how hard the creature was to kill (its max HP), so the
big red apex (hunter/lurker/behemoth) pays ~2–5.5× the old flat rate, with "APEX SLAIN"
fanfare. Fixes the "shooting the giant fish wasn't worth it" problem.

### Phase B — adaptation CHOICE at evolution  ⚪
At each evolution (or at designated fork stages) offer 2–3 adaptation cards instead of a
fixed ability. Pick PROJECTILE vs GRAVITY vs CAMOUFLAGE… Each unlocks a small sub-tree.
- Needs: a chosen-traits data model on `P` (e.g. `P.traits = []`), a card UI, and ability
  dispatch keyed on traits rather than `STAGES[stg].ab`.
- Keep it backward compatible: the current linear stages become the "default path."

### Phase C — trait sub-trees & hybrids  💭
Each archetype branches further (e.g. PROJECTILE → spread shot / piercing / homing).
Late nodes allow hybrids (gravity + venom = a poison well). This is the "large, many
adaptations" the player wants. Build incrementally, one archetype deep at a time.

### Phase D — open world  💭
Bigger persistent world, biomes, distinct regional fauna, landmarks worth traveling to.
Mostly content + the existing view-radius/streaming systems scaled up. No netcode yet.

### Phase E — MULTIPLAYER  💭 (major architecture, not a feature commit)
**Decision: NOT building it now. Building TOWARD it.** Single-player ships; the goal is
that turning multiplayer on later is an *addition*, never a rewrite.
Honest scoping for the eventual end goal:
- **This is a real backend project**, not an edit to index.html. Needs an authoritative
  server (state sync, anti-cheat), a transport (WebSocket/WebRTC), interest management
  (only send nearby entities — the spatial hash already helps), and client prediction.
- Likely a separate repo/service; the current single-file client would become one of
  several modules. Cost: weeks, not hours. Flag for a dedicated planning pass.
- Cheapest believable step toward it: **async/ghost multiplayer** first — other players'
  runs replayed as AI "ghosts" in your world (no real-time netcode), which sells a
  populated world and de-risks the jump to true real-time.

---

## MULTIPLAYER-READY PRINCIPLES  ⭐ (apply to EVERY commit from now on)

We are not writing netcode yet, but we keep the door open by following cheap rules now.
These cost ~nothing in single-player and save a rewrite later. Each new system gets a
quick check against this list.

1. **The player is not special — it's "entity 0".** Anything that reads/writes the global
   `P` should work if there were `P2`, `P3`… Prefer functions that take an actor argument
   over ones that hardcode `P`. (We won't refactor existing code wholesale, but *new*
   systems — adaptations, abilities — take an actor.)
2. **Simulation is deterministic & input-driven.** Game state advances from (state + dt +
   inputs). Keep using a fixed-ish `dt` step and the seedable RNG path where practical, so
   the same inputs → same result. This is what lets a server replay/validate later.
3. **Separate SIM from RENDER.** Update logic must never depend on canvas/DOM. (Mostly true
   today — the headless harness proves the sim runs with stubbed DOM. Keep it that way: no
   game rules inside draw functions.)
4. **Inputs are messages, not direct mutations.** Funnel control through an intent object
   (e.g. `{move, tap, ability}`) rather than touching state in event handlers. Today `ptr`
   already approximates this — keep new actions going through a small input struct so they
   can later arrive over a wire instead of from a mouse.
5. **State is serializable.** Entities are plain data (numbers/strings/arrays), no closures
   or DOM nodes stored on them. Anything you'd need to sync should JSON-cleanly. (Audit:
   `_maskAnchor` holds an object ref — fine locally, but note it as non-serializable.)
6. **Spatial queries already scale.** The grid/`gNear` interest model is exactly what a
   server uses to send "only what's near you." Keep routing proximity logic through it.
7. **No wall-clock gameplay.** Use the sim clock (`gt`/accumulated dt), never `Date.now()`,
   for anything that affects state — so replays and server time stay consistent.

> The headless harness (`tools/playtest-harness.js`) is our proof of #2/#3: it runs the
> whole sim with no browser. If a future change breaks the harness, it has probably
> coupled sim to render — a multiplayer red flag. Run it after any logic change.

---

## Build order recommendation
A (done) → **B** (the choice system — highest impact, unlocks everything else) → C
(deepen one archetype at a time) → D (world) → E (multiplayer, separate planning).

## Open questions  💭
- Are forks **permanent per run** (roguelike identity) or **respec-able**?
- Do forks replace the named stages (MOTE/DRIFTER/…) or layer on top of them?
- First archetype pair to fully build out — confirmed **PROJECTILE vs GRAVITY**?
