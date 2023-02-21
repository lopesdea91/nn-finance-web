import Router from "next/router"
import { useSignInForm } from '@/hooks/useForm'
import { AppButton, AppColumn, AppColumns, AppDivisor, AppForm, AppInput } from '@/components/base'
import { AppText } from '@/components/base/text/AppText'
import { api } from '@/services/api'
import { useStoreAuth } from '@/hooks/useStoreAuth'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { useStoreFinance } from '@/hooks/useStoreFinance'
import { $ } from "@/utils"

export const SignInForm = () => {
  const { dispatchSetUser } = useStoreAuth()
  const { dispatchSetPeriod, dispatchSetWalletPanelId } = useStoreSystem()
  const { dispatchSetFinanceWallet, dispatchSetFinanceOrigin, dispatchSetFinanceTag, dispatchSetFinanceList } = useStoreFinance()
  const { fields, onChangeField } = useSignInForm()

  const getToken = async () => {
    try {
      const { data: { token } } = await api.auth.signIn({
        form: {
          email: fields.email,
          password: fields.password
        }
      })

      const key = process.env.NEXT_PUBLIC_KEY_TOKEN || ''

      $.setToken(token)

      return true

    } catch (error) {
      console.log('getToken - error', error)

      return false
    }
  }

  const getUserData = async () => {
    try {
      const { data: { period, user } } = await api.user.data()

      dispatchSetUser(user)
      dispatchSetPeriod(period)

      return true
    } catch (error) {
      console.log('getUserData - error', error)

      return false
    }
  }

  const getFinanceData = async () => {
    try {
      const financeResult = await api.finance.data()

      dispatchSetWalletPanelId(financeResult.data.wallet_panel.id)
      dispatchSetFinanceWallet(financeResult.data.wallet)
      dispatchSetFinanceOrigin(financeResult.data.origin)
      dispatchSetFinanceTag(financeResult.data.tag)
      dispatchSetFinanceList({
        originType: financeResult.data.originType,
        status: financeResult.data.status,
        type: financeResult.data.type,
      })

      return true

    } catch (error) {
      console.log('getFinanceData - error', error)

      return false
    }

  }

  const onSubmit = async () => {
    const resultPromise = await Promise.all([
      getToken(),
      getUserData(),
      getFinanceData(),
    ])
      .then(res => res.every(Boolean))

    if (resultPromise) {
      Router.push('/panel/finance')
    };
  }

  return (
    <AppForm
      onSubmit={onSubmit}
      containersx={{ p: 3, maxWidth: 325 }}
    >
      <AppText variant='h3'>
        Bem Vindo
      </AppText>

      <AppDivisor />

      <AppColumns>
        <AppColumn xs={12} >
          <AppInput
            autoComplete='off'
            label="Email"
            type="text"
            value={fields.email}
            onChange={({ target }) => {
              onChangeField({
                email: target.value,
              })
            }}
          />
        </AppColumn>
        <AppColumn xs={12}>
          <AppInput
            label="Senha"
            type="password"
            value={fields.password}
            onChange={({ target }) => {
              onChangeField({
                password: target.value,
              })
            }}
          />
        </AppColumn>
        <AppColumn xs={12}>
          <AppButton type="submit">Entrar</AppButton>
        </AppColumn>
      </AppColumns>
    </AppForm>
  )
}