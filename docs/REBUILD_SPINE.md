# GENESIS — The Organization Spine (rebuild)

> The unifying rebuild. One fantasy: **life organizing into ever-larger levels of
> complexity**. cell → organism → superorganism → colony → civilization → planet → stars.
> Mass is fuel. **Objectives are the story.** The ecosystem lives and evolves back.

## Why
Three games were fighting each other (agar-survival, kaiju growth, RTS colony).
The fix is not more mechanics — it's a spine that makes the existing mechanics
read as *steps in one journey*, plus a world that feels alive rather than spawned.

## The Phases
| Phase | Stages | Emotion | You are… |
|---|---|---|---|
| **I — EMERGENCE** | Mote, Drifter, Medusa | fear | learning to survive |
| **II — PREDATION** | Naga, Primordial | power | becoming the hunter |
| **III — SUPERORGANISM** | Titan | transcendence | outgrowing one body |
| **IV — COLONY** | Swarm → Hive network | stewardship | ecosystem vs ecosystem |
| **V — CIVILIZATION** | (teased, future) | legacy | colonies begin to signal… |

Phase transitions get their own announcement beat (bigger than stage-ups).

## Per-stage objectives (gate evolution; mass is the fuel, not the goal)
| Stage | Objective | Verb |
|---|---|---|
| MOTE | Consume 20 organisms | survive |
| DRIFTER | Visit the 4 beacons | explore |
| MEDUSA | 5 precision (weak-spot) kills | learn |
| NAGA | Fell 3 hunters-class predators | hunt |
| PRIMORDIAL | Claim 3 dominion sites | dominate |
| TITAN | Reach the Singularity (critical mass) | transcend |
| COLONY | Grow the colony; establish 3 hives | build |

Evolution requires **objective complete AND mass ≥ threshold**. The HUD shows the
current objective with live progress.

## The Living Economy (nutrient cycle) — new
- Kills and decay drop **detritus** motes that drift in the world.
- Plankton/food preferentially **spawns where detritus settles** → kill-grounds
  bloom, blooms attract grazers, grazers attract predators. Emergent migration.
- The world stops feeling like a spawner and starts feeling like a cycle.

## The Evolving Ecosystem (selection pressure) — new
- Every creature has a **genome**: spd / size / wary multipliers (gaussian around
  its species' current means).
- When the player kills an individual, the species' means drift **away from the
  victim's phenotype** (the survivors breed). Kill slow prey → the population gets
  faster. Hunt the bold → they grow wary. Clamped (0.72–1.42) + mutation noise.
- Genome is **visible**: faster genes = sleeker, stretched bodies; size genes = bigger.
- Net effect: the prey adapts to *your* hunting style over a run.

## Rebuilt mass equations (one place, no piecewise traps)
- Decay: `0.0005 · (m/100)^0.75 per ms` — smooth power law (≈0.5/s @100,
  ≈2.5/s @850, ≈5.6/s @2500). Stage floor retained.
- Reward: one `killReward(preyMass, preyMaxHp, playerMass)` used by eat, bolt,
  and hp-zero paths: hyperbolic damping by player mass, scaled up with prey
  toughness so apex prey stay worth hunting at any size.

## Rebuilt prey AI (utility, genome-modulated)
Scores per frame: flee · hunt · forage · wander (+ boids schooling). Highest wins,
steering blends. Genome modulates: wary scales flee radius, spd scales speed.
Species signatures kept as hooks: lurker ambush-lure, phantom veil-lure,
behemoth predictive charge, echo mirroring.

## Kept from the current build (proven bones)
High-DPI canvas, bloom, LOD + macro AI throttle, procedural audio, trait cards,
frenzy, radar/weak spots, the Singularity choice, colony/hive supply chain,
multiplayer-ready principles (actor-first, sim/render split, harness).

## Preserved
The pre-rebuild game is kept playable at `genesis-classic.html`.
