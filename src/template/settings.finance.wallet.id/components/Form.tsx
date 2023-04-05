import { AppColumn, AppColumns, AppForm, AppInput, AppSelect } from "../../../components/base"
import { FieldError } from "@/hooks/useForm"
import { Enable } from "@/types/enum"
import { FinanceWalletFormFields } from "@/types/form/settingsFinanceWallet"
import { useAppSelector } from "@/store/hook"

interface Props {
  fields: FinanceWalletFormFields
  errors: Partial<Record<keyof FinanceWalletFormFields, FieldError>>
  onSubmit: () => void
  onChangeField: (partialFields: Partial<FinanceWalletFormFields>) => void
}

export const Form = (props: Props) => {
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))

  return (
    <AppForm onSubmit={props.onSubmit}>
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
            label='Painel'
            value={String(props.fields.panel)}
            onChange={(e) => {
              props.onChangeField({
                panel: e.target.value as Enable
              })
            }}
            options={[
              { id: '1', description: 'Ativo' },
              { id: '0', description: 'Inativo' },
            ]}
            disabled={systemState.loading}
          />
        </AppColumn>
      </AppColumns>
    </AppForm>
  )
}