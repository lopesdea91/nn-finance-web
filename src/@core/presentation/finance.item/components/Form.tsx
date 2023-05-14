import { SelectChangeEvent } from "@mui/material"
import { AppColumn, AppColumns, AppForm, AppInput, AppSelect, AppInputDate, AppRadio, AppSwitch } from "@/components/base"
import { $utils } from "@/utils"
import { FinanceStore, SystemStore } from "@/store/hook"
import { forwardRef, useImperativeHandle, useMemo } from "react"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectionTag } from "@/components/SelectionTag"
import { useMediaQuerys } from "@/hooks"

const formSchema = z.object({
  id: z.number().nullable(),
  enable: z.string().nonempty('campo obrigatório'),
  typeId: z.string().nonempty('campo obrigatório'),
  walletId: z.string().nonempty('campo obrigatório'),
  originId: z.string().nonempty('campo obrigatório'),
  statusId: z.string().nonempty('campo obrigatório'),
  value: z.string().nonempty('campo obrigatório'),
  date: z.string().nonempty('campo obrigatório'),
  sort: z.string().nonempty('campo obrigatório'),
  tagIds: z.array(z.object({
    id: z.number(),
    description: z.string(),
    type_id: z.number(),
  }))
    // .nonempty('campo obrigatório')
    .min(1, 'você deve escolher no minímo uma tag'),
  obs: z.string().optional()
})

export type FormDataItemId = z.infer<typeof formSchema>;

export interface FormItemProps {
  onSubmit: (fields: FormDataItemId) => void
  initialValues: FormDataItemId
  defaultValues: FormDataItemId
}
export const Form = forwardRef((props: FormItemProps, ref) => {
  const systemStore = SystemStore()
  const financeStore = FinanceStore()

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm<FormDataItemId>({
    defaultValues: props.initialValues,
    resolver: zodResolver(formSchema),
  });

  useImperativeHandle(ref, () => ({
    onClearFields: () => {
      // setValue('description', props.defaultValues.description)
      // setValue('enable', props.defaultValues.enable)
      // setValue('typeId', props.defaultValues.typeId)
      // setValue('walletId', props.defaultValues.walletId)
    },
    onResetFields: () => {
      // setValue('description', props.initialValues.description)
      // setValue('enable', props.initialValues.enable)
      // setValue('typeId', props.initialValues.typeId)
      // setValue('walletId', props.initialValues.walletId)
    }
  }));

  const typeIdValue = watch('typeId')

  const { minDesktop } = useMediaQuerys()

  const tags = useMemo(() => {
    return financeStore.state.tag
      .filter(el => el.type.id === Number(typeIdValue))
      .map((el) => ({
        id: el.id,
        description: el.description,
        type_id: el.type.id,
      }))
  }, [typeIdValue])

  return (
    <AppForm
      onSubmit={handleSubmit(props.onSubmit)}
      data-testid="form"
      id="form-itemId"
    >
      <AppColumns>
        <AppColumn> {/* Status */}
          <Controller
            control={control}
            name="enable"
            render={(p) => (
              <AppSwitch
                label="Status"
                value={p.field.value === '1'}
                onChange={(e) => p.field.onChange(String(e))}
                labelPlacement="top"
              />
            )}
          />
        </AppColumn>

        <AppColumn> {/* Tipo */}
          <Controller
            control={control}
            name="typeId"
            render={(p) => (
              <AppRadio
                label='Tipo'
                options={financeStore.state.type.map($utils.parseItemToOption)}
                disabled={systemStore.state.loading}
                value={p.field.value}
                onChange={v => p.field.onChange(v)}
              />
            )}
          />
        </AppColumn>
      </AppColumns>

      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2} hidden={!minDesktop}> {/* Carteira */}
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

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/*  Origem */}
          <Controller
            control={control}
            name="originId"
            render={(p) => <AppSelect
              label='Origin'
              options={financeStore.state.origin.map($utils.parseItemToOption)}
              disabled={systemStore.state.loading}
              error={errors.originId?.message}
              {...p.field}
              onChange={(e) => p.field.onChange(String((e as SelectChangeEvent).target.value))}
              optionEmpty
            />}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Situação */}
          <Controller
            control={control}
            name="statusId"
            render={(p) => <AppSelect
              label='Situação'
              options={financeStore.state.status.map($utils.parseItemToOption)}
              disabled={systemStore.state.loading}
              error={errors.statusId?.message}
              {...p.field}
              onChange={(e) => p.field.onChange(String((e as SelectChangeEvent).target.value))}
              optionEmpty
            />}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Valor */}
          <Controller
            control={control}
            name="value"
            render={(p) => (
              <AppInput
                labelProps={{
                  label: "Valor",
                }}
                inputProps={{
                  step: '0.1',
                  error: errors.value?.message,
                  disabled: systemStore.state.loading,
                  ...p.field,
                  onChange: (e) => p.field.onChange(String((e as SelectChangeEvent).target.value))
                }}
              />
            )}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Data */}
          <Controller
            control={control}
            name="date"
            render={(p) => (
              <AppInputDate
                label="Data"
                disabled={systemStore.state.loading}
                value={p.field.value}
                onChange={v => p.field.onChange(v)}
              />

            )}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Ordenação */}
          <Controller
            control={control}
            name="sort"
            render={(p) => (
              <AppInput
                labelProps={{
                  label: "Ordenação",
                }}
                inputProps={{
                  step: '0.1',
                  error: errors.sort?.message,
                  disabled: systemStore.state.loading,
                  ...p.field,
                  onChange: (e) => p.field.onChange(String((e as SelectChangeEvent).target.value))
                }}
              />
            )}
          />
        </AppColumn>
      </AppColumns>

      <AppColumns>
        <AppColumn xs={12} sm={6} lg={8}> {/* Tag */}
          <Controller
            control={control}
            name="tagIds"
            render={(p) => (
              <SelectionTag
                tags={tags}
                error={errors.tagIds?.message}
                disabled={systemStore.state.loading}
                value={p.field.value}
                onChange={(value) => p.field.onChange(value)}
              />
            )}
          />
        </AppColumn>

        <AppColumn xs={12} sm={6} lg={4}> {/* Obs */}
          <Controller
            control={control}
            name="obs"
            render={(p) => (
              <AppInput
                labelProps={{
                  label: "Obs",
                }}
                inputProps={{
                  error: errors.obs?.message,
                  disabled: systemStore.state.loading,
                  ...p.field,
                  onChange: (e) => p.field.onChange(String((e as SelectChangeEvent).target.value))
                }}
                multiline
                rows={4}
              />
            )}
          />
        </AppColumn>
      </AppColumns>
    </AppForm>
  )
})