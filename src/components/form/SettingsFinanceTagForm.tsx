import { AppColumn, AppColumns, AppForm, AppInput, AppSelect } from "../base"
import { FieldError } from "@/hooks/useForm"
import { useStoreFinance } from "@/hooks/useStoreFinance"
import { Enable, FinanceTypeId } from "@/types/enum"
import { FinanceTagFormFields } from "@/types/form/settingsFinanceTag"
import { $ } from "@/utils"

interface Props {
  isLoading: boolean
  fields: FinanceTagFormFields
  errors: Partial<Record<keyof FinanceTagFormFields, FieldError>>
  onSubmit: () => void
  onChangeField: (partialFields: Partial<FinanceTagFormFields>) => void
}

export const SettingsFinanceTagForm = (props: Props) => {
  const { financeState } = useStoreFinance()

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
            options={financeState.wallet.map($.parseItemToOption)}
            disabled={props.isLoading}
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
            disabled={props.isLoading}
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
            disabled={props.isLoading}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Tipo'
            value={props.fields.typeId || ''}
            onChange={(e) => {
              props.onChangeField({
                typeId: Number(e.target.value) as FinanceTypeId
              })
            }}
            options={financeState.type.map($.parseItemToOption)}
            disabled={props.isLoading}
          />
        </AppColumn>

      </AppColumns>

    </AppForm>
  )
}