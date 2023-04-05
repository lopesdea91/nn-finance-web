import { AppColumn, AppColumns, AppForm, AppInput, AppSelect } from "../../../components/base"
import { FieldError } from "@/hooks/useForm"
import { Enable, FinanceTypeId } from "@/types/enum"
import { FinanceTagFormFields } from "@/types/form/settingsFinanceTag"
import { $utils } from "@/utils"
import { useAppSelector } from "@/store/hook"

interface Props {
  isLoading: boolean
  fields: FinanceTagFormFields
  errors: Partial<Record<keyof FinanceTagFormFields, FieldError>>
  onSubmit: () => void
  onChangeField: (partialFields: Partial<FinanceTagFormFields>) => void
}

export const Form = (props: Props) => {
  const { financeState } = useAppSelector(e => ({
    financeState: e.finance
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
            options={financeState.type.map($utils.parseItemToOption)}
            disabled={props.isLoading}
          />
        </AppColumn>

      </AppColumns>

    </AppForm>
  )
}