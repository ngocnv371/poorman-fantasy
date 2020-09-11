<template>
  <v-app dark>
    <v-main>
      <Combat v-if="combat" @end="handleCombatEnd" />
      <Home v-else @combat="handleCombatStart" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from './views/Home.vue';
import Combat from './views/Combat.vue';
import { mapActions, mapState } from 'vuex';
import { enemies } from '@/models/defaultEnemies';

export default Vue.extend({
  name: 'App',

  components: {
    Home,
    Combat,
  },

  data: () => ({
    combat: false,
    enemies: enemies,
  }),

  computed: {
    ...mapState(['hero']),
  },

  methods: {
    ...mapActions('battle', ['start']),
    handleCombatStart() {
      this.start({ combatants: [this.hero, ...this.enemies] });
      this.combat = true;
    },
    handleCombatEnd() {
      this.combat = false;
    },
  },
});
</script>
