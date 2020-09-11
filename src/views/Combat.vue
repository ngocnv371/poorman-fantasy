<template>
  <v-card flat dark key="combat" style="height: 100vh" :elevation="0">
    <div class="d-flex flex flex-column" style="height: 100%">
      <div class="flex d-flex pt-2" key="enemy-lane">
        <v-spacer></v-spacer>
        <div class="flex" v-for="item of mobs" :key="item.id">
          <EnemyCard
            class="mx-auto"
            @click="onEnemyClick(item)"
            :key="item.name"
            :monster="item"
            :color="currentCombatant.id === item.id ? 'indigo' : ''"
          />
        </div>
        <v-spacer></v-spacer>
      </div>
      <v-spacer></v-spacer>
      <div class="flex">
        <v-card flat min-height="100" key="river">
          <div class="d-flex text-center" v-if="!isOver">
            <ImpressiveMessage
              :show="isPlayerTurn"
              class="amber--text flex font-weight-bold"
            >
              Your turn
            </ImpressiveMessage>
            <ImpressiveMessage
              :show="!isPlayerTurn"
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
        <HeroCard :hero="hero" :active="isPlayerTurn" class="mx-auto" />
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
import { Monster, Character } from '@/models';
import { namespace } from 'vuex-class';

const CombatModule = namespace('battle');

@Component({
  name: 'Combat',
  components: {
    ImpressiveMessage,
    HeroCard,
    EnemyCard,
  },
})
export default class Combat extends Vue {
  @CombatModule.Getter('mobs')
  public mobs!: Character[];

  @CombatModule.Getter('player')
  public hero!: Character;

  @CombatModule.Getter('needPlayerInput')
  public needPlayerInput!: boolean;

  @CombatModule.Getter('isOver')
  public isOver!: boolean;

  @CombatModule.Getter('currentCombatant')
  public currentCombatant!: Character;

  @CombatModule.Action('start')
  public start!: () => void;

  @CombatModule.Action('escape')
  public escape!: () => void;

  @CombatModule.Action('selectAbility')
  public selectAbility!: (payload: { id: string }) => void;

  @CombatModule.Action('selectTarget')
  public selectTarget!: (payload: { id: string }) => void;

  public waitYourTurnWarning = false;

  public get isHeroDead() {
    return this.hero.life <= 0;
  }

  public get isPlayerTurn() {
    return this.currentCombatant.id === this.hero.id;
  }

  public onEnemyClick(enemy: Monster) {
    if (this.isOver) {
      return;
    }
    if (!this.isPlayerTurn) {
      this.waitYourTurnWarning = true;
      return;
    }
    this.selectTarget(enemy);
  }
}
</script>
