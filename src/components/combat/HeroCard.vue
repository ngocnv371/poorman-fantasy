<template>
  <v-card flat>
    <div :style="{ width: width + 'px' }" class="mx-auto">
      <StatusBar :max="hero.maxLife" :value="hero.life" key="life" />
      <StatusBar
        :max="hero.maxSanity"
        :value="hero.sanity"
        color="grey"
        key="sanity"
      />
      <v-layout column>
        <v-layout>
          <div class="flex">
            <SquareButton
              class="pt-2"
              v-bind="categorySkills"
              :key="categorySkills.name"
              :active="categorySkills.id === selectedCategory.id"
              :disabled="!active"
              @click="selectedCategory = categorySkills"
            />
          </div>
          <div class="flex">
            <SquareButton
              class="pt-2"
              v-bind="categorySpells"
              :key="categorySpells.name"
              :active="categorySpells.id === selectedCategory.id"
              :disabled="!active"
              @click="selectedCategory = categorySpells"
            />
          </div>
          <div class="flex">
            <SquareButton
              class="pt-2"
              v-bind="categoryInventory"
              :key="categoryInventory.name"
              :disabled="!active"
              @click="openInventory"
            />
          </div>
          <div class="flex">
            <SquareButton
              class="pt-2"
              v-bind="categoryRetreat"
              :key="categoryRetreat.name"
              :disabled="!active"
              @click="retreat"
            />
          </div>
        </v-layout>
      </v-layout>
    </div>
    <ActionBar
      :actions="actions"
      :key="selectedCategory.name"
      :disabled="!active"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import StatusBar from './StatusBar.vue';
import SquareButton from '../SquareButton.vue';
import ActionBar from './ActionBar.vue';
import { AbilityType, Hero } from '@/models';

@Component({
  name: 'HeroCard',
  components: {
    ActionBar,
    SquareButton,
    StatusBar,
  },
})
export default class HeroCard extends Vue {
  @Prop({ required: true })
  public hero!: Hero;

  @Prop({ default: 320 })
  public width!: number;

  @Prop({ default: false })
  public active!: boolean;

  public categorySpells = {
    id: AbilityType.Spell,
    label: 'Spells',
    icon: 'mdi-book-open-variant',
  };

  public categorySkills = {
    id: AbilityType.Skill,
    label: 'Skills',
    icon: 'mdi-sword',
  };

  public categoryInventory = {
    id: 'inventory',
    label: 'Inventory',
    icon: 'mdi-briefcase',
  };

  public categoryRetreat = {
    id: 'retreat',
    label: 'Retreat',
    icon: 'mdi-exit-run',
  };

  public selectedCategory = this.categorySkills;

  public get actions() {
    if (this.selectedCategory.id === this.categorySkills.id) {
      return this.hero.abilities.filter(a => a.type === AbilityType.Skill);
    } else if (this.selectedCategory.id === this.categorySpells.id) {
      return this.hero.abilities.filter(a => a.type === AbilityType.Spell);
    }
    return [];
  }

  public openInventory() {
    // TODO: open
  }

  public retreat() {
    // TODO: open
  }
}
</script>
