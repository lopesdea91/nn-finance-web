import React, { useState } from 'react'
import { AppDivider, AppTab, AppTabPanel, AppTabs, AppTitle, Page, Section } from '@/@core/presentation/shared'
import { ContextSSR } from '@/types/system'
import { SystemStore } from '@/store/hook'
import { http } from '@/@core/infra/http'
import { useTitlePage } from '@/hooks'
import { SettingsFinanceWalletIdMethods } from './index.methods'
import { TabConsolidate, TabComposition, TabData, FormDataComposition } from './components'
import { FormWalletIdProps } from './components/Form'
import { $memory } from '@/@core/infra/memory'
import { useRouter } from 'next/router'

const defaultFields: FormWalletIdProps['defaultValues'] = {
  id: null,
  description: '',
  enable: '1',
  panel: '0',
  // json: {},
}

type Props = {
  unauthenticated: boolean
  tadData: FormWalletIdProps['initialValues']
  tabComposition: FormDataComposition['items']
}
export const SettingsFinanceWalletIdPage = (props: Props) => {
  const router = useRouter()

  const [tabActive, setTab] = useState<number>(() => {
    const urlTabActive = router.query?.tab

    return urlTabActive ? Number(urlTabActive) : 0
  })

  const systemStore = SystemStore()
  const { handleSubmit } = SettingsFinanceWalletIdMethods()

  const title = props.tadData.id ? "Edição" : "Cadastro"

  useTitlePage(`${title} de carteira`)

  return (
    <Page>
      <AppTitle variant="h5">{title} {tabActive}</AppTitle>

      <Section>
        <AppTabs value={tabActive} handleChangeTabs={n => setTab(n)} >
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

        <AppTabPanel index={tabActive} value={0} keepAlive>
          <TabData
            form={{
              onSubmit: handleSubmit,
              initialValues: props.tadData,
              defaultValues: defaultFields
            }}
          />
        </AppTabPanel>

        <AppTabPanel index={tabActive} value={1} keepAlive>
          <TabConsolidate />
        </AppTabPanel>

        <AppTabPanel index={tabActive} value={2} keepAlive>
          <TabComposition
            form={{
              initialValues: props.tabComposition,
              defaultValues: [],
            }}
          />
        </AppTabPanel>
      </Section>
    </Page>
  )
}

export const SettingsFinanceWalletIdServerSideProps = async (ctx: ContextSSR) => {
  const isNew = ctx.query.id === 'new'

  if (isNew) {
    return {
      props: {
        unauthenticated: false,
        tadData: defaultFields,
      }
    }
  }

  const tadData: FormWalletIdProps['initialValues'] = {
    ...defaultFields
  }
  const tabComposition: FormDataComposition['items'] = []

  $memory.cookie.setContext(ctx)

  const token = $memory.cookie.get<string>('token')

  http.setToken(token)

  const resultId = await http.financeWallet.id(Number(ctx.query.id))

  if (resultId.data) {
    tadData.id = resultId.data.id
    tadData.description = resultId.data.description
    tadData.enable = String(resultId.data.enable)
    tadData.panel = String(resultId.data.panel)

    resultId.data.composition.map((el, i) => tabComposition.push({
      id: i,
      tag: {
        id: el.tag_id,
        description: '',
      },
      percentage: el.percentage
    }))
  }

  return {
    props: {
      unauthenticated: [resultId.code].includes(401),
      tadData,
      tabComposition
    }
  }
}