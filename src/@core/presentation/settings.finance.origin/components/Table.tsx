import React, { createContext, createRef, useContext } from 'react'
import { AppDropdown, AppIcon, AppDivider, Table2, AppDropdownHandle } from '@/components'
import { _limitApi } from '@/types/enum'
import { FinanceOrigin } from '@/types/entities/finance-origin'
import { FinanceOriginFormSearchFields } from '@/types/form/settingsFinanceOrigin'
import { $table } from '@/utils'
import { useRouter } from 'next/router'
import { SystemStore } from '@/store/hook'
import { http } from '@/@core/infra/http'

interface Props {
  items: FinanceOrigin[]
  getItems: (args?: { search?: Partial<FinanceOriginFormSearchFields> }) => Promise<void>
  search: {
    page: number
    total: number
    limit: number
  }
  onChangeSearch: (value: Partial<FinanceOriginFormSearchFields>) => void
}

export const Table = (props: Props) => {
  const tableMenuRef = createRef<AppDropdownHandle>();

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
      ? await http.financeOrigin.enabled(id)
      : await http.financeOrigin.disabled(id)

    tableMenuRef.current?.handleClose()

    await props.getItems({})
  }

  return (
    <contextLocal.Provider value={{
      handleItemEnable: handleItemEnable,
      tableMenuRef: tableMenuRef
    }}
    >
      <Table2.Container
        bodyItemsLength={props.items.length}
        columnsCount={6}
        search={{
          'limit': props.search.limit,
          'page': props.search.page,
          'total': props.search.total,
        }}
        contentHeader={(
          <>
            <Table2.Cell component="th"></Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Descrição</Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Tipo</Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Parent</Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Status</Table2.Cell>
            <Table2.Cell></Table2.Cell>
          </>
        )}
        contentBody={
          props.items.map((row: FinanceOrigin) => (
            <Table2.Row key={row.id}>
              <Table2.Cell sx={{ width: 35, p: 0 }}>
                <TableMenu row={row} />
              </Table2.Cell>
              <Table2.Cell sx={{ width: '150px', px: 0.5 }}>
                {row.description}
              </Table2.Cell>
              <Table2.Cell sx={{ width: '150px', px: 0.5 }}>
                {row.type?.description || '-'}
              </Table2.Cell>
              <Table2.Cell sx={{ width: '150px', px: 0.5 }}>
                {row.parent?.description || '-'}
              </Table2.Cell>
              <Table2.Cell sx={{ width: '150px', px: 0.5 }}>
                {Number(row.enable) ? 'Ativo' : 'Inativo'}
              </Table2.Cell>
              <Table2.Cell></Table2.Cell>
            </Table2.Row>
          ))
        }
      />

      <Table2.Pagination
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        search={{
          limit: props.search.limit,
          page: props.search.page,
          total: props.search.total
        }}
      />
    </contextLocal.Provider >
  )
}
const TableMenu = (props: { row: FinanceOrigin }) => {
  const { tableMenuRef, handleItemEnable } = useContext(contextLocal)

  const router = useRouter()
  const systemStore = SystemStore()

  return (
    <AppDropdown.Container
      ref={tableMenuRef}
      toggle={<AppIcon variant='ellipsisV' />}
      menu={
        <div>
          <AppDropdown.Item disabled={systemStore.state.loading} onClick={() => router.push(`/settings/finance/origin/${props.row.id}`)}>
            <AppIcon variant='edit' /> Editar
          </AppDropdown.Item>

          <AppDivider />

          {$table.renderMenuItemFinanceEnable(props.row.enable, 1,
            <AppDropdown.Item disabled={systemStore.state.loading} onClick={() => handleItemEnable('enabled', props.row.id)}>
              <AppIcon variant='circleCheck' /> Ativar
            </AppDropdown.Item>
          )}
          {$table.renderMenuItemFinanceEnable(props.row.enable, 0,
            <AppDropdown.Item disabled={systemStore.state.loading} onClick={() => handleItemEnable('disabled', props.row.id)}>
              <AppIcon variant='circleCheck' /> Inativar
            </AppDropdown.Item>
          )}
        </div>
      }
    />
  )
}


type ContextLocal = {
  handleItemEnable: (atcion: 'enabled' | 'disabled', id: number) => Promise<void>
  tableMenuRef: React.RefObject<AppDropdownHandle>
}
const contextLocal = createContext({} as ContextLocal)