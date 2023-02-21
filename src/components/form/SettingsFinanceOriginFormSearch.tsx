import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect } from '../base'
import { useStoreFinanceOriginSearch } from '@/hooks/useStoreFinance'
import { useStoreFinance } from '@/hooks/useStoreFinance'
import { $ } from '@/utils'
import { Enable } from '@/types/enum'
import { FinanceOriginFormSearchFields } from '@/types/form/settingsFinanceOrigin'

interface Props {
  loading: boolean
  getItems: (s: Partial<FinanceOriginFormSearchFields>) => Promise<void>
}

export const SettingsFinanceOriginFormSearch = (props: Props) => {
  const { financeState } = useStoreFinance()
  const { originSearch, onChangeSearch, resetOriginSearch } = useStoreFinanceOriginSearch()

  function onSubmit() {
    props.getItems(originSearch)
  }

  return (
    <AppForm onSubmit={onSubmit}>
      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Carteira */}
          <AppSelect
            label='Carteira'
            value={originSearch.wallet_id || ''}
            onChange={(e) => {
              onChangeSearch({
                wallet_id: Number(e.target.value),
                parent_id: null
              })
            }}
            options={financeState.wallet.map($.parseItemToOption)}
            disabled={props.loading}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Parent */}
          <AppSelect
            label='Parent'
            value={originSearch.parent_id || ''}
            onChange={(e) => {
              onChangeSearch({
                parent_id: e.target.value as number
              })
            }}
            options={financeState.origin.filter(el => el.wallet.id === originSearch.wallet_id).map($.parseItemToOption)}
            disabled={props.loading || !originSearch.wallet_id}
            optionEmpty
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Status */}
          <AppSelect
            label='Status'
            value={originSearch.enable || ''}
            onChange={(e) => {
              onChangeSearch({
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

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Tipo */}
          <AppSelect
            label='Tipo'
            value={originSearch.type_id || []}
            onChange={(e) => {
              onChangeSearch({
                page: 1,
                type_id: e.target.value as number[]
              })
            }}
            options={financeState.originType.map($.parseItemToOption)}
            disabled={props.loading}
            optionEmpty
            multiple
          />
        </AppColumn>

        <AppColumn xs={12} sm={4} md={3} lg={2}>
          <AppInput
            label='Pesquisar'
            value={originSearch._q || ''}
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
          resetOriginSearch()
        }} >
          <AppIcon variant='reset' />
        </AppButton>
      </AppButtonGroup>
    </AppForm>
  )
}