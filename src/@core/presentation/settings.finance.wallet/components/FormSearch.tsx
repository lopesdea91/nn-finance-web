import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, FormSearchResponsive, AppIcon, AppInput, AppSelect } from '@/components'
import { Enable } from '@/types/enum'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'
import { SystemStore } from '@/store/hook'
import React from 'react'

interface Props {
  getItems: () => Promise<void>
  search: FinanceWalletFormSearchFields
  onChangeSearch: (value: Partial<FinanceWalletFormSearchFields>) => void
  resetSearch: () => void
}

export const FormSearch = (props: Props) => {
  const systemStore = SystemStore()

  const formSearchRef = React.createRef<{ close: () => void }>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.getItems()
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

          <AppColumn xs={6} sm={4} md={3} lg={2}>
            <AppSelect
              data-testid="select-panel"
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
          <AppButton type="submit" data-testid="button-submit">
            <AppIcon variant='search' />
          </AppButton>

          <AppButton type="button" onClick={() => props.resetSearch()} data-testid="button-reset">
            <AppIcon variant='reset' />
          </AppButton>
        </AppButtonGroup>
      </AppForm>
    </FormSearchResponsive>
  )
}