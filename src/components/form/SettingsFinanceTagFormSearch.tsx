import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect } from '../base'
import { useStoreFinanceTagSearch } from '@/hooks/useStoreFinance'
import { useStoreFinance } from '@/hooks/useStoreFinance'
import { $ } from '@/utils'
import { Enable, FinanceTypeId } from '@/types/enum'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'

interface Props {
  loading: boolean
  getItems: (s: Partial<FinanceTagFormSearchFields>) => Promise<void>
}

export const SettingsFinanceTagFormSearch = (props: Props) => {
  const { financeState } = useStoreFinance()
  const { tagSearch, onChangeSearch, resetTagSearch } = useStoreFinanceTagSearch()

  function onSubmit() {
    props.getItems(tagSearch)
  }

  return (
    <AppForm onSubmit={onSubmit}>
      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Carteira'
            value={tagSearch.wallet_id || ''}
            onChange={(e) => {
              onChangeSearch({
                wallet_id: Number(e.target.value)
              })
            }}
            options={financeState.wallet.map($.parseItemToOption)}
            disabled={props.loading}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Tipo'
            value={tagSearch.type_id || ''}
            onChange={(e) => {
              onChangeSearch({
                page: 1,
                type_id: Number(e.target.value) as FinanceTypeId
              })
            }}
            options={financeState.type.map($.parseItemToOption)}
            disabled={props.loading}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Status'
            value={String(tagSearch.enable)}
            onChange={(e) => {
              onChangeSearch({
                page: 1,
                enable: Number(e.target.value) as Enable
              })
            }}
            options={[
              { id: '1', description: 'Ativo' },
              { id: '0', description: 'Inativo' },
            ]}
            disabled={props.loading}
          />
        </AppColumn>
        <AppColumn xs={12} sm={4} md={3} lg={2}>
          <AppInput
            label='Pesquisar'
            value={tagSearch._q || ''}
            onChange={(e) => {
              onChangeSearch({
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

        <AppButton type="button" onClick={() => {
          resetTagSearch()
        }} >
          <AppIcon variant='reset' />
        </AppButton>
      </AppButtonGroup>
    </AppForm>
  )
}