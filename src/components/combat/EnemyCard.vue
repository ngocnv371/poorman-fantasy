<template>
  <v-card
    class="d-flex flex-column align-center"
    v-on="$listeners"
    v-bind="$attrs"
    @click="handleClick"
    :width="width"
    :height="height"
    :outlined="!dead"
    :elevation="0"
  >
    <template v-if="!dead">
      <v-avatar :min-width="width" :min-height="width">
        <v-icon :size="iconSize">
          {{ monster.icon }}
        </v-icon>
      </v-avatar>
      <v-card-title key="name" class="pa-0 text-center">
        {{ monster.name }}
      </v-card-title>
      <StatusBar :max="monster.maxLife" :value="monster.life" />
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import StatusBar from './StatusBar.vue';
import { Monster } from '@/models';
import { animateCSS } from '@/util';

@Component({
  name: 'EnemyCard',
  components: {
    StatusBar,
  },
})
export default class EnemyCard extends Vue {
  @Prop({ required: true })
  public monster!: Monster;

  public get width() {
    return 100;
  }

  public get height() {
    return this.width * 1.6;
  }

  public get iconSize() {
    return this.width / 2;
  }

  public get dead() {
    return this.monster.life <= 0;
  }

  public get elementId() {
    return `monster-card--${this.monster.id}`;
  }

  public mounted() {
    this.$el.id = this.elementId;
    animateCSS('#' + this.elementId, 'backInDown');
  }

  @Watch('monster.life', { immediate: true })
  public onMonsterLifeUpdated(newValue: number, old: number) {
    if (newValue < old) {
      animateCSS('#' + this.elementId, 'headShake');
    }
  }

  public handleClick($event: unknown) {
    this.$emit('click', $event);
  }
}
</script>
