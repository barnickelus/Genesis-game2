# GENESIS EVOLUTION — Trait System Spec

> The adaptation engine. Decisions locked with the player:
> **Collect & stack** (roguelike, builds accrue) · **Whole-organism** (acquisition +
> defense + movement + senses + metabolism) · **Evolutions + world drops**.
> Status: 🟢 built · 🟡 partial · ⚪ planned · 💭 idea

---

## 1. Model — traits are data on an actor

The player is **entity 0**: traits live on the actor, never in globals, so `P2.traits`
works identically (multiplayer principle #1).

```
actor.traits = ['bolt', 'venom_tip', 'membrane']   // ids the actor has collected
actor.traitLv = { bolt: 2, venom_tip: 1 }           // stack level per trait
```

A **trait definition** (in a central `TRAITS` registry) is pure data + optional hook fns:

```
TRAITS.bolt = {
  id:'bolt', name:'Bolt', cat:'acquisition', max:3,
  desc:'Fire a damaging projectile.',
  // hooks (all optional, all take the actor so they're player-agnostic):
  onTick(a, dt){…}, onTap(a){…}, onKill(a, prey){…},
  onHurt(a, src){…}, mod(a, stats){…}, draw(a, ts){…}
}
```

Hooks are invoked by a dispatcher that loops an actor's traits — adding a trait =
adding a registry entry, **never** touching the core loop. This is what keeps the
fork count open-ended (the player's ask: "more than 2 directions").

## 2. Categories (whole-organism design space)

| Category | Examples |
|----------|----------|
| **acquisition** | bolt, gravity well, ambush/camo, venom field, engulf, filament-net |
| **defense** | membrane (armor), spines (reflect), regen, shell |
| **movement** | dash, phase, slipstream, burrow |
| **senses** | radar+, predict, see-camo, deep-scan |
| **metabolism** | efficient digestion (less decay), hoarder (mass cap+), photosynthesis (passive) |

## 3. Acquisition / dispatch order  🟡

Core loop calls one dispatcher per phase; the dispatcher fans out to the actor's traits:
- `traitTick(a, dt)`     — every frame (auras, regen, cooldowns)
- `traitTap(a)`          — on tap/activate (bolt, dash) — first matching active trait wins
- `traitOnKill(a, prey)` — feeds the effort-payout, venom procs, lifesteal
- `traitStats(a)`        — folds passive modifiers (speed, decay, eat ratio, radar range)
  into a stats object the player update reads, instead of hardcoded `STAGES[stg]`
- `traitDraw(a, ts)`     — per-trait visuals (bolt charge, venom haze, camo shimmer)

Backward-compatible: a creature with no traits behaves exactly as today. The current
stage abilities (dash/sting/whip/bolt/echo) become **seed traits** the default path grants,
so nothing regresses.

## 4. Acquiring traits  ⚪

- **At evolution:** deal a hand of 3 cards from the eligible pool (not-yet-maxed,
  prerequisites met). Pick 1. Dramatic, paced with the stage beats.
- **World drops:** rare floating "spore/gene" motes you swim into for an instant minor
  trait or a stack-up. Exploration-driven, fits the open-world goal.
- Offer logic is weighted (category variety, current build synergy) so hands feel good.

## 5. Build order

1. 🟢 **Engine**: `TRAITS` registry, `actor.traits/traitLv/traitCd`, dispatcher hooks
   (`traitTick/Tap/OnKill/Draw`), per-actor cooldowns, `grantTrait`/`syncSeedTraits`.
   Bolt migrated to a trait as proof — auto-granted at PRIMORDIAL, fires via the engine,
   and stacks (L1→1 shot, L2→2, L3→3, capped). Legacy abilities still on the switch.
   `traitStats` (passive-mod folding) is stubbed in the contract, wired next step.
2. ⚪ Migrate remaining stage abilities to seed traits (dash/sting/whip/echo/gravity).
3. ⚪ Evolution trait-card UI (pick 1 of 3).
4. ⚪ World gene-drops.
5. ⚪ Flesh out the pool across all 5 categories; synergies/hybrids.
6. ⚪ Art per trait (rug-coded organs).

## 6. Multiplayer-ready checks (every trait commit)
- Hooks take `a` (actor), never assume `P`.  ·  Trait state is plain data on the actor.
- No wall-clock; cooldowns count down via dt.  ·  Sim hooks never touch canvas (draw hooks do).

## 7. Open questions  💭
- Respec? (Lean: no mid-run; identity matters in roguelike.)
- Max total traits per run, or unbounded stacking?
- Do world-drop traits differ from evolution traits (minor vs major)?
