import React from 'react'
import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect } from '@/components/base'
import { Enable } from '@/types/enum'
import { SystemStore, FinanceStore, PageSettingsFinanceOriginStore } from '@/store/hook'
import { $utils } from '@/utils'
import { SettingsFinanceOriginMethods } from '../index.methods'

export const FormSearch = () => {
  const { getItems, onChangeSearch, resetSearch, onChangePage } = SettingsFinanceOriginMethods()

  const systemStore = SystemStore()
  const pageSettingsFinanceOriginStore = PageSettingsFinanceOriginStore()
  const financeStore = FinanceStore()

  const formSearchRef = React.createRef<{ close: () => void }>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    getItems()
    formSearchRef.current?.close()
  }

  const { formSearch } = pageSettingsFinanceOriginStore.state

  console.log('... formSearch', formSearch);


  return (
    <AppForm onSubmit={handleSubmit}>
      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Carteira */}
          <AppSelect
            label='Carteira'
            value={formSearch.wallet_id ? String(formSearch.wallet_id) : ''}
            onChange={(e) => {
              onChangePage(1)
              onChangeSearch({
                wallet_id: e.target.value as number,
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
            value={formSearch.parent_id ? String(formSearch.parent_id) : ''}
            onChange={(e) => {
              onChangePage(1)
              onChangeSearch({
                parent_id: e.target.value as number
              })
            }}
            options={financeStore.state.origin.filter(el => el.wallet.id === formSearch.wallet_id).map($utils.parseItemToOption)}
            disabled={systemStore.state.loading || !formSearch.wallet_id}
            optionEmpty
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Status */}
          <AppSelect
            label='Status'
            value={String(formSearch.enable)}
            onChange={(e) => {
              onChangePage(1)
              onChangeSearch({
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
            value={formSearch.type_id ? formSearch.type_id : []}
            onChange={(e) => {
              onChangePage(1)
              onChangeSearch({
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
              value: String(formSearch.query),
              onChange: (e) => {
                onChangePage(1)
                onChangeSearch({
                  query: e.target.value,
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

        <AppButton type="button" onClick={() => resetSearch()}>
          <AppIcon variant='reset' />
        </AppButton>
      </AppButtonGroup>
    </AppForm>
  )
}