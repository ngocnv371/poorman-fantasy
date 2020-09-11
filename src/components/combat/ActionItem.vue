<template>
  <v-card class="pt-2 d-flex flex-column align-center" :elevation="0">
    <v-card
      outlined
      class="mx-auto"
      :width="size"
      :color="active ? 'indigo' : ''"
      @click="handleClick"
    >
      <v-avatar :min-width="size" :min-height="size">
        <v-icon>{{ action.icon }}</v-icon>
      </v-avatar>
    </v-card>
    <v-card-title class="body-1 pa-0">{{ action.name }}</v-card-title>
    <v-card-subtitle class="pa-0 pt-2">
      {{ action.description }}
    </v-card-subtitle>
  </v-card>
</template>
<script lang="ts">
import { Ability } from '@/models';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const BattleModule = namespace('battle');

@Component({
  name: 'ActionItem',
})
export default class ActionItem extends Vue {
  @Prop({ required: true })
  public action!: Ability;

  @Prop({ default: 60 })
  public size!: number;

  @Prop({ default: null })
  public cooldown!: number | null;

  @BattleModule.Action('selectAbility')
  public selectAbility!: (payload: { id: string }) => void;

  @BattleModule.Getter('selectedAbility')
  public selectedAbility!: Ability | undefined;

  public get active() {
    return this.selectedAbility && this.selectedAbility.id === this.action.id;
  }

  public handleClick() {
    this.selectAbility(this.action);
  }
}
</script>
