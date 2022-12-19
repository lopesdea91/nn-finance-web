import { useRouter } from "next/router";
import React from "react";
import { AppButton, AppInput, AppText } from "@/components/base";
import { authSignInFormValidation } from "@/validation/authSignInFormValidation";
import api from "@/services/api";
import useApiCommon from "@/hooks/useApiCommon";
import useSystemStore from "@/hooks/useSystemStore";

type Props = {
  submitSuccess: () => void
}

export const AuthSignInForm = ({ }: Props) => {
  const { fields, errors, rule, register, handleSubmit, onChangeField } = authSignInFormValidation()
  const router = useRouter()
  const { setToken } = useApiCommon();
  const { signInSystem } = useSystemStore()

  const onSubmit = async () => {
    const resultSignIn = await api.auth.signIn({
      email: fields.email,
      password: fields.password,
    })

    if (!resultSignIn.status) {
      return;
    }

    setToken(resultSignIn.data.token);

    const resultDataUser = await api.user.data();

    if (!resultDataUser.status) {
      return;
    }

    signInSystem({
      user: resultDataUser.data.user,
      period: resultDataUser.data.period
    })

    router.push('/dashboard');
  }

  return (
    <form
      className="col-9 col-md-6 col-lg-4 col-xl-3 p-3 border shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >

      <AppText size="xl">Login</AppText>

      <AppInput
        label="E-mail"
        type="email"
        {...register("email", rule.email)}
        value={fields.email}
        onChange={onChangeField}
        error={errors?.email?.message}
      />

      <AppInput
        label="Senha"
        type="password"
        {...register("password", rule.password)}
        value={fields.password}
        onChange={onChangeField}
        error={errors?.password?.message}
      />

      <AppButton type="submit" variant="primary" className="mt-3">Entrar</AppButton>
    </form>
  )
}