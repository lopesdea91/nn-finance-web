<script setup lang="ts">
import LayoutInternal from "@/components/layout/internal/Index.vue";
import LayoutExternal from "@/components/layout/external/Index.vue";
import AppStore from "@/store/AppStore";
</script>

<template>
  <!-- <ul>
    <button class="p-1 ml-2 border-red-500 border" @click="mudar">test {{ test }}</button>
    <RouterLink class="p-1 ml-2 border-red-500 border" to="/sign-in">Sign-in</RouterLink>
    <RouterLink class="p-1 ml-2 border-red-500 border" to="/sign-out">Sign-out</RouterLink>
    <RouterLink class="p-1 ml-2 border-red-500 border" to="/dashboard">dashboard</RouterLink>
  </ul> -->
  <Transition name="fade-layout" mode="out-in">
    <LayoutInternal v-if="AppStore.state.login">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade-page" mode="out-in">
          <div class="page" :key="route.name">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
    </LayoutInternal>

    <LayoutExternal v-else>
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade-page" mode="out-in">
          <div class="page" :key="route.name">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
    </LayoutExternal>
  </Transition>
</template>

<style lang="scss">
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.2s ease;
}

.fade-page-enter-from,
.fade-page-leave-to {
  opacity: 0;
}

.fade-layout-enter-active,
.fade-layout-leave-active {
  @apply duration-300 ease-in;
}

.fade-layout-enter-from {
  @apply opacity-0 -translate-y-5;
}
</style>
