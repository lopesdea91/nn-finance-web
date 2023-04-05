import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect } from '../../../components/base'
import { $utils } from '@/utils'
import { Enable, FinanceTypeId } from '@/types/enum'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'
import { useAppSelector } from '@/store/hook'

interface Props {
  loading: boolean
  getItems: () => Promise<void>
  search: FinanceTagFormSearchFields
  onChangeSearch: (value: Partial<FinanceTagFormSearchFields>) => void
  resetSearch: () => void
}

export const FormSearch = (props: Props) => {
  const { financeState } = useAppSelector(e => ({
    financeState: e.finance
  }))

  return (
    <AppForm onSubmit={() => props.getItems()}>
      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Carteira'
            value={props.search.wallet_id ? String(props.search.wallet_id) : ''}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                wallet_id: Number(e.target.value)
              })
            }}
            options={financeState.wallet.map($utils.parseItemToOption)}
            disabled={props.loading}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Tipo'
            value={props.search.type_id ? String(props.search.type_id) : ''}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                type_id: e.target.value as FinanceTypeId
              })
            }}
            options={financeState.type.map($utils.parseItemToOption)}
            disabled={props.loading}
            optionEmpty
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Status'
            value={String(props.search.enable)}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                enable: e.target.value as Enable
              })
            }}
            options={[
              { id: '1', description: 'Ativo' },
              { id: '0', description: 'Inativo' },
            ]}
            disabled={props.loading}
            optionEmpty
          />
        </AppColumn>
        <AppColumn xs={12} sm={4} md={3} lg={2}>
          <AppInput
            label='Pesquisar'
            value={String(props.search._q)}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                _q: e.target.value,
              })
            }}
            disabled={props.loading}
          />
        </AppColumn>
      </AppColumns>

      <AppButtonGroup>
        <AppButton type="submit" >
          <AppIcon variant='search' />
        </AppButton>

        <AppButton type="button" onClick={() => props.resetSearch()}>
          <AppIcon variant='reset' />
        </AppButton>
      </AppButtonGroup>
    </AppForm>
  )
}