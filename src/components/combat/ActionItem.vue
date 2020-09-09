<template>
  <v-card class="pt-2 d-flex flex-column align-center" :elevation="0">
    <v-card
      outlined
      class="mx-auto"
      :width="size"
      @click="$emit('click', $event)"
    >
      <v-avatar :min-width="size" :min-height="size">
        <v-icon>{{ icon }}</v-icon>
      </v-avatar>
    </v-card>
    <v-card-title class="body-1 pa-0">{{ name }}</v-card-title>
    <v-card-subtitle class="pa-0 pt-2">
      {{ description }}
    </v-card-subtitle>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'ActionItem',
})
export default class ActionItem extends Vue {
  @Prop({ required: true })
  public name!: string;

  @Prop({ required: true })
  public description!: string;

  @Prop({ required: true })
  public icon!: string;

  @Prop({ default: 60 })
  public size!: number;

  @Prop({ default: null })
  public cooldown!: number | null;
}
</script>
