import { Module } from 'vuex';
import { CombatState, GameState, Fightable, Ability } from '@/models';
import { defaultHero } from '@/models/defaultHero';

function calculateOutputDamage(combatant: Fightable, abilityId: string): number {
  const ability = combatant.abilities.find(a => a.id === abilityId);
  if (!ability) {
    throw new Error(`Combatant ${combatant.name} (#${combatant.id}) has no ability #${abilityId}`);
  }
  const damageDelta = ability.damage[1] - ability.damage[0];
  const calculatedDamage = Math.floor(
    Math.random() * damageDelta + ability.damage[0]
  );
  return calculatedDamage;
}

function calculateInputDamage(target: Fightable, damage: number) {
  // TODO: apply armor and resistences
  return damage;
}

function useAbilityOn(user: Fightable, abilityId: string, target: Fightable) {
  const output = calculateOutputDamage(user, abilityId);
  const dmg = calculateInputDamage(target, output);
  if (dmg > target.life) {
    target.life = 0;
  } else {
    target.life -= dmg;
  }
}

export const CombatModule: Module<CombatState, GameState> = {
  namespaced: true,
  state: {
    enemies: [],
    hero: defaultHero,
    turn: 0,
    over: false,
    victory: false,
    waitingForHeroInput: false,
    orders: [],
  },
  mutations: {
    reset(state, payload) {
      const { hero, enemies } = payload;
      state.hero = hero;
      state.enemies = enemies;
      state.turn = 0;
      state.over = false;
      state.victory = false;
      state.waitingForHeroInput = false;
      state.orders = [state.hero.id, ...state.enemies.map(e => e.id)];
    },
    endTurn(state) {
      const [top, ...rest] = state.orders;
      state.orders = [...rest, top];
      state.turn++;
    },
    end(state, payload) {
      const { victory } = payload;
      state.victory = victory;
      state.over = true;
      state.waitingForHeroInput = false;
    },
    useAbility(state, payload) {
      const { userId, targetId, abilityId} = payload;
      const user = userId === state.hero.id ? state.hero : state.enemies.find(e => e.id === userId);
      if (!user) {
        throw new Error(`Combatant #${userId} not found`);
      }
      const target = targetId === state.hero.id ? state.hero : state.enemies.find(e => e.id === targetId);
      if (!target) {
        throw new Error(`Combatant #${targetId} not found`);
      }
      useAbilityOn(user, abilityId, target);
    }
  },
  actions: {
    start(context, payload) {
      const { enemies } = payload;
      context.commit('reset', {
        hero: context.rootState.hero,
        enemies: enemies,
      });
    },
    playerAttack(context, payload) {
      const { abilityId, targetId } = payload;
      if (!context.getters['isHeroTurn']) {
        return;
      }
      context.commit('useAbility', {
        userId: context.state.hero.id,
        targetId: targetId,
        abilityId: abilityId
      });
    }
  },
  getters: {
    isHeroTurn(state) {
      return state.orders.length && state.hero.id === state.orders[0];
    },
  },
};
