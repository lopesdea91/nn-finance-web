import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Fields = {
  email: string,
  password: string,
};

export type { Fields, SubmitHandler }

const rule = {
  email: { required: 'Campo obrigatório' },
  password: { required: 'Campo obrigatório' },
}

const validation = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Fields>()

  const [fields, setFields] = useState<Fields>({
    email: 'test1@email.com',
    password: '1234'
  })

  const time = useRef<NodeJS.Timeout>()

  const onChangeField = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(time.current)

    time.current = setTimeout(() => {
      setFields(el => ({
        ...el,
        [name]: value
      }))
    }, 500)
  }

  return {
    fields,
    errors,
    rule,
    onChangeField,
    handleSubmit,
    register,
  }
}

export default validation