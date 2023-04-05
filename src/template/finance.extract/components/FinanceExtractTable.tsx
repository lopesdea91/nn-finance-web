import React, { createRef } from 'react'
import { useRouter } from 'next/router'
import { AppDropdown, AppDropdownItem, AppIcon, AppDivider } from '@/components/base'
import { AppDropdownHandle } from '@/components/base/dropdown/AppDropdpwn'
import { BaseTable, TCell, TRow } from '@/components/table/BaseTable'
import { FinanceStatusId, _limitApi } from '@/types/enum'
import { FinanceItem } from '@/types/entities/finance-item'
import { FinanceExtractFormSearchFields } from '@/types/form/financeExtract'
import { api } from '@/services/api'
import { $table } from '@/utils'
import { useAppSelector } from '@/store/hook'

interface Props {
  items: FinanceItem[]
  getItems: (args?: { search?: Partial<FinanceExtractFormSearchFields> }) => Promise<void>
  search: {
    limit: number
    page: number
    total: number
  }
  onChangeSearch: (value: Partial<FinanceExtractFormSearchFields>) => void
}

export const FinanceExtractTable = (props: Props) => {
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))
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
  async function handleStatus(id: number, statusId: FinanceStatusId) {
    await api.financeItem().status({ id, statusId })

    appDropdownRef.current?.handleClose()

    await props.getItems({})
  }
  async function handleItemEnable(atcion: 'enabled' | 'disabled', id: number) {
    const { status } = atcion === 'enabled'
      ? await api.financeItem().enabled({ id })
      : await api.financeItem().disabled({ id })

    if (status) {
      appDropdownRef.current?.handleClose()

      await props.getItems({})
    }
  }

  return (
    <BaseTable
      headerEditId={true}
      headerTexts={['Tipo', 'Status', 'Valor', 'Data', 'Origin', 'Obs']}
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
        props.items.map((row: FinanceItem) => (
          <TRow key={row.id}>
            <TCell sx={{ width: 55, px: 0.75 }}>
              <AppDropdown
                ref={appDropdownRef}
                toggle={<AppIcon variant='ellipsisV' />}
                menu={
                  <div>
                    <AppDropdownItem disabled={systemState.loading} onClick={() => router.push(`/finance/item/${row.id}`)}>
                      <AppIcon variant='edit' /> Editar
                    </AppDropdownItem>

                    <AppDropdownItem disabled={systemState.loading} onClick={() => router.push(`/finance/item/new?copy=${row.id}`)}>
                      <AppIcon variant='copy' /> Copiar
                    </AppDropdownItem>

                    <AppDivider />

                    {$table.renderMenuItemFinanceStatus(row.status.id, [2, 3],
                      <AppDropdownItem disabled={systemState.loading} onClick={() => handleStatus(row.id, 1)}>
                        <AppIcon variant='circleCheck' /> Marcar Ok
                      </AppDropdownItem>
                    )}
                    {$table.renderMenuItemFinanceStatus(row.status.id, [1, 3],
                      <AppDropdownItem disabled={systemState.loading} onClick={() => handleStatus(row.id, 2)}>
                        <AppIcon variant='circleCheck' /> Marcar Pendente
                      </AppDropdownItem>
                    )}
                    {$table.renderMenuItemFinanceStatus(row.status.id, [1, 2],
                      <AppDropdownItem disabled={systemState.loading} onClick={() => handleStatus(row.id, 3)}>
                        <AppIcon variant='circleCheck' /> Marcar Talvez
                      </AppDropdownItem>
                    )}

                    <AppDivider />

                    {$table.renderMenuItemFinanceEnable(row.enable, 1,
                      <AppDropdownItem disabled={systemState.loading} onClick={() => handleItemEnable('enabled', row.id)}>
                        <AppIcon variant='circleCheck' /> Ativar
                      </AppDropdownItem>
                    )}
                    {$table.renderMenuItemFinanceEnable(row.enable, 0,
                      <AppDropdownItem disabled={systemState.loading} onClick={() => handleItemEnable('disabled', row.id)}>
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
