<script setup lang="ts">
import api from "@/services/api";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();


const form = reactive({
  name: '',
  email: '',
  password: '',
})

const onSubmit = async () => {
  const resultSignUp = await api.auth.signUp({
    name: form.name,
    email: form.email,
    password: form.password,
  })

  if(!resultSignUp.status) {
    console.log("fazer oo alerta");
    return;
  }

  alert('fazer alerta de "cadastro realizado"')

  router.push({ name: "sign-in" });
}

</script>

<template>
  <AppForm @onSubmit="onSubmit" class="signUp__form">
    <AppText content="Registro" size="display" />

    <AppDivisor />

    <AppInput label="Nome" v-model="form.name" />
    <AppInput label="Email" v-model="form.email" />
    <AppInput label="Senha" class="mb-4" v-model="form.password" />

    <AppButton content="Enviar" class="w-full" type="submit" />

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
