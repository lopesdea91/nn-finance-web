<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>

<template>
  <FontAwesomeIcon :icon="$props.icon" />
</template>
