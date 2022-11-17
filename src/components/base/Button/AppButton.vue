<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  content: string;
  icon?: string;
  iconPosition?: string;
  variant?: | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark"; 
  type?: "button" | "submit" | "reset";
  outline?: boolean;
  disabled?: boolean;
}>();

const vBindButton = computed(() => {
  const variant = !!props.variant
    ? `variant--${props.variant}`
    : "variant--default";

  const outline = !!props.outline;
  const disabled = !!props.disabled;

  return {
    disabled,
    type: props.type || "button",
    class: [variant, { outline }],
  };
});
</script>

<template>
  <button v-bind="{ ...$attrs, ...vBindButton }">
    <div v-if="$props.icon && $props.iconPosition === 'left'">
      <Icon :icon="$props.icon" />
    </div>

    {{ $props.content }}

    <slot v-if="!$props.content" />

    <div v-if="$props.icon && $props.iconPosition === 'rigth'">
      <Icon :icon="$props.icon" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
button {
  @apply flex items-center justify-center gap-2 py-1 px-3 text-sm text-gray-800 border border-gray-400 rounded;
  //   &:focus {
  //     @apply outline-none ring-4 ring-blue-300;
  //   }
  &:hover {
    @apply text-white duration-200 bg-gray-800;
  }
}
</style>
