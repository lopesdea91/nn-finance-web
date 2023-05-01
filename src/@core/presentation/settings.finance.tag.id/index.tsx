import React, { useRef } from 'react'
import { AppButtonGroup, AppButtonIcon, AppTitle } from '@/components/base'
import { ContextSSR } from '@/types/system'
import { SystemStore } from '@/store/hook'
import { Form, FormTagIdProps } from './components/Form'
import { SettingsFinanceTagIdMethods } from './index.methods'
import { $cookie } from '@/utils'
import { http } from '@/@core/infra/http'
import { useTitlePage } from '@/hooks'

const defaultFields: FormTagIdProps['defaultValues'] = {
  id: null,
  description: '',
  enable: '1',
  typeId: '',
  walletId: '',
}

type PageProps = {
  unauthenticated: boolean
  form: FormTagIdProps['initialValues']
}
export const SettingsFinanceTagIdPage = (props: PageProps) => {
  const formRef = useRef() as React.MutableRefObject<{
    onClearFields: () => void
    onResetFields: () => void
  }>
  const systemStore = SystemStore()
  const { handleSubmit } = SettingsFinanceTagIdMethods()

  const title = props.form.id ? "Edição" : "Cadastro"

  useTitlePage(`${title} de tag`)

  return (
    <>
      <AppTitle
        variant="h5" mb={2}
        contentEnd={
          <AppButtonGroup>
            <AppButtonIcon
              variant="save"
              form="form-tagId"
              type="submit"
              disabled={systemStore.state.loading}
              title={props.form.id ? "Atualizar" : "Salvar"}
            />
            <AppButtonIcon
              variant="clean"
              onClick={() => formRef.current?.onClearFields()}
              disabled={systemStore.state.loading}
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
              disabled={systemStore.state.loading}
            />
          </AppButtonGroup>
        }
      >
        {title}
      </AppTitle>

      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialValues={{
          ...props.form,
          walletId: props.form.walletId || String(systemStore.state.walletPanelId),
        }}
        defaultValues={defaultFields}
      />
    </>
  )
}

export const SettingsFinanceTagIdServerSideProps = async (ctx: ContextSSR) => {
  const isNew = ctx.query.id === 'new'

  if (isNew) {
    return {
      props: {
        unauthenticated: false,
        form: defaultFields
      }
    }
  }

  const form: FormTagIdProps['initialValues'] = {
    ...defaultFields
  }

  const token = $cookie.getToken({ ctx })

  http.setToken(token)

  const resultId = await http.financeTag.id(Number(ctx.query.id))

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
