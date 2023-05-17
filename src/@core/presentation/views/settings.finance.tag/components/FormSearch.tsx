import React from 'react'
import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect, FormSearchResponsive } from '@/@core/presentation/shared'
import { Enable, FinanceTypeId } from '@/types/enum'
import { SystemStore, FinanceStore, PageSettingsFinanceTagStore } from '@/store/hook'
import { $utils } from '@/utils'
import { SettingsFinanceTagMethods } from '../index.methods'


export const FormSearch = () => {
  const { getItems, onChangeSearch, resetSearch, onChangePage } = SettingsFinanceTagMethods()

  const systemStore = SystemStore()
  const financeStore = FinanceStore()
  const pageSettingsFinanceTagStore = PageSettingsFinanceTagStore()

  const formSearchRef = React.createRef<{ close: () => void }>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    getItems()
    formSearchRef.current?.close()
  }

  return (
    <FormSearchResponsive ref={formSearchRef}>
      <AppForm onSubmit={handleSubmit}>
        <AppColumns>
          <AppColumn xs={6} sm={4} md={3} lg={2}>
            <AppSelect
              label='Carteira'
              value={pageSettingsFinanceTagStore.state.formSearch.wallet_id ? String(pageSettingsFinanceTagStore.state.formSearch.wallet_id) : ''}
              onChange={(e) => {
                onChangePage(1)
                onChangeSearch({
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
              value={pageSettingsFinanceTagStore.state.formSearch.type_id ? String(pageSettingsFinanceTagStore.state.formSearch.type_id) : ''}
              onChange={(e) => {
                onChangePage(1)
                onChangeSearch({
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
              value={String(pageSettingsFinanceTagStore.state.formSearch.enable)}
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
          <AppColumn xs={12} sm={4} md={3} lg={2}>
            <AppInput
              labelProps={{
                label: 'Pesquisar'
              }}
              inputProps={{
                value: String(pageSettingsFinanceTagStore.state.formSearch.query),
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
    </FormSearchResponsive>
  )
}