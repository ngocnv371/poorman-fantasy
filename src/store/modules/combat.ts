import { Module } from 'vuex';
import { CombatState, GameState } from '@/models';

export const CombatModule: Module<CombatState, GameState> = {
  namespaced: true,
  state: {
    enemies: [],
    hero: null,
    turn: 0,
    over: false,
    victory: false,
  },
  mutations: {
    reset(state, payload) {
      const { hero, enemies } = payload;
      state.hero = hero;
      state.enemies = enemies;
      state.turn = 0;
      state.over = false;
      state.victory = false;
    },
  },
  actions: {
    start(context, payload) {
      const { enemies } = payload;
      context.commit('reset', {
        hero: context.rootState.hero,
        enemies: enemies,
      });
    },
  },
};
