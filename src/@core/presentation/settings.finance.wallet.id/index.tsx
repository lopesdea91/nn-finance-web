import React from 'react'
import { AppDivider, AppTab, AppTabPanel, AppTabs, AppTitle } from '@/components'
import { ContextSSR } from '@/types/system'
import { SystemStore } from '@/store/hook'
import { http } from '@/@core/infra/http'
import { Section } from '@/layouts/LayoutPrivate/components'
import { PageSettingsFinanceWalletIdStore } from '@/store/hook/PageSettingsFinanceWalletId'
import { $cookie } from '@/utils'
import { useTitlePage } from '@/hooks'
import { SettingsFinanceWalletIdMethods } from './index.methods'
import { TabConsolidate, TabComposition, TabData } from './components'
import { FormWalletIdProps } from './components/Form'

const defaultFields: FormWalletIdProps['defaultValues'] = {
  id: null,
  description: '',
  enable: '1',
  panel: '0',
  // json: {},
}

type Props = {
  unauthenticated: boolean
  form: FormWalletIdProps['initialValues']
}
export const SettingsFinanceWalletIdPage = (props: Props) => {
  const systemStore = SystemStore()
  const pageState = PageSettingsFinanceWalletIdStore()
  const { handleSubmit } = SettingsFinanceWalletIdMethods()

  const title = props.form.id ? "Edição" : "Cadastro"

  useTitlePage(`${title} de carteira`)

  return (
    <>
      <AppTitle variant="h5">{title}</AppTitle>

      <Section>
        <AppTabs value={pageState.state.tab} handleChangeTabs={pageState.setTab} >
          <AppTab
            label="Dados"
            index={0}
            disabled={systemStore.state.loading}
          />
          <AppTab
            label="Consolidar"
            index={1}
            disabled={systemStore.state.loading}
          />
          <AppTab
            label="Composição Metas"
            index={2}
            disabled={systemStore.state.loading}
          />
        </AppTabs>

        <AppDivider />

        <AppTabPanel index={pageState.state.tab} value={0} keepAlive>
          <TabData
            form={{
              onSubmit: handleSubmit,
              initialValues: props.form,
              defaultValues: defaultFields
            }}
          />
        </AppTabPanel>

        <AppTabPanel index={pageState.state.tab} value={1} keepAlive>
          <TabConsolidate />
        </AppTabPanel>

        <AppTabPanel index={pageState.state.tab} value={2} keepAlive>
          <TabComposition />
        </AppTabPanel>
      </Section>
    </>
  )
}

export const SettingsFinanceWalletIdServerSideProps = async (ctx: ContextSSR) => {
  const isNew = ctx.query.id === 'new'

  if (isNew) {
    return {
      props: {
        unauthenticated: false,
        form: defaultFields,
      }
    }
  }

  const form: FormWalletIdProps['initialValues'] = {
    ...defaultFields
  }

  const token = $cookie.getToken({ ctx })

  http.setToken(token)

  const resultId = await http.financeWallet.id(Number(ctx.query.id))

  if (resultId.data) {
    form.id = resultId.data.id
    form.description = resultId.data.description
    form.enable = String(resultId.data.enable)
    form.panel = String(resultId.data.panel)
  }

  return {
    props: {
      unauthenticated: [resultId.code].includes(401),
      form
    }
  }
}