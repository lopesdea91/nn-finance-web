import React, { createRef } from 'react'
import { useRouter } from 'next/router'
import { AppDivider, AppIcon } from '../../../components/base'
import { AppDropdown, AppDropdownHandle, AppDropdownItem } from '../../../components/base/dropdown/AppDropdpwn'
import { BaseTable, TCell, TRow } from '../../../components/table/BaseTable'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'
import { _limitApi } from '@/types/enum'
import { FinanceTag } from '@/types/entities/finance-tag'
import { api } from '@/services/api'
import { $table } from '@/utils'

interface Props {
  items: FinanceTag[]
  loading: boolean
  getItems: (args?: { search?: Partial<FinanceTagFormSearchFields> }) => Promise<void>
  search: {
    limit: number
    page: number
    total: number
  }
  onChangeSearch: (value: Partial<FinanceTagFormSearchFields>) => void
}

export const Table = (props: Props) => {
  const appDropdownRef = createRef<AppDropdownHandle>();
  const router = useRouter()

  function handleChangePage(newPage: number) {
    props.onChangeSearch({ page: newPage })

    props.getItems({ search: { page: newPage } })
  }
  function handleChangeRowsPerPage(newLimit: _limitApi) {
    props.onChangeSearch({ _limit: newLimit })

    props.getItems({ search: { _limit: newLimit } })
  }
  async function handleItemEnable(atcion: 'enabled' | 'disabled', id: number) {
    atcion === 'enabled'
      ? await api.financeTag().enabled({ id })
      : await api.financeTag().disabled({ id })

    appDropdownRef.current?.handleClose()

    await props.getItems()
  }

  return (
    <BaseTable
      headerEditId={true}
      headerTexts={['Descrição', 'Status', 'Tipo', 'Carteira']}
      bodyItemsLength={props.items.length}
      columnsCount={6}
      search={{
        'limit': props.search.limit,
        'page': props.search.page,
        'total': props.search.total,
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
              {row.type.description}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.enable ? 'Ativo' : 'Inativo'}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.wallet.description}
            </TCell>
          </TRow>
        ))
      }
    </BaseTable>
  )
}
