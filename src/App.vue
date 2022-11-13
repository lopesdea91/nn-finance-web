<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, reactive } from "@vue/runtime-core";
import axios from "axios";
import HelloWorld from "./components/HelloWorld.vue";

const test = reactive([]);

onMounted(async () => {
  const url = import.meta.env.VITE_URL_API;
  
  const { status, data } = await axios.get(`${url}/api/teste`);

  if (status === 200) {
    data.map((el) => test.push(el));
  }
});
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <hr />
  <div v-for="el in test" :key="el.id">
    {{ el.id }} || {{ el.name }} || {{ el.email }}
  </div>

  <hr />

  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
