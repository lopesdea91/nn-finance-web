<script setup lang="ts"></script>

<template>
  <div class="app__btn--group">
    <slot />
  </div>
</template>

<style lang="scss">
.app__btn--group {
  @apply flex gap-2;
}
</style>
