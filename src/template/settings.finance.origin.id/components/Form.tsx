import { AppColumn, AppColumns, AppForm, AppInput, AppSelect } from "../../../components/base"
import { FieldError } from "@/hooks/useForm"
import { Enable } from "@/types/enum"
import { FinanceOriginFormFields } from "@/types/form"
import { $utils } from "@/utils"
import { useAppSelector } from "@/store/hook"

interface Props {
  fields: FinanceOriginFormFields
  errors: Partial<Record<keyof FinanceOriginFormFields, FieldError>>
  onSubmit: () => void
  onChangeField: (partialFields: Partial<FinanceOriginFormFields>) => void
}

export const Form = (props: Props) => {
  const { financeState, systemState } = useAppSelector(e => ({
    financeState: e.finance,
    systemState: e.system
  }))

  return (
    <AppForm onSubmit={props.onSubmit}>
      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Carteira'
            value={props.fields.walletId || ''}
            onChange={(e) => {
              props.onChangeField({
                walletId: Number(e.target.value)
              })
            }}
            options={financeState.wallet.map($utils.parseItemToOption)}
            disabled={systemState.loading}
          />
        </AppColumn>
      </AppColumns>

      <AppColumns>
        <AppColumn xs={12} sm={4} md={3} lg={2}>
          <AppInput
            label='Descrição'
            value={props.fields.description}
            onChange={(e) => {
              props.onChangeField({
                description: e.target.value,
              })
            }}
            disabled={systemState.loading}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Status'
            value={String(props.fields.enable)}
            onChange={(e) => {
              props.onChangeField({
                enable: e.target.value as Enable
              })
            }}
            options={[
              { id: '1', description: 'Ativo' },
              { id: '0', description: 'Inativo' },
            ]}
            disabled={systemState.loading}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Tipo'
            value={props.fields.typeId || ''}
            onChange={(e) => {
              props.onChangeField({
                typeId: Number(e.target.value)
              })
            }}
            options={financeState.originType.map($utils.parseItemToOption)}
            disabled={systemState.loading}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Parent'
            value={props.fields.parentId || ''}
            onChange={(e) => {
              props.onChangeField({
                parentId: Number(e.target.value)
              })
            }}
            options={financeState.origin.map($utils.parseItemToOption)}
            disabled={systemState.loading}
            optionEmpty
          />
        </AppColumn>

      </AppColumns>
    </AppForm>
  )
}