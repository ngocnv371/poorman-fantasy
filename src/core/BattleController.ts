import { Character, Ability, CharacterController, BattleState } from '@/models';
import { formatName } from '@/util';

export class BattleController {
  public start(state: BattleState, combatants: Character[]) {
    console.log('battle start');
    state.combatants = combatants;
    state.turn = 0;
    state.over = false;
    state.orders = combatants.map(e => e.id);
    state.selectedAbilityId = '';
    state.selectedTargetId = '';
    this.processTurn(state);
  }

  public needUserInput(state: BattleState) {
    return (
      state.orders.length &&
      this.getCurrentCombatant(state).controller === CharacterController.Player
    );
  }

  public escape(state: BattleState) {
    this.end(state);
  }

  public getCurrentCombatant(state: BattleState) {
    if (!state.orders.length) {
      throw new Error('The battle queue is empty');
    }
    const unit = state.combatants.find(c => c.id === state.orders[0]);
    if (!unit) {
      throw new Error('can not get current combatant');
    }
    return unit;
  }

  public getPlayer(state: BattleState) {
    const player = state.combatants.find(
      c => c.controller === CharacterController.Player
    );
    if (!player) {
      throw new Error('No player controlled unit found');
    }
    return player;
  }

  public getMobs(state: BattleState) {
    return state.combatants.filter(
      c => c.controller === CharacterController.AI
    );
  }

  public selectTarget(state: BattleState, targetId: string) {
    state.selectedTargetId = targetId;
    this.processPlayerTurn(state);
  }

  public selectAbility(state: BattleState, abilityId: string) {
    state.selectedAbilityId = abilityId;
  }

  private end(state: BattleState) {
    state.over = true;
  }

  private endTurn(state: BattleState) {
    if (state.orders.length <= 1) {
      return this.end(state);
    }
    state.turn++;
    const [top, ...rest] = state.orders;
    state.orders = [...rest, top];
    this.processTurn(state);
  }

  private processTurn(state: BattleState) {
    if (this.needUserInput(state)) {
      return;
    }
    if (!this.anyAlive(state, CharacterController.Player)) {
      console.log('all player controlled units are dead');
      return this.end(state);
    }
    if (!this.anyAlive(state, CharacterController.AI)) {
      console.log('all AI controlled units are dead');
      return this.end(state);
    }
    this.processAITurn(state);
  }

  private processAITurn(state: BattleState) {
    const actor = this.getCurrentCombatant(state);
    const target = this.getFirstLivingPlayerUnit(state);
    const ability = this.calculateActorInteraction(actor, target);
    this.useAbility(state, actor, ability, target);
    this.endTurn(state);
  }

  private processPlayerTurn(state: BattleState) {
    const ability = this.getSelectedAbility(state);
    if (!ability) {
      throw new Error(`Selected ability #${state.selectedAbilityId} not found`);
    }
    const player = this.getCurrentCombatant(state);
    const target = this.getSelectedTarget(state);
    if (!target) {
      throw new Error(`Selected target #${state.selectedTargetId} not found`);
    }
    this.useAbility(state, player, ability, target);
    this.endTurn(state);
  }

  private useAbility(
    state: BattleState,
    user: Character,
    ability: Ability,
    target: Character
  ) {
    if (user.mana < ability.cost) {
      throw new Error(
        `Combatant ${formatName(
          user
        )} has insufficient mana to use ability ${formatName(ability)}`
      );
    }
    this.applyAbility(user, ability, target);
    user.mana -= ability.cost;
  }

  private anyAlive(state: BattleState, controller: CharacterController) {
    return state.combatants.find(
      c => c.controller === controller && c.life > 0
    );
  }

  private getFirstLivingPlayerUnit(state: BattleState) {
    const unit = state.combatants.find(
      c => c.controller === CharacterController.Player && c.life > 0
    );
    if (!unit) {
      throw new Error('can not get any living player controlled unit');
    }
    return unit;
  }

  public getSelectedTarget(state: BattleState) {
    return state.combatants.find(a => a.id === state.selectedTargetId);
  }

  public getSelectedAbility(state: BattleState) {
    const player = this.getCurrentCombatant(state);
    return player.abilities.find(a => a.id === state.selectedAbilityId);
  }

  private calculateActorInteraction(actor: Character, target: Character) {
    // TODO: use AI to determine what ability to use
    if (!actor.abilities.length) {
      throw new Error(`Combatant ${formatName(actor)} has no abilities`);
    }
    return actor.abilities[0];
  }

  private calculateOutputDamage(
    combatant: Character,
    ability: Ability
  ): number {
    const damageDelta = ability.damage[1] - ability.damage[0];
    const calculatedDamage = Math.floor(
      Math.random() * damageDelta + ability.damage[0]
    );
    return calculatedDamage;
  }

  private calculateInputDamage(target: Character, damage: number) {
    // TODO: apply armor and resistences
    return damage;
  }

  private applyAbility(user: Character, ability: Ability, target: Character) {
    const output = this.calculateOutputDamage(user, ability);
    const dmg = this.calculateInputDamage(target, output);
    if (dmg > target.life) {
      target.life = 0;
    } else {
      target.life -= dmg;
    }
  }
}
