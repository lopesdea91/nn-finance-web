<script setup lang="ts">
import layoutStore from "@/store/LayoutStore";
</script>

<template>
  <div class="layout_internal_header">
    <div class="layout_internal_headerLogo">
      <img class="" src="@/assets/images/3d-fluency-banknotes-and-coins.png" />
    </div>

    <span>TITULO</span>

    <div class="layout_internal_headerBtn__profile">
      <AppIcon icon="fa-solid fa-id-card" />
    </div>

    <div
      class="layout_internal_headerBtn__menu"
      @click="layoutStore.actions.setMenu(!layoutStore.state.menuOpen)"
    >
      <AppIcon icon="fa-solid fa-bars" />
    </div>
  </div>
</template>

<style lang="scss">
.layout_internal_header {
  @apply flex items-center gap-2 border border-gray-200 shadow p-2 bg-gray-100 transition-all z-20 fixed top-1 left-1 right-1 rounded;

  @media (min-width: 640px) {
    left: calc(75px + 0.75rem);
  }
  @media (min-width: 1024px) {
    left: calc(175px + 0.75rem);
  }

  &Logo {
    @apply flex items-center justify-center h-8 sm:hidden;
  }
  &Btn__profile,
  &Btn__menu {
    @apply duration-150 cursor-pointer;
  }
  &Btn__profile {
    @apply ml-auto border border-gray-300 px-2 text-2xl;
  }
  &Btn__menu {
    @apply sm:hidden border border-gray-300 py-0.5 px-2 text-lg;
  }
}
</style>
