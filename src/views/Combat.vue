<template>
  <v-card flat dark key="combat" style="height: 100vh" :elevation="0">
    <div class="d-flex flex flex-column" style="height: 100%">
      <div class="flex d-flex pt-2" key="enemy-lane">
        <v-spacer></v-spacer>
        <div class="flex" v-for="item of enemies" :key="item.id">
          <EnemyCard
            class="mx-auto"
            @click="onEnemyClick(item)"
            :key="item.name"
            :monster="item"
            :color="currentCombatantId === item.id ? 'indigo' : ''"
          />
        </div>
        <v-spacer></v-spacer>
      </div>
      <v-spacer></v-spacer>
      <div class="flex">
        <v-card flat min-height="100" key="river">
          <div class="d-flex text-center" v-if="!combatOver">
            <ImpressiveMessage
              :show="isHeroTurn"
              class="amber--text flex font-weight-bold"
            >
              Your turn
            </ImpressiveMessage>
            <ImpressiveMessage
              :show="!isHeroTurn"
              class="pink--text flex font-weight-bold"
            >
              Monster turn
            </ImpressiveMessage>
          </div>
          <div class="d-flex text-center">
            <ImpressiveMessage
              :show="isHeroDead"
              class="red--text flex font-weight-bold"
            >
              You're Flipping Dead
            </ImpressiveMessage>
          </div>
        </v-card>
      </div>
      <v-spacer></v-spacer>
      <div class="flex d-flex flex-column" key="hero-lane">
        <v-spacer></v-spacer>
        <HeroCard :hero="hero" :active="isHeroTurn" class="mx-auto" />
      </div>
    </div>
    <v-snackbar v-model="waitYourTurnWarning" key="please wait your turn">
      Please wait your turn.

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="waitYourTurnWarning = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import EnemyCard from '@/components/combat/EnemyCard.vue';
import HeroCard from '@/components/combat/HeroCard.vue';
import ImpressiveMessage from '@/components/ImpressiveMessage.vue';
import { Monster, Hero, CombatState } from '@/models';
import { namespace } from 'vuex-class';

const CombatModule = namespace('combat');

@Component({
  name: 'Combat',
  components: {
    ImpressiveMessage,
    HeroCard,
    EnemyCard,
  },
})
export default class Combat extends Vue {
  @CombatModule.State((state: CombatState) => state.enemies)
  public enemies!: Monster[];

  @CombatModule.State((state: CombatState) => state.hero)
  public hero!: Hero;

  @CombatModule.State((state: CombatState) => state.waitingForHeroInput)
  public waitingForHeroInput!: boolean;

  @CombatModule.State((state: CombatState) => state.over)
  public combatOver!: boolean;

  @CombatModule.Getter('isHeroTurn')
  public isHeroTurn!: boolean;

  @CombatModule.Getter('currentCombatantId')
  public currentCombatantId!: string;

  @CombatModule.Action('playerAttack')
  public playerAttack!: (payload: {
    abilityId: string;
    targetId: string;
  }) => void;

  public waitYourTurnWarning = false;

  public get isHeroDead() {
    return this.hero.life <= 0;
  }
  public onEnemyClick(enemy: Monster) {
    if (this.combatOver) {
      return;
    }
    if (!this.isHeroTurn) {
      this.waitYourTurnWarning = true;
      return;
    }
    this.playerAttack({
      abilityId: 'Slash',
      targetId: enemy.id,
    });
  }
}
</script>
