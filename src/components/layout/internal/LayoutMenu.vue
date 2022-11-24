<script setup lang="ts">
import { computed, onMounted, onUnmounted, toRefs } from "vue";
import layoutStore from "@/store/LayoutStore";

const { menuOpen } = toRefs(layoutStore.state);

const menuList = computed(() => [
  { icon: "fa-solid fa-house", label: "Dashboard" },
  { icon: "fa-solid fa-cash-register", label: "Novo registro" },
  { icon: "fa-solid fa-receipt", label: "Extrato" }, // <i class="fa-solid fa-receipt"></i>
  { icon: "fa-solid fa-rectangle-list", label: "Lista" }, // <i class="fa-regular fa-rectangle-list"></i>
  { icon: "fa-solid fa-credit-card", label: "Fatura" }, // <i class="fa-regular fa-credit-card"></i>
  // { icon: "fa-solid fa-house", label: "Dashboard" },
  // { icon: "fa-solid fa-house", label: "Dashboard" },
]);

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
      <li
        v-for="(menuItem, i) in menuList"
        :key="i"
        class="layout_internal_menu_listItem"
        :title="menuItem.label"
      >
        <div class="layout_internal_menu_listItem__icon">
          <AppIcon :icon="menuItem.icon" />
        </div>
        <span class="layout_internal_menu_listItem__text">
          {{ menuItem.label }}
        </span>
      </li>
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
  // &--mobile {
  //   @apply md:hidden;
  // }
  // &--dasktop {
  //   @apply hidden md:block;
  // }
}

.layout_internal_menu_list {
  @apply mx-4 sm:mx-2;

  &Item {
    @apply flex items-stretch sm:justify-center lg:justify-start gap-2 px-2 h-9 pb-1 mb-1 cursor-pointer text-gray-800 duration-150;

    &:not(:last-child) {
      @apply border-b border-b-gray-300;
    }

    &:hover {
      @apply bg-stone-800 text-white;
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
