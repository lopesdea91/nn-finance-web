import React, { useRef } from 'react'
import { AppButtonGroup, AppButtonIcon, AppTitle, Page, Section } from '@/@core/presentation/shared'
import { ContextSSR } from '@/types/system'
import { SystemStore } from '@/store/hook'
import { http } from '@/@core/infra/http'
import { Form, FormOriginIdProps } from './components'
import { SettingsFinanceOriginIdMethods } from './index.methods'
import { useTitlePage } from '@/hooks'
import { $memory } from '@/@core/infra/memory'

const defaultFields: FormOriginIdProps['defaultValues'] = {
  id: null,
  description: '',
  enable: '1',
  typeId: '',
  walletId: '',
  parentId: '',
}

type PageProps = {
  unauthenticated: boolean
  form: FormOriginIdProps['initialValues']
}
export const SettingsFinanceOriginIdPage = (props: PageProps) => {
  const formRef = useRef() as React.MutableRefObject<{
    onClearFields: () => void
    onResetFields: () => void
  }>
  const systemStore = SystemStore()
  const { handleSubmit } = SettingsFinanceOriginIdMethods()

  const title = props.form.id ? "Edição" : "Cadastro"

  useTitlePage(`${title} de origem`)

  return (
    <Page>
      <AppTitle
        variant="h5" mb={2}
        contentEnd={
          <AppButtonGroup>
            <AppButtonIcon
              variant="save"
              form="form-originId"
              type="submit"
              disabled={systemStore.state.loading}
              title={props.form.id ? "Atualizar" : "Salvar"}
            />
            <AppButtonIcon
              variant="clean"
              onClick={() => formRef.current?.onClearFields()}
              disabled={systemStore.state.loading}
              title="Definir fomulário padrão"
            />
            <AppButtonIcon
              color="error"
              variant="remove"
              onClick={() => console.log(`handleDelete()`)}
              disabled
            />
            <AppButtonIcon
              variant="reset"
              onClick={() => formRef.current?.onResetFields()}
              disabled={systemStore.state.loading || !props.form.id}
              title="Definir fomulário do início"
            />
          </AppButtonGroup>
        }
      >
        {title}
      </AppTitle>

      <Section>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialValues={{
            ...props.form,
            walletId: props.form.walletId || String(systemStore.state.walletPanelId),
          }}
          defaultValues={defaultFields}
        />
      </Section>
    </Page>
  )
}

export const SettingsFinanceOriginIdServerSideProps = async (ctx: ContextSSR) => {
  const isNew = ctx.query.id === 'new'

  if (isNew) {
    return {
      props: {
        unauthenticated: false,
        form: defaultFields
      }
    }
  }

  const form: FormOriginIdProps['initialValues'] = {
    ...defaultFields
  }

  $memory.cookie.setContext(ctx)

  const token = $memory.cookie.get<string>('token')

  http.setToken(token)

  const resultId = await http.financeOrigin.id(Number(ctx.query.id))

  if (resultId.data) {
    form.id = resultId.data.id
    form.description = resultId.data.description
    form.enable = String(resultId.data.enable)
    form.typeId = String(resultId.data.typeId)
    form.walletId = String(resultId.data.walletId)
  }

  return {
    props: {
      unauthenticated: [resultId.code].includes(401),
      form
    }
  }
}
