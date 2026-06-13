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

## Future layers (Rebuild II.5+)  ⚪
- Continue the character rework upward (polyp, tendril, the apex animals).
- SAILFISH (pursuit/speed-burst) — last of the lone-predator forks.
