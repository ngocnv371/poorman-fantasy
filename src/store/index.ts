import Vue from 'vue';
import Vuex from 'vuex';
import { GameState } from '@/models';
import { CombatModule } from './modules/combat';
import { defaultHero } from '@/models/defaultHero';
import { BattleModule } from './modules/battle';

Vue.use(Vuex);

export default new Vuex.Store<GameState>({
  state: {
    hero: defaultHero,
  },
  mutations: {},
  actions: {},
  modules: {
    combat: CombatModule,
    battle: BattleModule,
  },
});
