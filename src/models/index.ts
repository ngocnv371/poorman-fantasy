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
  damage: number[];
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
  inventory: Inventory;
  skills: Skill[];
  spells: Spell[];
}

export interface Action extends Identifiable {}
export interface Skill extends Action {}
export interface Spell extends Action {}
