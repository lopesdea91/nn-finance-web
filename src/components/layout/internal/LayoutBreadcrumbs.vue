<script setup lang="ts">
import layoutStore from "@/store/layoutStore";
import { toRefs } from "vue";

const { breadcrumbs } = toRefs(layoutStore.state);
</script>

<template>
  <div class="breadcrumb__list">
    <template v-for="(item, i) in breadcrumbs">
      <RouterLink class="breadcrumb__item" v-if="!item.disabled" :to="item.to">
        {{ item.text }}
      </RouterLink>

      <span v-else class="breadcrumb__item disabled"> {{ item.text }} </span>

      <span v-show="i + 1 < breadcrumbs.length" class="breadcrumb__item">
        /
      </span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  &__list {
    @apply px-2 py-2 mb-2 border-b border-gray-300 bg-white flex gap-1;
  }
  &__item {
    @apply text-xs;

    &.disabled {
      @apply opacity-75;
    }
  }
}
</style>
