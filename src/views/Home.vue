<template>
  <div class="home">
    <v-btn color="primary" @click="$emit('combat')">Enter Combat</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
