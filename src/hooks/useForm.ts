import { FormEvent, useState } from "react";
import { SignInFieldsForm } from '@/types/form/signIn'
import { FinanceOriginFormFields } from "@/types/form/settingsFinanceOrigin";
import { FinanceWalletFormFields } from "@/types/form/settingsFinanceWallet";
import { FinanceTagFormFields } from "@/types/form/settingsFinanceTag";
import { FinanceItemFormFields } from "@/types/form/financeItem";
import { useStoreSystem } from "./useStoreSystem";
import dayjs from "dayjs";

export type FieldError = {
  required: boolean
}
type Errors<F> = Partial<Record<keyof F, FieldError>>

export const useForm = <Fields>(initialFields: Fields, initialErrors: Object) => {
  const [fieldsReset, setFieldsResetState] = useState<Fields>(() => {
    return initialFields
  })
  const [fields, setFieldsState] = useState<Fields>(() => {
    return initialFields
  })
  const [errors, setErrorsState] = useState<Errors<Fields>>(() => {
    const obj = initialFields as Record<string, any>

    return Object.keys(obj)
      .reduce((acc: Record<string, any>, key: string) => {
        acc[key] = false
        return acc
      }, {}) as Errors<Fields>
  })
  const [confirmDoDelete, setConfirmDoDelete] = useState<boolean>(false)

  const setFields = (partialFields: Partial<Fields>) => {
    let oldFields = JSON.parse(JSON.stringify(fields)) as Record<string, any>
    let oldErrors = JSON.parse(JSON.stringify(errors)) as Record<string, any>

    Object.entries(partialFields).forEach(([key, value]) => {
      oldFields[key] = value
      oldErrors[key] = false
    })

    setFieldsResetState(oldFields as Fields)
    setFieldsState(oldFields as Fields)
    setErrorsState(oldErrors as Errors<Fields>)
  }
  const onChangeField = (partialFields: Partial<Fields>) => {
    let oldFields = JSON.parse(JSON.stringify(fields)) as Record<string, any>
    let oldErrors = JSON.parse(JSON.stringify(errors)) as Record<string, any>

    Object.entries(partialFields).forEach(([key, value]) => {
      oldErrors[key] = false
      oldFields[key] = value
    })
    setFieldsState(oldFields as Fields)
    setErrorsState(oldErrors as Errors<Fields>)
  }
  const onResetFields = () => {
    setFieldsState(fieldsReset)
  }
  const onClearFields = () => {
    let initialKeyValue = JSON.parse(JSON.stringify(initialFields)) as Record<string, any>
    let oldFields = JSON.parse(JSON.stringify(fields)) as Record<string, any>
    let oldErrors = JSON.parse(JSON.stringify(errors)) as Record<string, any>

    Object.entries(initialKeyValue).forEach(([key, value]) => {
      oldFields[key] = value
      oldErrors[key] = false
    })

    setFieldsState(oldFields as Fields)
    setErrorsState(oldErrors as Errors<Fields>)
  }
  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault()
  }
  const toggleConfirmDoDelete = () => {
    setConfirmDoDelete(!confirmDoDelete)
  }

  return {
    fields, setFields,
    onChangeField, onResetFields, onClearFields,
    onSubmitForm,
    errors,
    confirmDoDelete, toggleConfirmDoDelete
  }
}

export const useSignInForm = () => {
  return useForm<SignInFieldsForm>({
    email: 'test1@email.com',
    password: '1234'
  }, {})
}

export const useSettingsFinanceOriginForm = ({ initialFields }: { initialFields?: Partial<FinanceOriginFormFields> } = {}) => {
  const { systemState } = useStoreSystem()

  return useForm<FinanceOriginFormFields>({
    id: null,
    description: '',
    enable: 1,
    typeId: null,
    // type: null,
    walletId: systemState.walletPanelId,
    // wallet?: null,
    parentId: null,
    // parent: null,
    ...initialFields
  }, {})
}

export const useSettingsFinanceTagForm = ({ initialFields }: { initialFields?: Partial<FinanceTagFormFields> } = {}) => {
  const { systemState } = useStoreSystem()

  return useForm<FinanceTagFormFields>({
    id: null,
    description: '',
    enable: 1,
    typeId: null,
    walletId: systemState.walletPanelId,
    ...initialFields
  }, {})
}

export const useFinanceItemForm = () => {
  const { systemState } = useStoreSystem()

  return useForm<FinanceItemFormFields>({
    id: null,
    value: 0,
    date: dayjs().format('YYYY-MM-DD'),
    obs: '',
    sort: 0,
    enable: 1,
    origin_id: null,
    status_id: 2,
    type_id: 2,
    tag_ids: [],
    wallet_id: systemState.walletPanelId,
  }, {})
}