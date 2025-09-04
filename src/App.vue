<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
