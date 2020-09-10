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
      id: 'Claws',
      name: 'Claws',
      cost: 0,
      useTime: 1000,
      damage: [2, 4],
      icon: 'mdi-sword',
      type: AbilityType.Skill,
	},
	{
		id: 'Savage Claws',
		name: 'Savage Claws',
		cost: 3,
		useTime: 1000,
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
	name: 'Red Ghost',
  },
  {
    ...ghost,
    id: 'ghost-3',
  },
];
