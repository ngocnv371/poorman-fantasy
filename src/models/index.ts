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

export interface Character extends Killable {
  mana: number;
  maxMana: number;
  inventory: Inventory;
  abilities: Ability[];
}

export type Monster = Character;

export interface Inventory {
  gold: number;
  slots: number;
  items: Dictionary<number>;
}

export interface Hero extends Character {
  maxSanity: number;
  sanity: number;
}

export enum AbilityType {
  Spell,
  Skill,
}

export interface Ability extends Identifiable {
  damage: number[];
  cost: number;
  useTime: number;
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
