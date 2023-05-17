import { SelectChangeEvent } from "@mui/material"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { AppColumn, AppColumns, AppForm, AppInput, AppSelect } from "@/@core/presentation/shared"
import { FinanceStore, SystemStore } from "@/store/hook"
import { $utils } from "@/utils"

const formSchema = z.object({
  id: z.number().nullable(),
  description: z.string().min(5, 'Mínimo 5 caractere(s)').nonempty('campo obrigatório'),
  // json: z.string().optional(),
  enable: z.string().nonempty('campo obrigatório'),
  typeId: z.string().nonempty('campo obrigatório'),
  walletId: z.string().nonempty('campo obrigatório'),
  parentId: z.string(),
})

export type FormDataOriginId = z.infer<typeof formSchema>;

export interface FormOriginIdProps {
  onSubmit: (fields: FormDataOriginId) => void
  initialValues: FormDataOriginId
  defaultValues: FormDataOriginId
}
export const Form = forwardRef((props: FormOriginIdProps, ref) => {
  const systemStore = SystemStore()
  const financeStore = FinanceStore()

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormDataOriginId>({
    defaultValues: props.initialValues,
    resolver: zodResolver(formSchema),
  });

  useImperativeHandle(ref, () => ({
    onClearFields: () => {
      setValue('description', props.defaultValues.description)
      setValue('enable', props.defaultValues.enable)
      setValue('typeId', props.defaultValues.typeId)
      setValue('walletId', props.defaultValues.walletId)
      setValue('parentId', props.defaultValues.parentId)
    },
    onResetFields: () => {
      setValue('description', props.initialValues.description)
      setValue('enable', props.initialValues.enable)
      setValue('typeId', props.initialValues.typeId)
      setValue('walletId', props.initialValues.walletId)
      setValue('parentId', props.initialValues.parentId)
    }
  }));

  return (
    <AppForm
      onSubmit={handleSubmit(props.onSubmit)}
      data-testid="form"
      id="form-originId"
    >
      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <Controller
            control={control}
            name="walletId"
            render={(p) => <AppSelect
              label='Carteira'
              options={financeStore.state.wallet.map($utils.parseItemToOption)}
              disabled={systemStore.state.loading}
              error={errors.walletId?.message}
              {...p.field}
              onChange={(e) => p.field.onChange(String((e as SelectChangeEvent).target.value))}
              optionEmpty
            />}
          />
        </AppColumn>
      </AppColumns>

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
                  onChange: (e) => p.field.onChange(String((e as SelectChangeEvent).target.value))
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
                error={errors.enable?.message}
                {...p.field}
                onChange={(e) => p.field.onChange(String((e as SelectChangeEvent).target.value))}
                optionEmpty
              />
            )}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <Controller
            control={control}
            name="typeId"
            render={(p) => (
              <AppSelect
                label='Tipo'
                options={financeStore.state.originType.map($utils.parseItemToOption)}
                disabled={systemStore.state.loading}
                error={errors.typeId?.message}
                {...p.field}
                onChange={(e) => p.field.onChange(String((e as SelectChangeEvent).target.value))}
                optionEmpty
              />
            )}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <Controller
            control={control}
            name="parentId"
            render={(p) => (
              <AppSelect
                label='Parent'
                options={financeStore.state.origin.map($utils.parseItemToOption)}
                disabled={systemStore.state.loading}
                error={errors.parentId?.message}
                {...p.field}
                onChange={(e) => p.field.onChange(String((e as SelectChangeEvent).target.value))}
                optionEmpty
              />
            )}
          />
        </AppColumn>

      </AppColumns>
    </AppForm>
  )
})