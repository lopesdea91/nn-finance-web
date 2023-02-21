import { createRef } from 'react'
import { useRouter } from 'next/router'
import { AppButtonIcon, AppDivider, AppDropdown, AppDropdownItem, AppIcon } from '../base'
import { AppDropdownHandle } from '../base/dropdown/AppDropdpwn'
import { BaseTable, TCell, TRow } from './BaseTable'
import { useStoreFinanceWalletSearch } from '@/hooks/useStoreFinance'
import { _limitApi } from '@/types/enum'
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'
import { api } from '@/services/api'
import { $table } from '@/utils/table'

interface Props {
  items: FinanceWallet[]
  loading: boolean
  getItems: (s: Partial<FinanceWalletFormSearchFields>) => Promise<void>
}

export const SettingsFinanceWalletTable = (props: Props) => {
  const appDropdownRef = createRef<AppDropdownHandle>();
  const router = useRouter()
  const { walletSearch, onChangeSearch } = useStoreFinanceWalletSearch()

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
      ? await api.finance.wallet.enabled({ id })
      : await api.finance.wallet.disabled({ id })

    appDropdownRef.current?.handleClose()

    await props.getItems({})
  }

  return (
    <BaseTable
      headerEditId={true}
      headerTexts={['Descrição', 'Status', 'Painel']}
      bodyItemsLength={props.items.length}
      columnsCount={6}
      search={{
        '_total': Number(walletSearch._total),
        '_limit': Number(walletSearch._limit),
        'page': Number(walletSearch.page),
      }
      }
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
                    <AppDropdownItem disabled={props.loading} onClick={() => router.push(`/settings/finance/wallet/${row.id}`)}>
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

                    {/* <AppButtonIcon
                      variant='edit'
                      onClick={() => router.push(`/settings/finance/wallet/${row.id}`)}
                      disabled={props.loading}
                    /> */}

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
              {row.panel ? 'Em uso' : '-'}
            </TCell>
          </TRow>
        ))
      }
    </BaseTable>
  )
}
