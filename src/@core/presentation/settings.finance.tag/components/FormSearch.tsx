import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect } from '@/components/base'
import { $utils } from '@/utils'
import { Enable, FinanceTypeId } from '@/types/enum'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'
import { FinanceStore, SystemStore } from '@/store/hook'

interface Props {
  getItems: () => Promise<void>
  search: FinanceTagFormSearchFields
  onChangeSearch: (value: Partial<FinanceTagFormSearchFields>) => void
  resetSearch: () => void
}

export const FormSearch = (props: Props) => {
  const systemStore = SystemStore()
  const financeStore = FinanceStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.getItems()
  }

  return (
    <AppForm onSubmit={handleSubmit}>
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
            options={financeStore.state.wallet.map($utils.parseItemToOption)}
            disabled={systemStore.state.loading}
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
            options={financeStore.state.type.map($utils.parseItemToOption)}
            disabled={systemStore.state.loading}
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
            disabled={systemStore.state.loading}
            optionEmpty
          />
        </AppColumn>
        <AppColumn xs={12} sm={4} md={3} lg={2}>
          <AppInput
            labelProps={{
              label: 'Pesquisar'
            }}
            inputProps={{
              value: String(props.search._q),
              onChange: (e) => {
                props.onChangeSearch({
                  page: 1,
                  _q: e.target.value,
                })
              },
              disabled: systemStore.state.loading
            }}
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