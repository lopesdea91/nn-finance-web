import React, { createRef } from 'react'
import { useRouter } from 'next/router'
import { AppDivider, AppIcon } from '../base'
import { AppDropdown, AppDropdownHandle, AppDropdownItem } from '../base/dropdown/AppDropdpwn'
import { useStoreFinanceTagSearch } from '@/hooks/useStoreFinance'
import { BaseTable, TCell, TRow } from './BaseTable'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'
import { _limitApi } from '@/types/enum'
import { FinanceTag } from '@/types/entities/finance-tag'
import { api } from '@/services/api'
import { $table } from '@/utils/table'

interface Props {
  items: FinanceTag[]
  loading: boolean
  getItems: (s: Partial<FinanceTagFormSearchFields>) => Promise<void>
}

export const SettingsFinanceTagTable = (props: Props) => {
  const appDropdownRef = createRef<AppDropdownHandle>();
  const router = useRouter()
  const { tagSearch, onChangeSearch } = useStoreFinanceTagSearch()

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
      ? await api.finance.tag.enabled({ id })
      : await api.finance.tag.disabled({ id })

    appDropdownRef.current?.handleClose()

    await props.getItems({})
  }

  return (
    <BaseTable
      headerEditId={true}
      headerTexts={['Descrição', 'Status', 'Tipo', 'Carteeira']}
      bodyItemsLength={props.items.length}
      columnsCount={6}
      search={{
        '_total': Number(tagSearch._total),
        '_limit': Number(tagSearch._limit),
        'page': Number(tagSearch.page),
      }}
      changePage={handleChangePage}
      changePerPage={handleChangeRowsPerPage}
    >
      {
        props.items.map((row: FinanceTag) => (
          <TRow key={row.id}>
            <TCell sx={{ width: 55, px: 0.75 }}>
              <AppDropdown
                ref={appDropdownRef}
                toggle={<AppIcon variant='ellipsisV' />}
                menu={
                  <div>
                    <AppDropdownItem disabled={props.loading} onClick={() => router.push(`/settings/finance/tag/${row.id}`)}>
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
