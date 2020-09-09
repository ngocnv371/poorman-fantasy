<template>
  <v-progress-linear :value="percent" :color="color" :height="size">
    {{ value }}/{{ max }}
  </v-progress-linear>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'StatusBar',
})
export default class StatusBar extends Vue {
  @Prop({ required: true })
  public value!: number;

  @Prop({ required: true })
  public max!: number;

  @Prop({ default: 30 })
  public size!: number;

  @Prop({ default: 'red lighten-1' })
  public color!: string;

  public get percent() {
    return Math.floor((this.value / this.max) * 100);
  }
}
</script>
