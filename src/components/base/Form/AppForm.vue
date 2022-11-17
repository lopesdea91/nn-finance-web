<script setup lang="ts">
</script>

<template>
    <form @submit.prevent="$emit('onSubmit')">
        <slot />
    </form>
</template>