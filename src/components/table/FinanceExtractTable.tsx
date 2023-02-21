import React, { createRef } from 'react'
import { useRouter } from 'next/router'
import { AppDropdown, AppDropdownItem, AppIcon, AppDivider } from '../base'
import { AppDropdownHandle } from '../base/dropdown/AppDropdpwn'
import { BaseTable, TCell, TRow } from './BaseTable'
import { useStoreFinanceExtractSearch } from '@/hooks/useStoreFinance'
import { FinanceStatusId, _limitApi } from '@/types/enum'
import { FinanceItem } from '@/types/entities/finance-item'
import { FinanceExtractFormSearchFields } from '@/types/form/financeExtract'
import { api } from '@/services/api'
import { $table } from '@/utils/table'

interface Props {
  items: FinanceItem[]
  loading: boolean
  getItems: (s: Partial<FinanceExtractFormSearchFields>) => Promise<void>
}

export const FinanceExtractTable = (props: Props) => {
  const appDropdownRef = createRef<AppDropdownHandle>();
  const router = useRouter()
  const { extractSearch, onChangeSearch } = useStoreFinanceExtractSearch()

  function handleChangePage(newPage: number) {
    onChangeSearch({ page: newPage })

    props.getItems({ page: newPage })
  }
  function handleChangeRowsPerPage(newLimit: _limitApi) {
    onChangeSearch({ _limit: newLimit })

    props.getItems({ _limit: newLimit })
  }

  async function handleStatus(id: number, statusId: FinanceStatusId) {
    await api.finance.item.status({ id, statusId })

    appDropdownRef.current?.handleClose()

    await props.getItems({})
  }
  async function handleItemEnable(atcion: 'enabled' | 'disabled', id: number) {
    atcion === 'enabled'
      ? await api.finance.item.enabled({ id })
      : await api.finance.item.disabled({ id })

    appDropdownRef.current?.handleClose()

    await props.getItems({})
  }

  return (
    <BaseTable
      headerEditId={true}
      headerTexts={['Tipo', 'Status', 'Valor', 'Data', 'Origin', 'Obs']}
      bodyItemsLength={props.items.length}
      columnsCount={6}
      search={{
        '_total': Number(extractSearch._total),
        '_limit': Number(extractSearch._limit),
        'page': Number(extractSearch.page),
      }}
      changePage={handleChangePage}
      changePerPage={handleChangeRowsPerPage}
    >
      {
        props.items.map((row: FinanceItem) => (
          <TRow key={row.id}>
            <TCell sx={{ width: 55, px: 0.75 }}>
              <AppDropdown
                ref={appDropdownRef}
                toggle={<AppIcon variant='ellipsisV' />}
                menu={
                  <div>
                    <AppDropdownItem disabled={props.loading} onClick={() => router.push(`/finance/item/${row.id}`)}>
                      <AppIcon variant='edit' /> Editar
                    </AppDropdownItem>

                    <AppDropdownItem disabled={props.loading} onClick={() => router.push(`/finance/item/new?copy=${row.id}`)}>
                      <AppIcon variant='copy' /> Copiar
                    </AppDropdownItem>

                    <AppDivider />

                    {$table.renderMenuItemFinanceStatus(row.status.id, [2, 3],
                      <AppDropdownItem disabled={props.loading} onClick={() => handleStatus(row.id, 1)}>
                        <AppIcon variant='circleCheck' /> Marcar Ok
                      </AppDropdownItem>
                    )}
                    {$table.renderMenuItemFinanceStatus(row.status.id, [1, 3],
                      <AppDropdownItem disabled={props.loading} onClick={() => handleStatus(row.id, 2)}>
                        <AppIcon variant='circleCheck' /> Marcar Pendente
                      </AppDropdownItem>
                    )}
                    {$table.renderMenuItemFinanceStatus(row.status.id, [1, 2],
                      <AppDropdownItem disabled={props.loading} onClick={() => handleStatus(row.id, 3)}>
                        <AppIcon variant='circleCheck' /> Marcar Talvez
                      </AppDropdownItem>
                    )}

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
              {row.type.description}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.status.description}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.value}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.date}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.origin.description}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {row.obs}
            </TCell>
          </TRow>
        ))
      }
    </BaseTable >
  )
}
