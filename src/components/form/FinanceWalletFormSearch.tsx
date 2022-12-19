import React from 'react'
import { usePageSettingsWallet } from '@/hooks/usePageStore'
import { AppInput, AppSelect } from '@/components/base'
import { enableContent } from '@/content/enable.content'
import useLayoutStore from '@/hooks/useLayoutStore'


export const FinanceWalletFormSearch = () => {
  const { state } = useLayoutStore()
  const { search, setSearch } = usePageSettingsWallet()

  const onChange = (key: string, value: string) => {
    setSearch({
      ...search,
      [key]: value
    })
  }

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 m-0 mb-2 mb-md-0">
      <AppInput
        label="Buscar"
        value={search._q || ''}
        onChange={({ target }) => onChange('_q', target.value)}
        disabled={state.loading}
      />

      <AppSelect
        label="Status"
        value={search.enable}
        onChange={({ target }) => onChange('enable', target.value)}
        disabled={state.loading}
      >
        {enableContent.map(({ value, label, ...rest }) => <option key={value} value={value} {...rest}>{label}</option>)}
      </AppSelect>

      <AppSelect
        label="Painel"
        value={search.panel}
        onChange={({ target }) => onChange('panel', target.value)}
        disabled={state.loading}
      >
        {enableContent.map(({ value, label, ...rest }) => <option key={value} value={value} {...rest}>{label}</option>)}
      </AppSelect>
    </div>
  )
}
