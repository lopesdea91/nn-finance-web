import React, { useMemo } from 'react'
import { AppAlert, AppButtonGroup, AppButtonIcon, AppColumn, AppColumns, AppForm, AppInput, AppSelect, AppTitle, Table2 } from '@/components'
import { FinanceStore, SystemStore } from '@/store/hook'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { $utils } from '@/utils'
import { SelectChangeEvent } from '@mui/material'
import { Box } from '@mui/system'
import { http } from '@/@core/infra/http'

const itemSchema = z.object({
  id: z.number(),
  tag: z.object({
    id: z.string().nonempty('Seleciona uma tag'),
    description: z.string()
  }),
  percentage: z.string().nonempty('Adicione um valor percentual para a tag'),
})
export type ItemComposition = z.infer<typeof itemSchema>;

const formSchema = z.object({
  items: z.array(itemSchema),
  msg: z.string().optional(),
}).superRefine((val, ctx) => {
  const total = val.items.reduce((acc, el) => acc + (+el.percentage), 0)

  if (total >= 100) {
    ctx.addIssue({
      path: ['msg'],
      code: z.ZodIssueCode.custom,
      message: "A composição não pode ser maior que 100% no total",
    })
  }
  return true
})

export type FormDataComposition = z.infer<typeof formSchema>;
export interface TabCompositionProps {
  form: {
    initialValues: FormDataComposition['items']
    defaultValues: FormDataComposition['items']
  }
}

export const TabComposition = (props: TabCompositionProps) => {
  const systemStore = SystemStore()
  const financeStore = FinanceStore()

  const options = financeStore.state.tag.filter(el => el.type.id === 2)

  const defaultValuesWithDescriptions = useMemo(() => {
    function applyDescription(el: ItemComposition) {
      const find = financeStore.state.tag.find(e => e.id === Number(el.tag.id))
      el.tag.description = find?.description as string
      return el
    }

    return {
      items: props.form.initialValues.map(el => applyDescription(el))
    }
  }, [])

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<FormDataComposition>({
    defaultValues: defaultValuesWithDescriptions,
    resolver: zodResolver(formSchema),
  });

  const items = useWatch({ control, name: "items" });
  const itemsWithValues = items.filter(el => (!!el.tag.id && !!el.percentage))
  const total = itemsWithValues.reduce((acc, el) => acc + (+el.percentage), 0)

  const { fields, append, remove, } = useFieldArray({ control, name: 'items' })

  function addItem() {
    append({
      id: (new Date).getTime(),
      tag: {
        id: '',
        description: ''
      },
      percentage: '',
    })
  }
  function removeItem(id: number) {
    remove(id)
  }
  function handleSelectTag(index: number, id: number) {
    const find = financeStore.state.tag.find(tag => tag.id === id)

    if (!find) {
      setValue(`items.${index}.tag.description`, '')
      return
    }
    setValue(`items.${index}.tag.description`, find.description)
  }
  function onSubmit(fields: FormDataComposition) {
    systemStore.loadingStart()

    const id = 1

    const composition = JSON.stringify(fields.items.map(el => ({
      tag_id: el.tag.id,
      percentage: el.percentage
    })))

    http.financeWallet.composition(id, composition)

    systemStore.loadingEnd()
  }

  const hasValeus: boolean = !(items.length || false)
  const hasItemsWithValues: boolean = !!itemsWithValues.length
  const maxValue = (!!errors?.msg?.message || total > 100) ? "A composição não pode ser maior que 100% no total" : ""

  return (
    <div>
      <AppTitle
        variant="h5"
        sx={{ mb: 1 }}
        contentEnd={
          <AppButtonGroup>
            <AppButtonIcon variant="new"
              onClick={() => addItem()}
              disabled={systemStore.state.loading}
            />
            <AppButtonIcon
              variant="save"
              form="form-composition"
              type="submit"
              disabled={hasValeus || systemStore.state.loading}
            // title={props.form.defaultValues.id ? "Atualizar" : "Salvar"}
            />
          </AppButtonGroup>
        }
      >
        Composição
      </AppTitle>

      <AppColumns>
        <AppColumn xs={12} md={6} lg={6}>
          {maxValue && (
            <AppAlert color="warning" variant="standard" severity="info" sx={{ mb: 2 }}>
              {maxValue}
            </AppAlert>
          )}

          <AppForm
            onSubmit={handleSubmit(onSubmit)}
            id="form-composition"
          >
            {fields.map((el, index) => (
              <Box key={el.id} sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                mb: 1
              }}>
                <Controller
                  control={control}
                  name={`items.${index}.tag.id`}
                  render={(p) => <AppSelect
                    label='Tag'
                    options={options.map($utils.parseItemToOption)}
                    disabled={systemStore.state.loading}
                    error={errors?.items?.[index]?.tag?.id?.message}
                    value={p.field.value}
                    onChange={(e) => {
                      p.field.onChange(String((e as SelectChangeEvent).target.value))
                      handleSelectTag(index, Number((e as SelectChangeEvent).target.value))
                    }}
                    optionEmpty
                  />}
                />

                <Controller
                  control={control}
                  name={`items.${index}.percentage`}
                  render={(p) => (
                    <AppInput
                      labelProps={{
                        label: "Valor",
                      }}
                      inputProps={{
                        type: 'number',
                        step: '0.1',
                        error: errors?.items?.[index]?.percentage?.message,
                        disabled: systemStore.state.loading,
                        ...p.field,
                        onChange: (e) => p.field.onChange(String((e as SelectChangeEvent).target.value))
                      }}
                    />
                  )}
                />

                <AppButtonIcon
                  variant='remove'
                  onClick={() => removeItem(index)}
                />
              </Box>
            ))}
          </AppForm>
        </AppColumn>

        {hasItemsWithValues &&
          <AppColumn xs={12} md={6} lg={6}>
            <Table2.Container
              contentHeader={(
                <>
                  <Table2.Cell>Tag</Table2.Cell>
                  <Table2.Cell>Valor</Table2.Cell>
                </>
              )}
              contentBody={
                <>
                  {itemsWithValues.map((el, index) => (
                    <Table2.Row key={`${el.id}-123-${index}`}>
                      <Table2.Cell>{el.tag.description}</Table2.Cell>
                      <Table2.Cell>{el.percentage ? `${el.percentage}%` : ''}</Table2.Cell>
                    </Table2.Row>
                  ))}
                  <Table2.Row>
                    <Table2.Cell>Total</Table2.Cell>
                    <Table2.Cell>{total}%</Table2.Cell>
                  </Table2.Row>
                </>
              }
            />
          </AppColumn>
        }
      </AppColumns>
    </div>
  )
}
