import { Hero, AbilityType } from '.';

export const defaultHero: Hero = {
  id: 'hero',
  name: 'Max Pain',
  icon: 'mdi-knight',
  maxLife: 100,
  life: 90,
  maxMana: 100,
  mana: 100,
  maxSanity: 100,
  sanity: 80,
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
      cost: 5,
      damage: [5, 10],
      description: '5-10 PHYS',
    },
    {
      type: AbilityType.Skill,
      id: 'Cleave',
      name: 'Cleave',
      icon: 'mdi-fan',
      cost: 4,
      damage: [4, 8],
      description: '4-8 PHYS',
    },
    {
      type: AbilityType.Spell,
      id: 'Fireball',
      name: 'Fireball',
      icon: 'mdi-fire',
      cost: 5,
      damage: [5, 10],
      description: '5-10 FIRE',
    },
    {
      type: AbilityType.Spell,
      id: 'Freeze',
      name: 'Freeze',
      icon: 'mdi-snowflake',
      cost: 4,
      damage: [5, 10],
      description: '5-10 COLD',
    },
  ],
};
