<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const form = reactive({
  name: '',
  email: '',
  password: '',
})

</script>

<template>
  <AppForm class="signUp__form">
    <AppText content="Registro" size="display" />

    <AppDivisor />

    <AppInput label="Nome" v-model="form.name" />
    <AppInput label="Email" v-model="form.email" />
    <AppInput label="Senha" class="mb-4" v-model="form.password" />

    <AppButton content="Enviar" class="w-full" />

    <AppDivisor />

    <AppTextLink
      content="Já tenho conta!"
      @click="() => router.push({ name: 'sign-in' })"
    />
  </AppForm>
</template>

<style lang="scss" scoped>
.signUp__form {
  @apply w-72 p-3 border border-gray-200 rounded shadow;
}
</style>
