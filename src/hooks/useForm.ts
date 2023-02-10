'use client'

import { FormEvent, useState } from "react";
import { SignInFieldsForm } from '@/types/form/signIn'

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

  return {
    fields, setFields,
    onChangeField, onResetFields, onClearFields,
    onSubmitForm,
    errors,
  }
}

export const useSignInForm = () => {
  return useForm<SignInFieldsForm>({
    email: 'test1@email.com',
    password: '1234'
  }, {})
}