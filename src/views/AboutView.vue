<script setup lang="ts">
import { ref } from 'vue'
let count = ref(0)
const universidades = ref(['USFX', 'UAGRM', 'UASB', 'UPDS'])
function incrementar() {
  count.value++
}
</script>

<template>
  <div class="about">
    <h1>This is an about page, count: {{ count }}</h1>
    <button @click="incrementar">Incrementar</button>
    <ul>
      <li v-for="(universidad, index) in universidades" :key="index">
        {{ universidad }}
      </li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
