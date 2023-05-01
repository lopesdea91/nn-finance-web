import { Controller, useForm } from "react-hook-form"
import { forwardRef, useImperativeHandle } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { AppColumn, AppColumns, AppForm, AppInput, AppSelect } from "@/components/base"
import { SystemStore } from "@/store/hook"

const formSchema = z.object({
  id: z.number().nullable(),
  description: z.string().min(5, 'Mínimo 5 caractere(s)').nonempty('campo obrigatório'),
  // json: z.string().optional(),
  enable: z.string().optional(),
  panel: z.string().optional(),
})

export type FormDataWalletId = z.infer<typeof formSchema>;

export interface FormWalletIdProps {
  onSubmit: (fields: FormDataWalletId) => void
  initialValues: FormDataWalletId
  defaultValues: FormDataWalletId
}

export const Form = forwardRef((props: FormWalletIdProps, ref) => {
  const systemStore = SystemStore()

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormDataWalletId>({
    defaultValues: props.initialValues,
    resolver: zodResolver(formSchema),
  });

  useImperativeHandle(ref, () => ({
    onClearFields: () => {
      setValue('description', props.defaultValues.description)
      setValue('enable', props.defaultValues.enable)
      setValue('panel', props.defaultValues.panel)
    },
    onResetFields: () => {
      setValue('description', props.initialValues.description)
      setValue('enable', props.initialValues.enable)
      setValue('panel', props.initialValues.panel)
    }
  }));

  return (
    <AppForm
      onSubmit={handleSubmit(props.onSubmit)}
      data-testid="form"
      id="form-walletId"
    >
      <AppColumns>
        <AppColumn xs={12} sm={4} md={3} lg={2}>
          <Controller
            control={control}
            name="description"
            render={(p) => (
              <AppInput
                labelProps={{
                  label: "Descrição",
                }}
                inputProps={{
                  error: errors.description?.message,
                  disabled: systemStore.state.loading,
                  ...p.field,
                }}
              />
            )}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <Controller
            control={control}
            name="enable"
            render={(p) => (
              <AppSelect
                label='Status'
                options={[
                  { id: '1', description: 'Ativo' },
                  { id: '0', description: 'Inativo' },
                ]}
                disabled={systemStore.state.loading}
                {...p.field}
              />
            )}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <Controller
            control={control}
            name="panel"
            render={(p) => (
              <AppSelect
                label='Painel'
                options={[
                  { id: '1', description: 'Ativo' },
                  { id: '0', description: 'Inativo' },
                ]}
                disabled={systemStore.state.loading}
                {...p.field}
              />
            )}
          />
        </AppColumn>
      </AppColumns>
    </AppForm>
  )
})