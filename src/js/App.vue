<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import CerbLogo from "../js/components/CerbLogo.vue"
  import Navbar from './components/nav/Navbar.vue';
</script>

<template>
  <header>
    <RouterLink to="/" class="nav-link">
      <CerbLogo />
    </RouterLink>
    <div class="container-md">
      <div class="row">
        <Navbar />
      </div>
    </div>
  </header>
  
  <div class="container-md">
    <div class="row">
      <RouterView />
    </div>
  </div>
  
</template>

