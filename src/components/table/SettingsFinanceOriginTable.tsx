import React, { createRef } from 'react'
import { useRouter } from 'next/router'
import { AppDropdown, AppDropdownItem, AppIcon, AppDivider } from '../base'
import { AppDropdownHandle } from '../base/dropdown/AppDropdpwn'
import { BaseTable, TCell, TRow } from './BaseTable'
import { useStoreFinanceOriginSearch } from '@/hooks/useStoreFinance'
import { _limitApi } from '@/types/enum'
import { FinanceOrigin } from '@/types/entities/finance-origin'
import { FinanceOriginFormSearchFields } from '@/types/form/settingsFinanceOrigin'
import { api } from '@/services/api'
import { $table } from '@/utils/table'

interface Props {
  items: FinanceOrigin[]
  loading: boolean
  getItems: (s: Partial<FinanceOriginFormSearchFields>) => Promise<void>
}

export const SettingsFinanceOriginTable = (props: Props) => {
  const appDropdownRef = createRef<AppDropdownHandle>();
  const router = useRouter()
  const { originSearch, onChangeSearch } = useStoreFinanceOriginSearch()

  function handleChangePage(newPage: number) {
    onChangeSearch({ page: newPage })

    props.getItems({ page: newPage })
  }
  function handleChangeRowsPerPage(newLimit: _limitApi) {
    onChangeSearch({ _limit: newLimit })

    props.getItems({ _limit: newLimit })
  }

  async function handleItemEnable(atcion: 'enabled' | 'disabled', id: number) {
    atcion === 'enabled'
      ? await api.finance.origin.enabled({ id })
      : await api.finance.origin.disabled({ id })

    appDropdownRef.current?.handleClose()

    await props.getItems({})
  }
  return (
    <BaseTable
      headerEditId={true}
      headerTexts={['Descrição', 'Status', 'Parent', 'Tipo', 'Carteeira']}
      bodyItemsLength={props.items.length}
      columnsCount={6}
      search={{
        '_total': Number(originSearch._total),
        '_limit': Number(originSearch._limit),
        'page': Number(originSearch.page),
      }}
      changePage={handleChangePage}
      changePerPage={handleChangeRowsPerPage}
    >
      {
        props.items.map((row: FinanceOrigin) => (
          <TRow key={row.id}>
            <TCell sx={{ width: 55, px: 0.75 }}>
              <AppDropdown
                ref={appDropdownRef}
                toggle={<AppIcon variant='ellipsisV' />}
                menu={
                  <div>
                    <AppDropdownItem disabled={props.loading} onClick={() => router.push(`/settings/finance/origin/${row.id}`)}>
                      <AppIcon variant='edit' /> Editar
                    </AppDropdownItem>

                    <AppDivider />

                    {$table.renderMenuItemFinanceEnable(row.enable, 1,
                      <AppDropdownItem disabled={props.loading} onClick={() => handleItemEnable('enabled', row.id)}>
                        <AppIcon variant='circleCheck' /> Ativar
                      </AppDropdownItem>
                    )}
                    {$table.renderMenuItemFinanceEnable(row.enable, 0,
                      <AppDropdownItem disabled={props.loading} onClick={() => handleItemEnable('disabled', row.id)}>
                        <AppIcon variant='circleCheck' /> Inativar
                      </AppDropdownItem>
                    )}
                  </div>
                }
              />
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.description}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.enable ? 'Ativo' : 'Inativo'}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.parent?.description || '-'}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.type?.description || '-'}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.wallet?.description || '-'}
            </TCell>
          </TRow>
        ))
      }
    </BaseTable>
  )
}
