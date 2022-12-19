import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const formValidate = <Fields>(initialFields: Fields, initialErrors: Object) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm()

  const [fieldsReset, setFieldsResetState] = useState<Fields>(initialFields)
  const [fields, setFieldsState] = useState<Fields>(initialFields)


  const setFields = (newFields: Partial<Fields>) => {
    setFieldsResetState((el) => {
      let old = { ...el } as Record<string, any>

      Object.entries(newFields as Partial<Fields>).forEach(([key, value]: any) => {
        old = {
          ...old,
          [key]: value
        }
      })

      return old as Fields
    })
    setFieldsState((el) => {
      let old = { ...el } as Record<string, any>

      Object.entries(newFields).forEach(([key, value]: any) => {
        old = {
          ...old,
          [key]: value
        }
      })

      return old as Fields
    })
  }

  /** */
  const onChangeField = (newValues: { key: string, value: string }[]) => {
    newValues.forEach(({ key, value }) => {
      // remove error of field
      setError(key, value as any)

      // set value of field
      setFieldsState(el => ({
        ...el,
        [key]: value
      }))
    })
  }
  const onResetFields = () => {
    setFieldsState(fieldsReset)
  }
  const onClearFields = () => {
    setFieldsState(el => {
      let old = { ...el } as Partial<Fields>

      Object.entries(initialFields as Partial<Fields>).forEach(([key, value]) => {
        old = {
          ...old,
          [key]: value
        }
      })

      return old as Fields
    })
    Object.entries(initialErrors as Object).forEach(([key, value]) => {
      setError(key, value as any)
    })
  }

  useEffect(() => {
    onResetFields()
  }, [])

  return {
    fields, setFields,

    register, handleSubmit,

    onChangeField, onResetFields, onClearFields,

    errors,
  }
}