<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const form = reactive({
  email: ''
})

</script>

<template>
  <AppForm class="forgotPassword__form">
    <AppText content="Esqueci a senha" size="display" />

    <AppDivisor />

    <AppInput label="Senha" class="mb-4" v-model="form.email" />

    <AppButton content="Enviar" class="w-full" />

    <AppDivisor />

    <AppTextLink
      content="Lembrei minha senha!"
      @click="() => router.push({ name: 'sign-in' })"
    />
    <AppTextLink
      content="Quero me registar!"
      @click="() => router.push({ name: 'sign-up' })"
    />
  </AppForm>
</template>

<style lang="scss" scoped>
.forgotPassword__form {
  @apply w-72 p-3 border border-gray-200 rounded shadow;
}
</style>
