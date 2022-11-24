<script setup lang="ts"></script>
<template>
    <div class="layout_external">
        <slot />
    </div>
</template>

<style lang="scss">
.layout_external {
    @apply h-full flex justify-center items-center;
}
</style>
