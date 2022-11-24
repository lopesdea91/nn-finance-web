<script setup lang="ts"></script>

<template>
  <div class="layout_internal_content">
    <slot />
  </div>
</template>

<style lang="scss">
.layout_internal_content {
  @apply h-screen transition-all z-10 pt-16 p-3 bg-gray-200;
  // height: 200vh;

  @media (min-width: 640px) {
    @apply pl-24;
  }
  @media (min-width: 1024px) {
    @apply pl-48;
  }
}
</style>
