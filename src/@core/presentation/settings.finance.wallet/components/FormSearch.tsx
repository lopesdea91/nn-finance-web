import React from 'react'
import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, FormSearchResponsive, AppIcon, AppInput, AppSelect } from '@/components'
import { Enable } from '@/types/enum'
import { SystemStore, PageSettingsFinanceWalletStore } from '@/store/hook'
import { SettingsFinanceWalletMethods } from '../index.methods'

export const FormSearch = () => {
  const { getItems, onChangeSearch, resetSearch, onChangePage } = SettingsFinanceWalletMethods()

  const systemStore = SystemStore()
  const pageSettingsFinanceWalletStore = PageSettingsFinanceWalletStore()

  const formSearchRef = React.createRef<{ close: () => void }>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    getItems()
    formSearchRef.current?.close()
  }

  return (
    <FormSearchResponsive ref={formSearchRef}>
      <AppForm onSubmit={handleSubmit} sx={{ mb: 0 }}>
        <AppColumns>
          <AppColumn xs={6} sm={4} md={3} lg={2}>
            <AppSelect
              data-testid="select-status"
              label='Status'
              value={String(pageSettingsFinanceWalletStore.state.formSearch.enable)}
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

          <AppColumn xs={6} sm={4} md={3} lg={2}>
            <AppSelect
              data-testid="select-panel"
              label='Painel'
              value={String(pageSettingsFinanceWalletStore.state.formSearch.panel)}
              onChange={(e) => {
                onChangePage(1)
                onChangeSearch({
                  panel: e.target.value as number
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
                value: String(pageSettingsFinanceWalletStore.state.formSearch.query),
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
          <AppButton type="submit" data-testid="button-submit">
            <AppIcon variant='search' />
          </AppButton>

          <AppButton type="button" onClick={() => resetSearch()} data-testid="button-reset">
            <AppIcon variant='reset' />
          </AppButton>
        </AppButtonGroup>
      </AppForm>
    </FormSearchResponsive>
  )
}