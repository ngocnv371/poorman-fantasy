import { Character, AbilityType } from '.';

const ghost: Character = {
  id: '1',
  name: 'Ghost',
  icon: 'mdi-ghost',
  maxLife: 10,
  life: 10,
  mana: 100,
  maxMana: 100,
  inventory: { gold: 0, slots: 1, items: {} },
  abilities: [
    {
      id: 'Claw',
      name: 'Savage Claws',
      cost: 3,
      damage: [3, 8],
      icon: 'mdi-sword',
      type: AbilityType.Skill,
    },
  ],
};
export const enemies: Character[] = [
  {
    ...ghost,
    id: 'ghost-1',
  },
  {
    ...ghost,
    id: 'ghost-2',
  },
  {
    ...ghost,
    id: 'ghost-3',
  },
];
