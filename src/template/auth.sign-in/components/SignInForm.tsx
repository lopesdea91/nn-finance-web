import Router from "next/router"
import { useSignInForm } from '@/hooks/useForm'
import { AppButton, AppColumn, AppColumns, AppDivider, AppForm, AppInput } from '@/components/base'
import { AppText } from '@/components/base/text/AppText'
import { api } from '@/services/api'
import { useStoreAuth } from '@/hooks/useStoreAuth'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { useStoreFinance } from '@/hooks/useStoreFinance'
import { $cookie } from "@/utils"

export const SignInForm = () => {
  const { setUser } = useStoreAuth()
  const { setPeriod, setWalletPanelId } = useStoreSystem()
  const { setFinanceWallet, setFinanceOrigin, setFinanceTag, setFinanceList } = useStoreFinance()
  const { fields, onChangeField } = useSignInForm()

  const onSubmit = async () => {
    try {
      // get token api
      const signInResult = await api.auth().signIn({
        email: fields.email,
        password: fields.password
      })

      $cookie.set({
        key: 'token',
        value: signInResult.data.token,
        options: {
          path: '/'
        }
      })

      // get data-user api
      const userResult = await api.user().data()
      setUser(userResult.data.user)
      setPeriod(userResult.data.period)

      $cookie.set({
        key: 'data_user',
        value: JSON.stringify({
          id: userResult.data.user.id,
          name: userResult.data.user.name,
        }),
        options: {
          path: '/'
        },
        keyCrypto: true,
        valueCrypto: true
      })

      $cookie.set({
        key: 'period',
        value: userResult.data.period,
        options: {
          path: '/'
        },
        // keyCrypto: true,
        // valueCrypto: true
      })

      // get data-finance api
      const financeResult = await api.finance().data()
      setWalletPanelId(financeResult.data.wallet_panel.id)
      setFinanceWallet(financeResult.data.wallet)
      setFinanceOrigin(financeResult.data.origin)
      setFinanceTag(financeResult.data.tag)
      setFinanceList({
        originType: financeResult.data.originType,
        status: financeResult.data.status,
        type: financeResult.data.type,
      })

      $cookie.set({
        key: 'walletPanelId',
        value: String(financeResult.data.wallet_panel.id),
        options: {
          path: '/'
        },
        // keyCrypto: true,
        // valueCrypto: true
      })

      Router.push('/panel/finance')
    } catch (error) {
      console.log('... error', error);
    }
  }

  return (
    <AppForm
      onSubmit={onSubmit}
      containersx={{ p: 3, maxWidth: 325 }}
    >
      <AppText variant='h3'>
        Bem Vindo
      </AppText>

      <AppDivider />

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