<template>
  <v-layout style="overflow-y: hidden">
    <v-spacer></v-spacer>
    <div
      v-for="index of actions.length"
      class="d-flex"
      :key="actions[index - 1].name"
    >
      <ActionSlot
        class="ma-1"
        :action="actions[index - 1]"
        :key="actions[index - 1].name"
        :disabled="disabled"
      />
    </div>
    <div class="d-flex">
      <ActionSlot class="ma-1" key="empty slot 1" />
    </div>
    <v-spacer></v-spacer>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ActionSlot from './ActionSlot.vue';
import { Action } from '@/models';

@Component({
  name: 'ActionBar',
  components: {
    ActionSlot,
  },
})
export default class ActionBar extends Vue {
  @Prop({ required: true })
  public actions!: Action[];

  @Prop({ default: false })
  public disabled!: boolean;
}
</script>
