<template>
  <v-card
    outlined
    class="pt-2 d-flex flex-column align-center"
    width="100"
    height="130"
    :disabled="disabled"
  >
    <ActionItem v-if="action" :action="action" />
  </v-card>
</template>
<script lang="ts">
import { Ability } from '@/models';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ActionItem from './ActionItem.vue';

@Component({
  name: 'ActionSlot',
  components: {
    ActionItem,
  },
})
export default class ActionSlot extends Vue {
  @Prop({ default: null })
  public action!: Ability | null;

  @Prop({ default: false })
  public disabled!: boolean;
}
</script>
