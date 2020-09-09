export type Dictionary<T> = { [key: string]: T };

export interface Identifiable {
  id: string;
  name: string;
  description?: string;
  icon: string;
}

export interface Killable extends Identifiable {
  life: number;
  maxLife: number;
}

export interface Fightable extends Killable {
  inventory: Inventory;
  abilities: Ability[];
}

export interface Monster extends Fightable {}

export interface Inventory {
  gold: number;
  slots: number;
  items: Dictionary<number>;
}

export interface Hero extends Fightable {
  maxSanity: number;
  sanity: number;
}

export enum AbilityType {
  Spell,
  Skill
}

export interface Ability extends Identifiable {
  damage: number[];
  type: AbilityType;
}

export interface GameState {
  hero: Hero;
}

export interface CombatState {
  hero: Hero;
  enemies: Monster[];
  turn: number;
  over: boolean;
  victory: boolean;
  orders: string[];
  waitingForHeroInput: boolean;
}
