<script setup lang="ts">
import LayoutMenu from "@/components/layout/internal/LayoutMenu.vue";
import LayoutHeader from "@/components/layout/internal/LayoutHeader.vue";
import LayoutContent from "@/components/layout/internal/LayoutContent.vue";
import layoutStore from "@/store/LayoutStore";

function mudar() {
  layoutStore.actions.setMenu(!layoutStore.state.menuOpen);
}

const ns = [1, 2, 3, 4, 5, 6];
</script>
<template>
  <div class="layout_internal">
    <LayoutMenu />
    <LayoutHeader />
    <LayoutContent>
      aaaaaaaaaaaaaaaaaaa

      <button @click="mudar">
        MENU MOBILE {{ layoutStore.state.menuOpen }}
      </button>

      <h1>Internal !!!!</h1>
      <ul>
        <li v-for="n in ns" :key="n">{{ n }}</li>
      </ul>
      <slot />
    </LayoutContent>
  </div>
</template>

<style lang="scss">
.layout_internal {
}
</style>
