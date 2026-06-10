# GENESIS — Master Roadmap
> The single outline of everything the game will ultimately be, and where we are.
> Consolidates REBUILD_SPINE, TRAIT_SYSTEM, LINEAGE_FORKS, ADAPTATION_TREE, MICRO_BRANCH.
> Status: 🟢 built & live · 🟡 partial · ⚪ designed, not built · 💭 concept only
> "How far the last edit gets us": REBUILD I (commit cb111f4) = the Organization Spine.

---

## THE ARC — seven phases of organization
*cell → organism → superorganism → colony → civilization → planet → stars*

### PHASE I — EMERGENCE (fear) 🟢
| Stage | Objective | Signature |
|---|---|---|
| MOTE 🟢 | Consume 20 organisms | vulnerability, first bites |
| DRIFTER 🟢 | Chart the 4 beacons | radar unlocks, first ability (dash) |
| MEDUSA 🟢 | Strike 5 weak spots | sting aura, precision hunting taught |

### PHASE II — PREDATION (power) 🟢
| Stage | Objective | Signature |
|---|---|---|
| NAGA 🟢 | Fell 3 true predators | whip, wall-breaker frenzy, elder prey |
| PRIMORDIAL 🟢 | Claim 3 dominion sites | bolt (trait), territory play, apex bounties |

### PHASE III — SUPERORGANISM (transcendence) 🟢
| Stage | Objective | Signature |
|---|---|---|
| TITAN 🟢 | Reach the Singularity | filter-feeding, stun-echo, Awakening→Colossus, the world shrinks to plankton |
| THE SINGULARITY 🟢 | the fork | **DIVIDE** (micro/colony) vs **ASCEND** (stay colossus — macro stub ⚪) |

### PHASE IV — COLONY (stewardship) 🟡
| Piece | Status | Notes |
|---|---|---|
| Mitosis → swarm control | 🟢 | fresh 24-cell colony, feed→divide growth loop |
| Formations (shape = ability) | 🟢 | DART travel · SWARM spread · RADIAL balanced · FILAMENT net · PLANT rooted |
| Food patches + travel gaps | 🟢 | dart across the void, harvest at blooms, green chevron target |
| PLANT rooting + tree/coral growth | 🟢 | photosynthesis only when rooted; branches deepen ~12s, bounded ramp |
| HIVE budding + two-way supply chain | 🟢 | workers out / couriers home, mini-highway stream, minimap markers |
| Colony lineages as true forks | ⚪ | HIVE / PLANT-CORAL (persistent multi-node) / FUNGUS (mycelial, decomposer) as committed paths, not formations |
| Hive → break off → new hive chains | 🟡 | budding exists; hives founding their own satellites ⚪ |
| Rocks/reefs terrain | ⚪ | hide-in cover, prey attractor, hive anchor, camouflage formation |
| Illusionary prey structures | ⚪ | prey flocks forming rug-like shapes — beauty + bait |

### PHASE V — CIVILIZATION (legacy) ⚪ ← the next major build
- Colonies become intelligent **settlements**; the food loops become resource
  loops, migration routes, territory.
- "Colonies begin to signal one another…" — same systems, one level up:
  couriers → trade routes · hives → towns · patches → resource fields.
- Per ChatGPT feedback + user's year-long vision: this is the missing phase.

### PHASE VI — PLANETARY 💭
- Multiple civilizations compete; climate shifts; species specialize;
  evolution becomes cultural rather than biological.

### PHASE VII — SPACEFARING 💭
- Full zoom-out; spreading life itself; seed new worlds.
- The arc completes: single cell → … → stars.

---

## ADAPTATIONS — the trait tree
### Engine 🟢
Data-driven TRAITS registry · actor-first hooks (onTap/onTick/onKill/mod/draw) ·
per-actor cooldowns · stacking with caps · pick-1-of-3 card chooser at every
evolution · category-varied hands · stat folding (spd/decay/dmgTaken/senseMul).

### Current pool (8 traits / 5 categories) 🟢
bolt (stacks→spread shot) · gravity_well · venom_tip · arms (octopus grasping
arms: +reach, hauls prey in) · membrane · efficient · fins · deepscan.

### Planned growth ⚪
- Migrate legacy stage abilities (dash/sting/whip/echo) into traits — uniform system.
- World **gene-drops** (spore pickups; exploration-driven acquisition).
- Sub-trees per archetype: PROJECTILE→spread/pierce/homing · GRAVITY→well/crush/
  singularity · CAMOUFLAGE→ambush/mimic · VENOM→paralysis/necrosis · SPEED→phase/slipstream.
- Hybrids (gravity+venom = poison well, etc.).
- **Lone-predator forks (Tier 1, BEFORE colony)**: SPIDER (webs) · CRAB (armor) ·
  MANTIS (camo burst) · SAILFISH (pursuit) — signature trait + body per fork.

---

## THE LIVING WORLD
| System | Status |
|---|---|
| Detritus nutrient cycle (kills → blooms → migration) | 🟢 |
| Genome + selection pressure (prey evolves against your hunting; visible sleekness) | 🟢 |
| Utility prey AI, genome-modulated; signature species hooks kept | 🟢 |
| Anomalies (radar-huntable, mass% + frenzy reward) | 🟢 |
| Camouflage color-family masking + radar levels + weak-spot arcs | 🟢 |
| Predator evolution (predators adapt too, not just prey) | ⚪ |
| Terrain (rocks/reefs) + creatures using cover | ⚪ |
| Biomes / regional fauna (open-world groundwork) | ⚪ |

## PLATFORM & META
| Piece | Status |
|---|---|
| Single-file zero-build client, GitHub Pages live | 🟢 |
| High-DPI + bloom + LOD + macro perf + procedural audio | 🟢 |
| Headless sim harness (tools/) as regression guardrail | 🟢 |
| Multiplayer-READY principles enforced (actor-first, sim/render split, no wall-clock) | 🟢 |
| Ghost/async multiplayer (replayed runs populate your world) | 💭 |
| Real-time open-world multiplayer (separate backend project) | 💭 |
| genesis-classic.html — pre-rebuild game preserved | 🟢 |

---

## WHERE REBUILD I LEAVES US
**Playable today, on the spine:** Phases I–III complete with objectives gating
evolution, phase announcement beats, the Singularity fork, Phase IV functional
(swarm, formations, patches, plant rooting, hive supply chains), trait chooser
live, living economy + evolving prey live.

**Rough completion by area:** Arc structure ~3 of 7 phases deep (I–III done,
IV ~70%, V–VII unbuilt) · Adaptation engine 100% / content ~25% · Living world
~60% · Multiplayer 0% built, 100% kept-possible.

**Build order from here:**
1. Colony lineage commitment (HIVE/CORAL/FUNGUS as true forks) — finishes Phase IV.
2. Rocks/reefs + illusionary prey — the world gains places.
3. Lone-predator forks (spider first) — Tier-1 identity before colony.
4. **PHASE V — CIVILIZATION** — the big one; colonies → settlements.
5. Trait content growth (sub-trees, gene-drops, legacy migration).
6. Ghost multiplayer groundwork → VI/VII someday.
