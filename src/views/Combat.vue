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
import { Monster, Hero, Fightable } from '@/models';

@Component({
  name: 'Combat',
  components: {
    ImpressiveMessage,
    HeroCard,
    EnemyCard,
  },
})
export default class Combat extends Vue {
  public enemies: Monster[] = [
    {
      id: '1',
      name: 'Ghost',
      icon: 'mdi-ghost',
      maxLife: 10,
      life: 10,
      damage: [3, 7],
    },
    {
      id: '2',
      name: 'Ghost',
      icon: 'mdi-ghost',
      maxLife: 10,
      life: 10,
      damage: [3, 7],
    },
    {
      id: '3',
      name: 'Ghost',
      icon: 'mdi-ghost',
      maxLife: 10,
      life: 10,
      damage: [3, 7],
    },
  ];

  public hero: Hero = {
    id: 'hero',
    name: 'Max Pain',
    icon: 'mdi-knight',
    maxLife: 50,
    life: 40,
    maxSanity: 40,
    sanity: 45,
    damage: [2, 8],
    inventory: {
      gold: 95,
      slots: 20,
      items: {
        'iron-sword': 1,
      },
    },
    skills: [
      {
        id: 'Slash',
        name: 'Slash',
        icon: 'mdi-sword',
        description: '5-10 PHYS',
      },
      {
        id: 'Cleave',
        name: 'Cleave',
        icon: 'mdi-fan',
        description: '4-8 PHYS',
      },
    ],
    spells: [
      {
        id: 'Fireball',
        name: 'Fireball',
        icon: 'mdi-fire',
        description: '5-10 FIRE',
      },
      {
        id: 'Freeze',
        name: 'Freeze',
        icon: 'mdi-snowflake',
        description: '5-10 COLD',
      },
    ],
  };

  public battleOrder: Fightable[] = [];
  public waitYourTurnWarning = false;
  public combatOver = false;

  public get isHeroTurn() {
    return this.battleOrder.length && this.battleOrder[0].id === this.hero.id;
  }

  public get isHeroDead() {
    return this.hero.life <= 0;
  }

  public get currentCombatantId() {
    if (!this.battleOrder.length) {
      return null;
    }
    return this.battleOrder[0].id;
  }

  public mounted() {
    this.startCombat();
  }

  public startCombat() {
    this.battleOrder = this.calculateInitialBattleOrder();
  }

  public endCombat() {
    this.battleOrder = [];
    this.combatOver = true;
    // TODO: show battle summary
    this.$emit('end');
  }

  public onEnemyClick(enemy: Monster) {
    if (!this.isHeroTurn) {
      this.waitYourTurnWarning = true;
      return;
    }
    if (enemy.life <= 0) {
      return;
    }
    enemy.life -= 2;
    this.endTurn();
  }

  public endTurn() {
    this.shiftBattleOrder();
    this.processTurn();
  }

  public processTurn() {
    if (this.isHeroTurn) {
      // wait for user's inputs
      this.waitYourTurnWarning = false;
      return;
    }
    // monster turn
    this.attackHero(this.battleOrder[0]);
  }

  public attackHero(monster: Monster) {
    if (this.isHeroTurn) {
      // please don't hurt yourself
      return;
    }
    if (this.hero.life <= 0) {
      // you're already dead
      this.endCombat();
      return;
    }
    const damageDelta = monster.damage[1] - monster.damage[0];
    const calculatedDamage = Math.floor(
      Math.random() * damageDelta + monster.damage[0]
    );
    this.hero.life -= calculatedDamage;
    console.log(`${monster.name} attacks hero for ${calculatedDamage} damage`);
    if (this.hero.life <= 0) {
      this.hero.life = 0;
      console.log(`The hero valiantly dies`);
    }
    setTimeout(() => {
      this.$nextTick(() => {
        this.endTurn();
      });
    }, 2000);
  }

  public shiftBattleOrder() {
    const [top, ...rest] = this.battleOrder;
    this.battleOrder = [...rest, top];
  }

  public calculateInitialBattleOrder() {
    return [this.hero, ...this.enemies];
  }
}
</script>
