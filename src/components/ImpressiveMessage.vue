<template>
  <span v-show="show" class="headline">
    <slot></slot>
  </span>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { animateCSS, generateId } from '@/util';

@Component({
  name: 'ImpressiveMessage',
})
export default class ImpressiveMessage extends Vue {
  @Prop({ required: true })
  public show!: boolean;

  public mounted() {
    this.$el.id = generateId();
    this.onShowChanged();
  }

  @Watch('show', { immediate: true })
  public onShowChanged() {
    if (!this.$el || !this.$el.id) {
      return;
    }
    if (this.show) {
      animateCSS('#' + this.$el.id, 'bounceIn');
    } else {
      animateCSS('#' + this.$el.id, 'bounceOut');
    }
  }
}
</script>
