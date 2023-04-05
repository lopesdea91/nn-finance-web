import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect } from '../../../components/base'
import { Enable } from '@/types/enum'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'
import { useAppSelector } from '@/store/hook'

interface Props {
  getItems: () => Promise<void>
  search: FinanceWalletFormSearchFields
  onChangeSearch: (value: Partial<FinanceWalletFormSearchFields>) => void
  resetSearch: () => void
}

export const FormSearch = (props: Props) => {
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))

  return (
    <AppForm onSubmit={() => props.getItems()}>
      <AppColumns>
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
            disabled={systemState.loading}
            optionEmpty
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}>
          <AppSelect
            label='Painel'
            value={String(props.search.panel)}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                panel: e.target.value as number
              })
            }}
            options={[
              { id: '1', description: 'Ativo' },
              { id: '0', description: 'Inativo' },
            ]}
            disabled={systemState.loading}
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
            disabled={systemState.loading}
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