import React, { createContext, createRef, useContext } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { http } from '@/@core/infra/http'
import { AppDropdown, AppDropdownHandle, AppIcon, AppDivider, AppColumns, AppColumn, Table2, TableCard } from '@/components'
import { FinanceStatusId, _limitApi } from '@/types/enum'
import { FinanceItem } from '@/types/entities/finance-item'
import { FinanceExtractFormSearchFields } from '@/types/form/financeExtract'
import { $table } from '@/utils'
import { SystemStore } from '@/store/hook'
import { useMediaQuerys } from '@/hooks'

interface Props {
  items: FinanceItem[]
  getItems: (args?: { search?: Partial<FinanceExtractFormSearchFields> }) => Promise<void>
  search: { limit: number, page: number, total: number }
  onChangeSearch: (value: Partial<FinanceExtractFormSearchFields>) => void
}
export const FinanceExtractTable = (props: Props) => {
  const systemStore = SystemStore()
  const tableMenuRef = createRef<AppDropdownHandle>()

  const { minTable, minDesktop } = useMediaQuerys()

  function handleChangePage(newPage: number) {
    props.onChangeSearch({ page: newPage })

    props.getItems({ search: { page: newPage } })
  }
  function handleChangeRowsPerPage(newLimit: _limitApi) {
    props.onChangeSearch({ _limit: newLimit })

    props.getItems({ search: { _limit: newLimit } })
  }
  async function handleStatus(id: number, statusId: FinanceStatusId) {
    tableMenuRef.current?.handleClose()

    systemStore.loadingStart()

    const { error } = await http.financeItem.status(id, statusId)

    systemStore.loadingEnd()

    if (!!error) {
      // toast
      return
    }

    await props.getItems()
  }
  async function handleItemEnable(atcion: 'enabled' | 'disabled', id: number) {
    tableMenuRef.current?.handleClose()

    systemStore.loadingStart()

    const { error } = atcion === 'enabled'
      ? await http.financeItem.enabled(id)
      : await http.financeItem.disabled(id)

    systemStore.loadingEnd()

    if (!!error) {
      // toast
      return
    }

    await props.getItems()
  }

  return (
    <contextLocal.Provider value={{
      handleStatus: handleStatus,
      handleItemEnable: handleItemEnable,
      tableMenuRef: tableMenuRef
    }}>
      <Table2.Container
        bodyItemsLength={props.items.length}
        columnsCount={6}
        search={{
          'limit': props.search.limit,
          'page': props.search.page,
          'total': props.search.total,
        }}
        contentHeader={minTable && (
          <>
            <Table2.Cell component="th"></Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Tipo</Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Status</Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Valor</Table2.Cell>
            <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Data</Table2.Cell>
            {minDesktop && (
              <>
                <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Origin</Table2.Cell>
                <Table2.Cell component="th" sx={{ py: 1, px: 0 }}>Obs</Table2.Cell>
              </>
            )}
          </>
        )
        }
        contentBody={
          props.items.map(row => (
            <Table2.RowResponsive
              key={row.id}
              previewMobile={<RowMobile row={row} />}
              previewDesktop={<RowDesktop row={row} />}
            />
          ))
        }
        responsive={true}
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
    </contextLocal.Provider>
  )
}

const RowMobile = (props: { row: FinanceItem }) => {
  return (
    <Table2.Cell sx={{ px: 0.75 }}>
      <TableCard.Container>
        <TableCard.Header>
          <span>ID: {props.row.id}</span>
          <span className="dropdown">
            <TableMenu row={props.row} />
          </span>
        </TableCard.Header>
        <AppColumns>
          <AppColumn xs={6}>
            <TableCard.Row text='Data' value={dayjs(props.row.date).format('DD/MM/YYYY')} />
            <TableCard.Row text='Valor' value={props.row.value} />
            <TableCard.Row text='Tags' value={props.row.tag_ids.map(e => e.description).join(', ')} />
          </AppColumn>
          <AppColumn xs={6}>
            <TableCard.Row text='Tipo' value={props.row.type.description} />
            <TableCard.Row text='Status' value={props.row.status.description} />
            <TableCard.Row text='Origin' value={props.row.origin.description} />
          </AppColumn>
        </AppColumns>
      </TableCard.Container>
    </Table2.Cell>
  )
}
const RowDesktop = (props: { row: FinanceItem }) => {
  const { minDesktop } = useMediaQuerys()

  return (
    <>
      <Table2.Cell sx={{ width: 35, p: 0 }}>
        <TableMenu row={props.row} />
      </Table2.Cell>
      <Table2.Cell sx={{ px: 0.5 }}>
        {props.row.type.description}
      </Table2.Cell>
      <Table2.Cell sx={{ px: 0.5 }}>
        {props.row.status.description}
      </Table2.Cell>
      <Table2.Cell sx={{ px: 0.5 }}>
        {props.row.value}
      </Table2.Cell>
      <Table2.Cell sx={{ px: 0.5 }}>
        {dayjs(props.row.date).format('DD/MM/YYYY')}
      </Table2.Cell>
      {minDesktop && (
        <>
          <Table2.Cell sx={{ px: 0.5 }}>
            {props.row.origin.description}
          </Table2.Cell>
          <Table2.Cell sx={{ px: 0.5 }}>
            {props.row.obs}
          </Table2.Cell>
        </>
      )}
    </>
  )
}
const TableMenu = (props: { row: FinanceItem }) => {
  const { tableMenuRef, handleStatus, handleItemEnable } = useContext(contextLocal)

  const router = useRouter()
  const systemStore = SystemStore()

  return (
    <AppDropdown.Container
      ref={tableMenuRef}
      toggle={<AppIcon variant='ellipsisV' />}
      menu={
        <div>
          <AppDropdown.Item disabled={systemStore.state.loading} onClick={() => router.push(`/finance/item/${props.row.id}`)}>
            <AppIcon variant='edit' /> Editar
          </AppDropdown.Item>

          <AppDropdown.Item disabled={systemStore.state.loading} onClick={() => router.push(`/finance/item/new?copy=${props.row.id}`)}>
            <AppIcon variant='copy' /> Copiar
          </AppDropdown.Item>

          <AppDivider />

          {$table.renderMenuItemFinanceStatus(props.row.status.id, [2, 3],
            <AppDropdown.Item disabled={systemStore.state.loading} onClick={() => handleStatus(props.row.id, 1)}>
              <AppIcon variant='circleCheck' /> Marcar Ok
            </AppDropdown.Item>
          )}
          {$table.renderMenuItemFinanceStatus(props.row.status.id, [1, 3],
            <AppDropdown.Item disabled={systemStore.state.loading} onClick={() => handleStatus(props.row.id, 2)}>
              <AppIcon variant='circleCheck' /> Marcar Pendente
            </AppDropdown.Item>
          )}
          {$table.renderMenuItemFinanceStatus(props.row.status.id, [1, 2],
            <AppDropdown.Item disabled={systemStore.state.loading} onClick={() => handleStatus(props.row.id, 3)}>
              <AppIcon variant='circleCheck' /> Marcar Talvez
            </AppDropdown.Item>
          )}

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
  handleStatus: (id: number, statusId: FinanceStatusId) => Promise<void>
  handleItemEnable: (atcion: 'enabled' | 'disabled', id: number) => Promise<void>
  tableMenuRef: React.RefObject<AppDropdownHandle>
}
const contextLocal = createContext({} as ContextLocal)