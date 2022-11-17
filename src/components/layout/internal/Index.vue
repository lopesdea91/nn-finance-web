<script setup lang="ts">
// import LayoutMenu from "@/components/layout/internal/LayoutMenu.vue";
// import LayoutHeader from "@/components/layout/internal/LayoutHeader.vue";
// import LayoutContent from "@/components/layout/internal/LayoutContent.vue";

const ns = [1, 2, 3, 4, 5, 6];
</script>
<template>
  <div class="layout_internal">
    <!-- <LayoutMenu />
    <LayoutHeader />
    <LayoutContent>
      <h1>Internal !!!!</h1>
      <ul>
        <li v-for="n in ns" :key="n">{{ n }}</li>
      </ul>
      <slot />
    </LayoutContent> -->
    <slot />
  </div>
</template>

<style lang="scss">
.layout_internal {
  @media (min-width: 640px) {
    @apply grid;

    grid-template-columns: 300px 1fr;
    grid-template-rows: 10px 1fr;
    grid-template-areas: "menu header" "menu content";
  }
}
</style>
