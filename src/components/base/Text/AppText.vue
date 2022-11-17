<script setup lang="ts">
import { computed } from "vue";

const { size } = defineProps<{
  content: string,
  size: string,
}>();

const classes = computed(() => {
  return {
    display: size === "display",
    large: size === "lg",
    normal: size === "md" && !size,
    small: size === "sm",
  };
});
</script>

<template>
  <p class="app_text" :class="classes">
    {{ $props.content }}
    <slot v-if="!$props.content" />
  </p>
</template>

<style lang="scss">
.app_text {
  @apply mb-2;
  &.display {
    @apply text-3xl leading-loose;
  }
  &.title {
    @apply text-2xl leading-loose;
  }
  &.large {
    @apply text-xl leading-relaxed;
  }
  &.normal {
    @apply text-base leading-8;
  }
  &.small {
    @apply text-sm leading-6;
  }
}
</style>
