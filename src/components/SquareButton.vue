<template>
  <v-card
    class="d-flex flex-column align-center square-button"
    :elevation="0"
    :disabled="disabled"
  >
    <v-card
      outlined
      class="mx-auto"
      :width="size"
      :color="active ? 'grey' : ''"
      v-on="$listeners"
    >
      <v-avatar :min-width="size" :min-height="size">
        <v-icon>{{ icon }}</v-icon>
      </v-avatar>
    </v-card>
    <v-card-title class="body-1 pa-0">{{ label }}</v-card-title>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'SquareButton',
})
export default class SquareButton extends Vue {
  @Prop({ required: true })
  public label!: string;

  @Prop({ required: true })
  public icon!: string;

  @Prop({ default: 50 })
  public size!: number;

  @Prop({ default: false })
  public active!: boolean;

  @Prop({ default: false })
  public disabled!: boolean;
}
</script>
