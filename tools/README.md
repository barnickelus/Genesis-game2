# tools/

## playtest-harness.js

Runs the **real game logic** from `index.html` in a headless Node sandbox (stubbed
DOM / canvas / audio), drives the player through the full progression
(MOTE → … → PRIMORDIAL → TITAN → COLOSSUS → mitosis → swarm → colony shapes), and
reports stage transitions, key state, and any runtime errors.

```sh
node tools/playtest-harness.js
```

Why it matters: it's the guardrail for the "multiplayer-ready" principle that **sim
must not depend on render** (see `docs/ADAPTATION_TREE.md`). If a change breaks the
harness, it has probably coupled game rules to the canvas/DOM — fix that, don't stub
around it. Run it after any change to game logic as a fast regression check.

No browser, no install — uses only Node's built-in `vm`.
