import Vue from 'vue';
import Vuex from 'vuex';
import { GameState, Hero } from '@/models';
import { CombatModule } from './modules/combat';

Vue.use(Vuex);

const defaultHero: Hero = {
  id: 'hero',
  name: 'Max Pain',
  icon: 'mdi-knight',
  maxLife: 50,
  life: 40,
  maxSanity: 40,
  sanity: 45,
  damage: [2, 8],
  inventory: {
    gold: 95,
    slots: 20,
    items: {
      'iron-sword': 1,
    },
  },
  skills: [
    {
      id: 'Slash',
      name: 'Slash',
      icon: 'mdi-sword',
      description: '5-10 PHYS',
    },
    {
      id: 'Cleave',
      name: 'Cleave',
      icon: 'mdi-fan',
      description: '4-8 PHYS',
    },
  ],
  spells: [
    {
      id: 'Fireball',
      name: 'Fireball',
      icon: 'mdi-fire',
      description: '5-10 FIRE',
    },
    {
      id: 'Freeze',
      name: 'Freeze',
      icon: 'mdi-snowflake',
      description: '5-10 COLD',
    },
  ],
};

export default new Vuex.Store<GameState>({
  state: {
    hero: defaultHero,
  },
  mutations: {},
  actions: {},
  modules: {
    combat: CombatModule,
  },
});
