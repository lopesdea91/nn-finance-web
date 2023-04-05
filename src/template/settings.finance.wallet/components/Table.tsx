import { createRef } from 'react'
import { useRouter } from 'next/router'
import { AppDivider, AppDropdown, AppDropdownItem, AppIcon } from '../../../components/base'
import { AppDropdownHandle } from '../../../components/base/dropdown/AppDropdpwn'
import { BaseTable, TCell, TRow } from '../../../components/table/BaseTable'
import { _limitApi } from '@/types/enum'
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'
import { api } from '@/services/api'
import { $table } from '@/utils'
import { useAppSelector } from '@/store/hook'

interface Props {
  items: FinanceWallet[]
  getItems: (args?: { search?: Partial<FinanceWalletFormSearchFields> }) => Promise<void>
  search: {
    page: number
    total: number
    limit: number
  }
  onChangeSearch: (value: Partial<FinanceWalletFormSearchFields>) => void
}

export const Table = (props: Props) => {
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
  async function handleItemEnable(atcion: 'enabled' | 'disabled', id: number) {
    atcion === 'enabled'
      ? await api.financeWallet().enabled({ id })
      : await api.financeWallet().disabled({ id })

    appDropdownRef.current?.handleClose()

    await props.getItems()
  }



  return (
    <BaseTable
      headerEditId={true}
      headerTexts={['Descrição', 'Status', 'Painel']}
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
        props.items.map((row: FinanceWallet) => (
          <TRow key={row.id}>
            <TCell sx={{ width: 55, px: 0.75 }}>
              <AppDropdown
                ref={appDropdownRef}
                toggle={<AppIcon variant='ellipsisV' />}
                menu={
                  <div>
                    <AppDropdownItem disabled={systemState.loading} onClick={() => router.push(`/settings/finance/wallet/${row.id}`)}>
                      <AppIcon variant='edit' /> Editar
                    </AppDropdownItem>

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
              {row.description}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {Number(row.enable) ? 'Ativo' : 'Inativo'}
            </TCell>
            <TCell sx={{ px: 0.5 }}>
              {Number(row.panel) ? 'Em uso' : '-'}
            </TCell>
          </TRow>
        ))
      }
    </BaseTable>
  )
}
