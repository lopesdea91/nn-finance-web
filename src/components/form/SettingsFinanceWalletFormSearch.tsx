import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect } from '../base'
import { useStoreFinanceWalletSearch } from '@/hooks/useStoreFinance'
import { Enable } from '@/types/enum'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'

interface Props {
  loading: boolean
  getItems: (s: Partial<FinanceWalletFormSearchFields>) => Promise<void>
}

export const SettingsFinanceWalletFormSearch = (props: Props) => {
  const { walletSearch, onChangeSearch, resetWalletSearch } = useStoreFinanceWalletSearch()

  function onSubmit() {
    props.getItems(walletSearch)
  }

  return (
    <AppForm onSubmit={onSubmit}>
      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Status'
            value={walletSearch.enable || ''}
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

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Painel'
            value={walletSearch.panel || ''}
            onChange={(e) => {
              onChangeSearch({
                page: 1,
                panel: e.target.value as number
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
            value={walletSearch._q || ''}
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
          resetWalletSearch()
        }} >
          <AppIcon variant='reset' />
        </AppButton>
      </AppButtonGroup>
    </AppForm>
  )
}