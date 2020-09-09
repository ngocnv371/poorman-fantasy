import { Hero, AbilityType } from '.';

export const defaultHero: Hero = {
  id: 'hero',
  name: 'Max Pain',
  icon: 'mdi-knight',
  maxLife: 50,
  life: 40,
  maxSanity: 40,
  sanity: 45,
  inventory: {
    gold: 95,
    slots: 20,
    items: {
      'iron-sword': 1,
    },
  },
  abilities: [
    {
      type: AbilityType.Skill,
      id: 'Slash',
      name: 'Slash',
      icon: 'mdi-sword',
      damage: [5, 10],
      description: '5-10 PHYS',
    },
    {
      type: AbilityType.Skill,
      id: 'Cleave',
      name: 'Cleave',
      icon: 'mdi-fan',
      damage: [4, 8],
      description: '4-8 PHYS',
    },
    {
      type: AbilityType.Spell,
      id: 'Fireball',
      name: 'Fireball',
      icon: 'mdi-fire',
      damage: [5, 10],
      description: '5-10 FIRE',
    },
    {
      type: AbilityType.Spell,
      id: 'Freeze',
      name: 'Freeze',
      icon: 'mdi-snowflake',
      damage: [5, 10],
      description: '5-10 COLD',
    },
  ],
};
