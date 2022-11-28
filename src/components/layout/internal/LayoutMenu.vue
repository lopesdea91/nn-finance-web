<script setup lang="ts">
import { computed, onMounted, onUnmounted, toRefs } from "vue";
import menuList from "@/content/layout.menu";
import layoutStore from "@/store/LayoutStore";

const { menuOpen } = toRefs(layoutStore.state);

onUnmounted(() => {
  layoutStore.actions.resizeOff();
});
onMounted(() => {
  layoutStore.actions.resizeOn();
});
</script>

<template>
  <div class="layout_internal_menu" :class="{ '--show': menuOpen }">
    <span
      class="layout_internal_menu_btn"
      @click="layoutStore.actions.setMenu(!layoutStore.state.menuOpen)"
    >
      <AppIcon icon="fa-solid fa-xmark" />
    </span>

    <div class="layout_internal_brand">
      <div class="layout_internal_brand_logo">
        <img
          class=""
          src="@/assets/images/3d-fluency-banknotes-and-coins.png"
        />
      </div>
    </div>

    <!-- 
    <div class="layout_internal_brand--mobile">
      <h1>Menu</h1>
    </div>

    <div class="layout_internal_brand--dasktop">
      <div class="layout_internal_menuLogo">
        <img
          class=""
          src="@/assets/images/3d-fluency-banknotes-and-coins.png"
        />
      </div>
    </div> 
    -->

    <ul class="layout_internal_menu_list">
      <RouterLink
        v-for="(item, i) in menuList"
        :key="i"
        class="layout_internal_menu_listItem"
        :class="item.class"
        :title="item.label"
        :to="item.to"
      >
        <div class="layout_internal_menu_listItem__icon">
          <AppIcon :icon="item.icon" />
        </div>
        <span class="layout_internal_menu_listItem__text">
          {{ item.label }}
        </span>
      </RouterLink>
    </ul>
  </div>
</template>

<style lang="scss">
@keyframes menuEnter {
  0% {
    box-shadow: 2px 2px 8px 2px transparent, 2rem 0 0 4rem transparent;
  }
  100% {
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.3),
      2rem 0 0 4rem rgba(0, 0, 0, 0.65);
  }
}

.layout_internal_menu {
  @apply border border-gray-200 shadow bg-gray-100 transition-all duration-300 z-30 fixed;
  @apply flex flex-col gap-2;

  @media (max-width: 640px) {
    @apply w-0 top-3 bottom-3 left-0 rounded-tr rounded-br;

    &:not(.--show) {
      @apply overflow-hidden;
    }

    &.--show {
      animation: menuEnter 0.5s forwards;
      animation-delay: 0.25s;
      width: calc(100% - 53px);

      .layout_internal_menu_btn {
        @apply flex;
      }
    }
  }
  @media (min-width: 640px) {
    @apply w-[75px] top-1 bottom-1 left-1 rounded;
  }
  @media (min-width: 1024px) {
    @apply w-[175px];
  }
}

.layout_internal_menu_btn {
  @apply hidden items-center justify-center h-9 w-10 absolute -right-11 cursor-pointer text-white text-2xl;
}

.layout_internal_brand {
  @apply border-b border-gray-300 py-2;

  &_logo {
    @apply flex items-center justify-center h-12;
  }
}

.layout_internal_menu_list {
  @apply mx-4 sm:mx-2;

  &Item {
    @apply flex items-stretch sm:justify-center lg:justify-start gap-2 px-2 h-11 sm:h-9 pb-1 mb-1 cursor-pointer text-gray-800 duration-150 relative;

    &:not(:last-child) {
      @apply border-b border-b-gray-300;
    }
    &:hover,
    &.active {
      @apply bg-gray-200;
    }
    &.--plus::after {
      @apply absolute -left-1 top-1 h-3 w-3 flex items-center justify-center text-xs text-white bg-gray-300 rounded-lg; // w-3 h-3
      content: "+";
      // line-height: 1
      font-family: monospace;
    }
    &__icon {
      @apply inline-flex items-center justify-center;
      min-width: 20px;
    }
    &__text {
      @apply self-center truncate md:text-sm sm:hidden lg:block;
    }
  }
}
</style>
