<script setup lang="ts">
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <header class="c-header">
    <div class="o-container o-container--1200">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/detail">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <main>
    <RouterView />
  </main>
  <footer class="c-footer ">
    <div class="o-container o-container--1200">
      <p class="u-text--center">Created by Paul</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  .c-header {
    background-color: #fefefe;
  }
  .c-footer {
    padding-top: 1rem;
  }
</style>
