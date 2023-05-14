import React, { useRef } from 'react'
import dayjs from 'dayjs'
import { AppButtonGroup, AppButtonIcon, AppTitle } from '@/components/base'
import { ContextSSR } from '@/types/system'
import { $utils } from '@/utils'
import { SystemStore } from '@/store/hook'
import { FinanceItemMethods } from './index.methods'
import { http } from '@/@core/infra/http'
import { Form, FormItemProps } from './components/Form'
import { useTitlePage } from '@/hooks'
import { $memory } from '@/@core/infra/memory'
import { Page } from '@/layouts/LayoutPrivate/components'

const defaultFields: FormItemProps['defaultValues'] = {
  id: null,
  value: '0',
  date: dayjs().format('YYYY-MM-DD'),
  obs: '',
  sort: '0',
  enable: '1',
  originId: '',
  statusId: "2",
  typeId: "2",
  tagIds: [],
  walletId: ''
}

type Props = {
  unauthenticated: boolean
  form: FormItemProps['initialValues']
}
export const FinanceItemPage = (props: Props) => {
  useTitlePage('Finança item')

  const formRef = useRef() as React.MutableRefObject<{
    onClearFields: () => void
    onResetFields: () => void
  }>

  const systemStore = SystemStore()
  const { handleSubmit, handleDelete, confirmDoDelete } = FinanceItemMethods()

  const title = props.form.id ? "Edição" : "Cadastro"

  // const queryData = $utils.parseQueryUrlForm({ id: router.query.id, copy: router.query.copy })

  return (
    <Page>
      <AppTitle
        variant="h5" mb={2}
        contentEnd={
          <AppButtonGroup>
            <AppButtonIcon
              variant="save"
              form="form-itemId"
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
              variant={confirmDoDelete ? "trash" : "remove"}
              onClick={() => handleDelete(Number(props.form.id))}
              disabled={systemStore.state.loading || !props.form.id}
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
        initialValues={props.form}
        defaultValues={defaultFields}
      />
    </Page>
  )
}


export const FinanceItemGetServerSideProps = async (ctx: ContextSSR) => {
  const { isCopy, isEdit, id, isNew } = $utils.parseQueryUrlForm({ id: ctx.query.id, copy: ctx.query.copy })

  if (isNew && !isCopy) {
    return {
      props: {
        unauthenticated: false,
        form: defaultFields
      }
    }
  }

  const form: FormItemProps['initialValues'] = {
    ...defaultFields
  }

  $memory.cookie.setContext(ctx)

  const token = $memory.cookie.get<string>('token')

  http.setToken(token)

  const resultId = await http.financeItem.id(id)

  if (resultId.data) {
    form.id = isEdit ? resultId.data?.id as number : null
    form.value = String(resultId.data?.value)
    form.date = resultId.data?.date as string
    form.obs = resultId.data?.obs
    // form.sort = resultId.data?.sort as number
    form.enable = String(resultId.data?.enable)
    form.originId = String(resultId.data?.origin.id)
    form.statusId = String(resultId.data?.status.id)
    form.typeId = String(resultId.data?.type.id)
    form.walletId = String(resultId.data?.wallet.id)
    form.tagIds = resultId.data.tag_ids.map(el => ({
      id: el.id,
      description: el.description,
      type_id: el.type_id
    }))
  }

  return {
    props: {
      unauthenticated: [resultId.code].includes(401),
      form
    }
  }
}
