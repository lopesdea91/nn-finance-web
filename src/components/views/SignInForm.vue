<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import { SignInForm } from "@/types";
import useStoreSystem from "@/hooks/useStoreSystem";
import useApiCommon from "@/hooks/useApiCommon";

const storeSystem = useStoreSystem();
const apiCommon = useApiCommon();
const router = useRouter();

const form = reactive<SignInForm>({
  email: "test1@email.com",
  password: "1234",
  // email: "",
  // password: "",
});

const onSubmit = async (): Promise<void> => {
  const resultSignIn = await api.auth.signIn({
    email: form.email,
    password: form.password,
  });

  if (!resultSignIn.status) {
    console.log("fazer oo alerta");
    return;
  }

  await apiCommon.setToken(resultSignIn.data.token);

  const resultDataUser = await api.user.data();

  if (!resultDataUser.status) {
    console.log("fazer oo alerta");
    return;
  }

  await storeSystem.signIn({
    user: resultDataUser.data.user,
    period: resultDataUser.data.period,
  });

  router.push({ name: "dashboard" });
};

</script>

<template>
  <AppForm @onSubmit="onSubmit" class="signIn__form">
    <AppText content="Bem vindo" size="display" />

    <AppDivisor />

    <AppInput label="Email" v-model="form.email" />
    <AppInput
      label="Senha"
      type="password"
      class="mb-4"
      v-model="form.password"
    />

    <AppButton content="Entrar" class="w-full" type="submit" />

    <AppDivisor />

    <AppTextLink
      class="w-full"
      content="Esqueci minha senha!"
      @click="() => router.push({ name: 'forgot-password' })"
    />
    <AppTextLink
      class="w-full"
      content="Quero me registar!"
      @click="() => router.push({ name: 'sign-up' })"
    />
  </AppForm>
</template>

<style lang="scss" scoped>
.signIn__form {
  @apply w-72 p-3 border border-gray-200 rounded shadow;
}
</style>
