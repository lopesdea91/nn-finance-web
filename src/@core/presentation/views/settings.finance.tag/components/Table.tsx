import { createContext, createRef, useContext } from 'react'
import { useRouter } from 'next/router'
import { http } from '@/@core/infra/http'
import { AppDivider, AppDropdown, AppDropdownHandle, AppIcon, Table2 } from '@/@core/presentation/shared'
import { _limitApi } from '@/types/enum'
import { FinanceTag } from '@/types/entities/finance-tag'
import { PageSettingsFinanceTagStore, SystemStore } from '@/store/hook'
import { $table } from '@/utils'
import { SettingsFinanceTagMethods } from '../index.methods'

export const Table = () => {
  const pageSettingsFinanceTagStore = PageSettingsFinanceTagStore()
  const { table } = pageSettingsFinanceTagStore.state

  const tableMenuRef = createRef<AppDropdownHandle>();

  const { getItems, onChangePage, onChangeLimit } = SettingsFinanceTagMethods()

  const handleChangePage = (newPage: number) => {
    onChangePage(newPage)
    getItems({ page: newPage })
  }
  const handleChangeRowsPerPage = (newLimit: _limitApi) => {
    onChangePage(1)
    onChangeLimit(newLimit)
    getItems({ limit: newLimit, page: 1 })
  }
  const handleItemEnable = async (atcion: 'enabled' | 'disabled', id: number) => {
    atcion === 'enabled'
      ? await http.financeTag.enabled(id)
      : await http.financeTag.disabled(id)

    tableMenuRef.current?.handleClose()

    await getItems()
  }

  return (
    <contextLocal.Provider value={{
      handleItemEnable: handleItemEnable,
      tableMenuRef: tableMenuRef
    }}
    >
      <Table2.Container
        bodyItemsLength={table.items.length}
        columnsCount={6}
        search={{
          'limit': table.limit,
          'page': table.page,
          'total': table.total,
        }}
        contentHeader={(
          <>
            <Table2.Cell component="th"></Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Descrição</Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Tipo</Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Status</Table2.Cell>
            <Table2.Cell></Table2.Cell>
          </>
        )}
        contentBody={
          table.items.map((row: FinanceTag) => (
            <Table2.Row key={row.id}>
              <Table2.Cell sx={{ width: 35, p: 0 }}>
                <TableMenu row={row} />
              </Table2.Cell>
              <Table2.Cell sx={{ width: '150px', px: 0.5 }}>
                {row.description}
              </Table2.Cell>
              <Table2.Cell sx={{ width: '150px', px: 0.5 }}>
                {row.type.description}
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
          limit: table.limit,
          page: table.page,
          total: table.total
        }}
      />
    </contextLocal.Provider >
  )
}

const TableMenu = (props: { row: FinanceTag }) => {
  const { tableMenuRef, handleItemEnable } = useContext(contextLocal)

  const router = useRouter()
  const systemStore = SystemStore()

  return (
    <AppDropdown.Container
      ref={tableMenuRef}
      toggle={<AppIcon variant='ellipsisV' />}
      menu={
        <div>
          <AppDropdown.Item disabled={systemStore.state.loading} onClick={() => router.push(`/settings/finance/tag/${props.row.id}`)}>
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