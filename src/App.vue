<template>
  <v-app dark>
    <v-main>
      <Combat />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Combat from './components/combat/Combat.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Combat,
  },

  data: () => ({
    //
  }),
});
</script>
