import { Module } from 'vuex';
import { BattleState, GameState, CharacterController } from '@/models';
import { BattleController } from '@/core';

const controller = new BattleController();

export const BattleModule: Module<BattleState, GameState> = {
  namespaced: true,
  state: {
    combatants: [],
    over: false,
    orders: [],
    turn: 0,
    selectedAbilityId: '',
    selectedTargetId: '',
  },
  getters: {
    isOver(state) {
      return state.over;
    },
    turn(state) {
      return state.turn;
    },
    currentCombatant(state) {
      return controller.getCurrentCombatant(state);
    },
    player(state) {
      return controller.getPlayer(state);
    },
    mobs(state) {
      return controller.getMobs(state);
    },
  },
  mutations: {
    start(state, payload) {
      controller.start(state, payload.combatants);
    },
    setSelectedAbility(state, payload) {
      controller.selectAbility(state, payload.id);
    },
    setSelectedTarget(state, payload) {
      controller.selectTarget(state, payload.id);
    },
    escape(state) {
      controller.escape(state);
    },
  },
  actions: {
    start(context, payload) {
      context.commit('start', payload);
    },
    escape(context, payload) {
      context.commit('escape', payload);
    },
    selectAbility(context, payload) {
      context.commit('setSelectedAbility', payload);
    },
    selectTarget(context, payload) {
      if (!context.state.selectedAbilityId) {
        return;
      }
      context.commit('setSelectedTarget', payload);
    },
  },
};
