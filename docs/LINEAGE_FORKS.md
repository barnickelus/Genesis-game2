# GENESIS EVOLUTION — Lineage Forks (vision)

> Captures the player's expanded vision: lone-creature predator forks AND colony
> specializations (hive / plant / fungus). Status: 🟢 built · 🟡 partial · ⚪ planned · 💭 idea

---

## The reframe: "formation" → "lineage"

Player insight: shapes-as-formations feels shallow. The deeper idea is that the
big choices are **what kind of life you become**, each with its own growth model
and win-feel. Two tiers:

### Tier 1 — LONE CREATURE forks (before / instead of going multicellular)
Specialized solitary predators — "skilled in their ability of predation." You stay
ONE body but commit to a hunting identity. These are the trait archetypes made into
full *builds* with matching bodies:

| Fork | Fantasy | Core verb |
|------|---------|-----------|
| **SPIDER** | web-weaver | lay sticky webs that snare drifting prey, then reel in |
| **CRAB / ARMORED** | strength/tank | heavy, slow, crushes; shrugs off hits |
| **MANTIS / AMBUSH** | camouflage | go near-invisible, burst-strike for huge bonus |
| **SAILFISH / PURSUIT** | speed | outrun and run down anything |
| **ARCHER** | projectile | the bolt build, ranged kills (already seeded) |

These hang off the existing **trait engine** — each is a "signature trait" + body
skin. This is the natural home for the trait system we already built.

### Tier 2 — COLONY lineages (the multicellular fork, after mitosis)
Once you DIVIDE, the colony itself forks into a lifestyle. These replace the current
"4 interchangeable formation shapes" with committed evolutionary paths:

| Lineage | Model | Growth loop |
|---------|-------|-------------|
| **HIVE** (bee/ant) | mobile super-org | grow → bud off a satellite swarm that forages and returns mass; spread territory |
| **PLANT / CORAL** | sessile, networked | root in place → grow a multi-NODE structure (coral/grass); photosynthesis + filter; nodes you plant persist |
| **FUNGUS** | spreading network | extend mycelial threads between food; decompose dead matter for mass; creep outward |

Travel/harvest *formations* (dart/swarm/filament) become **maneuvers within** a
lineage rather than the whole identity.

---

## What exists today (so we build on it, not over it)
- 🟢 Trait engine (data + hooks on actor) — the substrate for Tier-1 forks.
- 🟢 Mitosis → swarm → colony with food patches + a mobility spectrum
  (dart/swarm/radial/filament/plant).  PLANT passive runaway bug → fixed.
- 🟢 The Singularity fork (DIVIDE vs ASCEND).

## Gaps the player called out
- ⚪ **Visual growth**: cells/forms must visibly enlarge & gain structure as mass
  rises (right now growth is mostly a number). Each form should *look* like it's
  growing — more cells, longer filaments, taller plant nodes.
- ⚪ **PLANT as a fork, not a shape**: becomes sessile multi-node (coral/grass),
  buildable, persistent nodes.
- ⚪ **HIVE**: bud off new hives ("grow → break off → start new hive").
- ⚪ **FUNGUS**: mycelial spread + decomposition.
- ⚪ **Lone-creature predator forks** (spider/crab/mantis/sailfish): the pre-colony tier.

---

## Suggested build order (incremental, each shippable)
1. ⚪ **Visual growth pass** — make every existing form visibly grow with mass
   (cell size already does; add structural growth: filament length, plant nodes,
   swarm density). Cheapest big win; fixes the "unthought-out" feel.
2. ⚪ **PLANT → fork** — promote plant to a sessile multi-node coral/grass builder
   (plant a node, it persists & photosynthesizes, chain nodes into a reef).
3. 🟢 **HIVE** — budding satellite swarms. BUD HIVE button spends mass
   (HIVE_COST 90, needs ≥220 colony mass) to spawn an autonomous satellite that
   drifts to the richest patch, forages it, and sends mass tribute home (~35% when
   fat). Up to 6 hives, tethered visually. Verified: +51 tribute/13s hands-off.
4. ⚪ **Lone-creature forks** — spider first (webs are the most novel verb), via traits.
5. ⚪ **FUNGUS** — mycelial network + decomposition.

## Open questions  💭
- Are Tier-1 (lone) forks chosen *instead of* ever going colony, or a phase before it?
- Is the colony lineage a one-time commit at mitosis, or can you switch?
- How do hive satellites controls feel on touch (auto-forage vs directed)?

---

## Playtest round 3 — fixes + new ideas (queued)

Fixed this round:
- 🟢 +100 cheat button "deactivated" in colony — it was adding to P.mass which the
  swarm overwrites each frame; now distributes across cells.
- 🟢 PLANT purpose — photosynthesis now ONLY when ROOTED (idle on a nutrient
  patch). HUD shows "✿ ROOTED · photosynthesizing" vs "rest on a patch to root".
- 🟢 HIVE purpose + findability — two-way living supply chain: cyan WORKER motes
  stream colony→hive (staff it → independent growth), gold COURIERS stream
  hive→colony (heavier stream the more workers). Hives now show on the minimap
  with a tether. Net: a hive is a mass amplifier you invest workers into.

Round 4 (this commit):
- 🟢 HIVE stream reworked — was big bright orbs that "looked like the hive shooting
  the colony." Now: mass flow is a smooth continuous trickle (decoupled from
  visuals), and the visible traffic is a subtle same-hue mini-highway of tiny
  motes along the tether, with a faint leaving(cool)/arriving(warm) tint + a
  two-lane offset. Calm thread, no pulsing.
- 🟢 PLANT tree/coral ramp — rooting longer makes the plant "reach the ideal form
  for this spot": recursive branches gain depth/complexity over ~12s (plantRootT),
  and photosynthesis ramps 1×→2.5× (PLANT_RAMP_MAX). Bounded so it can't break
  balance: ramp plateaus AND mass-based diminishing returns throttle large colonies
  (verified: small +277/5s, ~10k-mass +45/5s — active harvest forms still win at scale).

New ideas to build (player, round 3):
- ⚪ **Illusionary prey structures**: certain prey groups arrange into shapes/
   patterns (the rug-like "plant" cluster the player saw) — flocking presets that
   form recognizable structures, an emergent-beauty + bait mechanic.
- ⚪ **Environment structures (rocks/reefs)**: static terrain blobs. Creatures hide
   in them; some prey are drawn to them; a hive can be PLANTED onto one (anchor);
   enables a CAMOUFLAGE colony formation (hide in/near rock, ambush).
