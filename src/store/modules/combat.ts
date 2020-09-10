import { Module } from 'vuex';
import { CombatState, GameState, Character, Ability } from '@/models';
import { defaultHero } from '@/models/defaultHero';

function calculateOutputDamage(combatant: Character, ability: Ability): number {
  const damageDelta = ability.damage[1] - ability.damage[0];
  const calculatedDamage = Math.floor(
    Math.random() * damageDelta + ability.damage[0]
  );
  return calculatedDamage;
}

function calculateInputDamage(target: Character, damage: number) {
  // TODO: apply armor and resistences
  return damage;
}

function useAbilityOn(user: Character, ability: Ability, target: Character) {
  const output = calculateOutputDamage(user, ability);
  const dmg = calculateInputDamage(target, output);
  if (dmg > target.life) {
    target.life = 0;
  } else {
    target.life -= dmg;
  }
}

function calculateEnemyInteraction(enemy: Character, target: Character) {
  // TODO: use AI to determine what ability to use
  return enemy.abilities[0];
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
      const { userId, targetId, abilityId } = payload;
      const user =
        userId === state.hero.id
          ? state.hero
          : state.enemies.find(e => e.id === userId);
      if (!user) {
        throw new Error(`Combatant #${userId} not found`);
      }
      const ability = user.abilities.find(a => a.id === abilityId);
      if (!ability) {
        throw new Error(
          `Combatant ${user.name} (#${user.id}) has no ability #${abilityId}`
        );
      }
      const target =
        targetId === state.hero.id
          ? state.hero
          : state.enemies.find(e => e.id === targetId);
      if (!target) {
        throw new Error(`Combatant #${targetId} not found`);
      }
      if (user.mana < ability.cost) {
        throw new Error(
          `Combatant #${userId} has insufficient mana to user ability #${abilityId}`
        );
      }
      useAbilityOn(user, ability, target);
      user.mana -= ability.cost;
    },
    waitFoHeroInput(state, payload) {
      const { value } = payload;
      state.waitingForHeroInput = value;
    },
  },
  actions: {
    async start(context, payload) {
      console.log('Initiate combat');
      const { enemies } = payload;
      context.commit('reset', {
        hero: context.rootState.hero,
        enemies: enemies,
      });
      await context.dispatch('processTurn');
    },
    async playerAttack(context, payload) {
      console.log('Initiate player attack');
      if (!context.getters['isHeroTurn']) {
        return;
      }
      const { targetId } = payload;
      const target: Character = context.getters['getCombatantById'](targetId);
      if (!target) {
        throw new Error(`Combatant #${targetId} not found`);
      }
      if (target.life <= 0) {
        console.log('There is no need to attack a corpse');
        return;
      }
      await context.dispatch('useAbility', {
        userId: context.state.hero.id,
        ...payload,
      });
      context.commit('waitFoHeroInput', { value: false });
      if (context.getters['isAllEnemiesDead']) {
        await context.dispatch('endCombat');
      } else {
        await context.dispatch('endTurn');
      }
    },
    useAbility(context, payload) {
      const { userId, abilityId, targetId } = payload;
      return new Promise(resolve => {
        context.commit('useAbility', {
          userId: userId,
          targetId: targetId,
          abilityId: abilityId,
        });
        const user: Character = context.getters['getCombatantById'](userId);
        if (!user) {
          throw new Error(`Combatant #${userId} not found`);
        }
        const ability = user.abilities.find(a => a.id === abilityId);
        if (!ability) {
          throw new Error(
            `Combatant ${user.name} (#${user.id}) has no ability #${abilityId}`
          );
        }
        setTimeout(() => {
          resolve();
        }, ability.useTime);
      });
    },
    async processTurn(context, payload) {
      console.log('Process turn');
      if (context.getters['isHeroTurn']) {
        context.commit('waitFoHeroInput', { value: true });
        return;
      }
      await context.dispatch('processEnemyTurn');
    },
    async processEnemyTurn(context) {
      console.log('Process enemy turn');
      if (context.getters['isHeroTurn']) {
        return;
      }
      if (context.state.hero.life <= 0) {
        await context.dispatch('endCombat');
        return;
      }
      const enemyId = context.state.orders[0];
      const enemy = context.state.enemies.find(e => e.id === enemyId);
      if (!enemy) {
        throw new Error(`Combatant #${enemyId} not found`);
      }
      const ability = calculateEnemyInteraction(enemy, context.state.hero);
      context.commit('useAbility', {
        userId: enemyId,
        targetId: context.state.hero.id,
        abilityId: ability.id,
      });
      await context.dispatch('endTurn');
    },
    async endTurn(context) {
      context.commit('endTurn');
      await context.dispatch('processTurn');
    },
    endCombat(context) {
      console.log('End combat');
      context.commit('end', { victory: context.getters['isAllEnemiesDead']});
    },
  },
  getters: {
    isHeroTurn(state) {
      return state.orders.length && state.hero.id === state.orders[0];
    },
    currentCombatantId(state) {
      return state.orders.length ? state.orders[0] : '';
    },
    isAllEnemiesDead(state) {
      return !state.enemies.find(e => e.life > 0);
    },
    getCombatantById(state) {
      return (id: string) =>
        id === state.hero.id
          ? state.hero
          : state.enemies.find(e => e.id === id);
    },
  },
};
