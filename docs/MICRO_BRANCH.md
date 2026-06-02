# GENESIS EVOLUTION — Micro Branch Design

> Living design doc. Edit freely — code is built to follow this, not the other way around.
> Status legend:  🟢 built · 🟡 in progress · ⚪ planned · 💭 idea / undecided

---

## 1. The pivot: COLOSSUS is a singularity, not a ceiling

At **TITAN · COLOSSUS** the player has become a sun — everything orbits, you can't
meaningfully move or grow. Today that's a dead end. We make it the most important
**choice moment** in the game: the cell has hit the hard limit of being a single body.

Real biology agrees: a lone cell *cannot* keep growing (surface-area vs volume). Life's
answer was **go multicellular**. So COLOSSUS pressure resolves into a fork:

- **◐ MICRO — collapse inward / mitosis** → split into a swarm, then *build* a colony.  ← building this first
- **◑ MACRO — ignite outward** → become a star/planet, accretion & orbits.  (later; mirror of micro)
- **3D transcendence** → parked as a far-future "transcend both," not a near-term fork.

Macro and micro are **not** a closed loop — they're divergent, open-ended destinies.

---

## 2. Visual language: the rug (growth diagram)

Reference: the floral rug. Read it as a **branching growth plan**, not decoration:

- A central red **STEM** runs through the body.
- **NODES** sit along the stem — these are fork/decision points.
- Branches terminate in **BLOOMS** (flowers = specialized energy/intake organs) or
  **LEAVES** (structural / defensive organs).
- Colors map to cell *type* (see §4). The whole creature reads as a hand-grown plant-animal.

**Core feel:** you don't inflate a blob — you **grow a directional branching colony**.
You point, cells accrete along an axis, nodes let you fork, and the morphology you sculpt
*is* your stat sheet. Every past choice stays visible in your shape.

---

## 3. The two micro sub-modes (player asked for BOTH)

### 3a. SWARM  🟡
Right after mitosis you control a **loose cloud of cells** (reuse boids/flocking + spatial hash).
- Steer the centroid; cells flock toward the pointer.
- Spread wide = cover more plankton; clump = safer / punchier.
- Fragile: cells can be scattered or picked off; you re-gather them.

### 3b. COLONY (multicellular build)  🟢 first pass
**Bind swarm cells into a shaped formation** — shape = ability. Cycle shapes with the
MORPH button (point-and-grow heading orients the shape to your travel direction).
Implemented shapes & their feeding profile:
- **FILAMENT** — broadside rake; widest reach (eatR 1.7, feed .85) → the filter net.
- **RADIAL** — ring/bloom; omnidirectional (eatR 1.4, feed .7).
- **SPHERE** — packed disc; compact & durable (eatR 1.15, feed .6).
- **SWARM** — loose flock; max coverage, lowest per-cell yield (.5).

Still ⚪: cell-type differentiation (mouth/sting/flagella/membrane), per-shape special
abilities beyond feeding, branching/coral recursion, threats at this scale.

---

## 4. Cell types (the build vocabulary)  ⚪

| Cell | Rug analog | Role |
|------|-----------|------|
| **Core** | central node | the seed everything grows from; death = game over |
| **Mouth** | bloom (red/pink) | eats / filters plankton; efficiency build stacks these |
| **Sting** | thorn | damages & stuns threats that touch the colony |
| **Flagella** | leaf-tip | propulsion; more = faster/turnier |
| **Membrane** | leaf body (blue/teal) | armor / shield, absorbs hits |
| **Sensor** | bud | extends radar / intake range |

Differentiation costs mass; recipe = your build.

---

## 5. The fork tree (MANY paths — the player's core ask)  💭

Morphologies grown from the core. Each is a distinct playstyle; branches can be mixed at nodes.

- **FILAMENT / NET** — cells in a sweeping line → a literal filter net that rakes plankton.
  *(the efficiency / filter-feeder build)*
- **RADIAL / FLOWER** — cells ringed around the core → omnidirectional intake (manta/medusa).
- **SPHERE / COLONY** — dense packed ball → tanky rolling mouth.
- **BRANCHING / CORAL** — recursive forks (most rug-like) → wide reach, many specialized tips.
- **SWARM (stay loose)** — never bind; pure speed & coverage, highest skill.

**Open-ended:** no single "best." Forks recombine. Late nodes unlock hybrids.

---

## 6. Build order (how we ship it)

1. 🟢 **Mitosis MOMENT** — COLOSSUS pressure meter → choice prompt → burst-into-swarm transition.
2. 🟢 **Swarm control** — herd the cloud, graze plankton as a swarm.
3. 🟢 **Binding & shapes** — bind into FILAMENT / RADIAL / SPHERE via MORPH; shape = feeding ability.
4. ⚪ **Cell types & differentiation** — mouth/sting/flagella/membrane.
5. ⚪ **Full fork tree + hybrids** — branching/coral recursion, mixed builds.
6. ⚪ **Art pass** — the rug aesthetic (stems, blooms, leaves, colors).

> Decision locked: **point-and-grow** directional accretion (shape orients to travel
> heading), not a tap-a-node radial menu. Most faithful to the rug, cleanest on touch.

---

## 7. Open questions  💭

- Mitosis: one-way commitment, or can you re-merge the swarm back into a single body?
- Node UI: tap-a-node radial menu, or "point and grow" directional accretion?
- Does the colony keep a single mass pool, or does each cell carry mass (lose cells = lose mass)?
- Threats at this scale: do old creatures return as predators, or is it pure building/grazing?
