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
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'App',

  components: {
    Home,
    Combat,
  },

  data: () => ({
    combat: false,
    enemies: [
      {
        id: '1',
        name: 'Ghost',
        icon: 'mdi-ghost',
        maxLife: 10,
        life: 10,
        damage: [3, 7],
      },
      {
        id: '2',
        name: 'Ghost',
        icon: 'mdi-ghost',
        maxLife: 10,
        life: 10,
        damage: [3, 7],
      },
      {
        id: '3',
        name: 'Ghost',
        icon: 'mdi-ghost',
        maxLife: 10,
        life: 10,
        damage: [3, 7],
      },
    ],
  }),

  methods: {
    ...mapActions('combat', ['start']),
    handleCombatStart() {
      this.start({ enemies: this.enemies });
      this.combat = true;
    },
    handleCombatEnd() {
      this.combat = false;
    },
  },
});
</script>
