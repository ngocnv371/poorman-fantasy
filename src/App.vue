<template>
  <v-app dark>
    <v-main>
      <Combat v-if="combat" @end="combat = false" />
      <Home v-else @combat="combat = true" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from './views/Home.vue';
import Combat from './components/combat/Combat.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Home,
    Combat,
  },

  data: () => ({
    combat: false,
  }),
});
</script>
