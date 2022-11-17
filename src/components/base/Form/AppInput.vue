<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  label: string;
  modelValue: string;
  type?: string;
  error?: string;
}>();

const idFor = computed(() => `input-${props?.label || Date.now()}`);
</script>

<template>
  <div class="app_input_container">
    <header class="app_input__header">
      <label v-if="$props.label" :for="idFor">
        {{ $props.label }}
      </label>
      <slot name="label-end"></slot>
    </header>
    <input
      :id="idFor"
      :type="$props.type || 'text'"
      :value="modelValue"
      @input="({ target }: Event) => $emit('update:modelValue', target.value)"
      :class="{
        error: !!error,
      }"
      autocomplete="off"
    />
    <Transition>
      <span v-show="error">{{ error }}</span>
    </Transition>
  </div>
</template>

<style lang="scss">
.app_input_container {
  @apply text-sm;

  &__header {
    @apply flex mb-1;
  }

  & label {
    @apply font-light text-gray-800 ;
  }

  & input {
    @apply mb-4 outline-none bg-transparent border border-gray-300 text-gray-600 rounded shadow block w-full p-2 duration-200;

    &:disabled {
      @apply cursor-not-allowed bg-gray-100;
    }
    &:focus {
      @apply border-gray-400 shadow-md;
    }
  }

  & span {
    @apply block text-end text-xs mt-1;
  }
  // label {
  //   @apply block mb-1 text-sm text-gray-800 font-medium;
  // }

  // input {
  //   @apply block p-2 mb-2 w-full text-sm text-gray-800 border border-gray-300 rounded outline-none bg-transparent;


  //   // block p-2 w-full sm:text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
  //   &.error {
  //     @apply border-red-600 shadow-red-400 shadow-sm;
  //   }
  // }
}
</style>
