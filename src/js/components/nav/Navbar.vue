<script setup>
    import { RouterLink } from "vue-router";
    import CerbLogo from "../CerbLogo.vue";
</script>

<template>
<nav class="navbar justify-content-center navbar-expand-lg navbar-dark bg-dark">
    <div>
        <button class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav nav justify-content-center">
                <li class="nav-item">
                    <RouterLink to="/" class="nav-link">Home</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/about" class="nav-link">About</RouterLink>
                </li>
                <li class="nav-item">
                    <a href="https://www.discord.com" class="nav-link">Discord</a>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Warcraftlogs Tools
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><RouterLink to="/rankings/aggregate" class="dropdown-item">Rankings Aggregate</RouterLink></li>
                    <li><hr class="dropdown-divider"></li>
                    <li class="dropdown-item disabled">Coming soon...</li>
                    <li><a class="dropdown-item disabled" href="#">Player Comparison</a></li>                    
                    <li><a class="dropdown-item disabled" href="#">Role Analysis</a></li>
                </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>