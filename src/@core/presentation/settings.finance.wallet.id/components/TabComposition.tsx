import React from 'react'
import { AppButtonGroup, AppButtonIcon, AppColumn, AppColumns, AppForm, AppInput, AppSelect, AppTitle, Table2 } from '@/components'
import { FinanceStore, SystemStore } from '@/store/hook'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { $utils } from '@/utils'
import { SelectChangeEvent } from '@mui/material'
import { Box } from '@mui/system'

const formSchema = z.object({
  objectives: z.array(z.object({
    id: z.number(),
    tag: z.object({
      id: z.string(),
      description: z.string()
    }), //.nonempty('Seleciona uma tag'),
    value: z.string().nonempty('Adicione um valor percentual para a tag'),
  })).min(1, 'Adicione uma tag para criar a composição')
})

export type FormData = z.infer<typeof formSchema>;

export const TabComposition = () => {
  const systemStore = SystemStore()
  const financeStore = FinanceStore()

  const options = financeStore.state.tag.filter(el => el.type.id === 2)

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      objectives: []
    },
    resolver: zodResolver(formSchema),
  });

  const items = useWatch({
    control,
    name: "objectives",
  });
  const itemsWithValues = items.filter(el => {
    return !!el.tag.id && !!el.value
  })
  const total = itemsWithValues.reduce((acc, el) => acc + (+el.value), 0)

  const { fields, append, remove, } = useFieldArray({
    control,
    name: 'objectives'
  })

  function addItem() {
    append({
      id: (new Date).getTime(),
      tag: {
        id: '',
        description: ''
      },
      value: '',
    })
  }
  function removeItem(id: number) {
    remove(id)
  }
  function handleSelectTag(index: number, id: number) {
    const find = financeStore.state.tag.find(tag => tag.id === id)
    if (!find) {
      setValue(`objectives.${index}.tag.id`, '')
      setValue(`objectives.${index}.tag.description`, '')
      return
    }

    setValue(`objectives.${index}.tag.id`, String(find.id))
    setValue(`objectives.${index}.tag.description`, find.description)
  }
  function onSubmit(fields: FormData) {
    console.log('... onSubmit')
  }

  const hasValeus: boolean = !(items.length || false)
  const hasItemsWithValues: boolean = !!itemsWithValues.length

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
                  name={`objectives.${index}.tag.id`}
                  render={(p) => <AppSelect
                    label='Tag'
                    options={options.map($utils.parseItemToOption)}
                    disabled={systemStore.state.loading}
                    error={errors?.objectives?.[index]?.tag?.id?.message}
                    value={p.field.value}
                    onChange={(e) => handleSelectTag(index, Number((e as SelectChangeEvent).target.value))}
                    optionEmpty
                  />}
                />

                <Controller
                  control={control}
                  name={`objectives.${index}.value`}
                  render={(p) => (
                    <AppInput
                      labelProps={{
                        label: "Valor",
                      }}
                      inputProps={{
                        type: 'number',
                        step: '0.1',
                        error: errors?.objectives?.[index]?.value?.message,
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
                      <Table2.Cell>{el.value ? `${el.value}%` : ''}</Table2.Cell>
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
