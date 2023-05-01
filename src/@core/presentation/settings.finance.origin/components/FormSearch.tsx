import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect } from '@/components/base'
import { Enable } from '@/types/enum'
import { FinanceOriginFormSearchFields } from '@/types/form/settingsFinanceOrigin'
import { SystemStore, FinanceStore } from '@/store/hook'
import { $utils } from '@/utils'

interface Props {
  getItems: () => Promise<void>
  search: FinanceOriginFormSearchFields
  onChangeSearch: (value: Partial<FinanceOriginFormSearchFields>) => void
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
        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Carteira */}
          <AppSelect
            label='Carteira'
            value={props.search.wallet_id ? String(props.search.wallet_id) : ''}
            onChange={(e) => {
              props.onChangeSearch({
                wallet_id: Number(e.target.value),
                parent_id: null
              })
            }}
            options={financeStore.state.wallet.map($utils.parseItemToOption)}
            disabled={systemStore.state.loading}
            optionEmpty
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Parent */}
          <AppSelect
            label='Parent'
            value={props.search.parent_id ? String(props.search.parent_id) : ''}
            onChange={(e) => {
              props.onChangeSearch({
                parent_id: e.target.value as number
              })
            }}
            options={financeStore.state.origin.filter(el => el.wallet.id === props.search.wallet_id).map($utils.parseItemToOption)}
            disabled={systemStore.state.loading || !props.search.wallet_id}
            optionEmpty
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Status */}
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

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Tipo */}
          <AppSelect
            label='Tipo'
            value={props.search.type_id ? props.search.type_id : []}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                type_id: e.target.value as number[]
              })
            }}
            options={financeStore.state.originType.map($utils.parseItemToOption)}
            disabled={systemStore.state.loading}
            optionEmpty
            multiple
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