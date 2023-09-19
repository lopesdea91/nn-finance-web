import React from 'react'
import { Input, Button } from '@/@core/presentation/shared/ui'
import { useForm, zod, zodResolver, FieldControlled } from '@/@core/framework/plugins/react-hook-form'
import { Alert } from '@/@core/presentation/shared/ui/Alert'
import { useAppStore } from '@/@core/framework/store'
import { observerKey } from '@/@core/domain/observerKey'

interface FormProps {
  handleSubmit: (fields: { email: string, password: string }) => Promise<void>
}
export const Form: React.FC<FormProps> = (p) => {
  const appStore = useAppStore()
  const { handleSubmit, control, errors } = useFields()

  return (
    <form
      className='flex flex-col gap-3 items-start'
      onSubmit={handleSubmit(p.handleSubmit)}
    >
      <FieldControlled
        control={control}
        name="email"
        render={(p) => <Input
          {...p.field}
          disabled={appStore.data.loading}
          label="Email"
          placeholder='Digite seu email'
          error={p.fieldState.error?.message}
          onChange={(e) => p.field.onChange(e.target.value)}
          data-testid="input-email"
        />
        }
      />

      <FieldControlled
        control={control}
        name="password"
        render={(p) => <Input
          {...p.field}
          disabled={appStore.data.loading}
          label="Senha"
          placeholder='Digite seu senha'
          type="password"
          error={p.fieldState.error?.message}
          onChange={(e) => p.field.onChange(e.target.value)}
          data-testid="input-password"
        />
        }
      />

      {!!errors.feedback?.message && (
        <Alert.Root type='warning'>
          <Alert.Text>{errors.feedback?.message}</Alert.Text>
        </Alert.Root>
      )}

      <Button
        size='sm'
        type="submit"
        disabled={appStore.data.loading}
        data-testid="button-submit"
      >Entrar</Button>
    </form>
  )
}

const useFields = () => {
  const formSchema = zod.object({
    email: zod.string().nonempty('Campo obrigatório'),
    password: zod.string().min(6, 'A senha no mínimo deve ter 6 caracteres'),
    feedback: zod.string().optional()
  }).superRefine((val, ctx) => {
    // if () {
    // ctx.addIssue({
    //   path: ['feedback'],
    //   code: zod.ZodIssueCode.custom,
    //   message: "você selecionou tag repetidas",
    // })
    //   return false
    // }

    // ctx.addIssue({
    //   path: ['feedback'],
    //   code: zod.ZodIssueCode.custom,
    //   message: "você selecionou tag repetidas"
    // })
    // return false

    return true
  })

  type FormSchema = zod.infer<typeof formSchema>;

  const defaultValues: FormSchema = {
    email: 'test1@email.com',
    password: '123456'
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
    setError
  } = useForm<FormSchema>({ defaultValues, resolver: zodResolver(formSchema) });

  React.useEffect(() => {
    let observerKeyDown: () => void

    observerKey.subscribe('feedbackForm', (message: string) => {
      setError('feedback', { message })
    }).then(down => observerKeyDown = down)

    return () => {
      observerKeyDown()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    handleSubmit,
    errors,
    control
  }
}

