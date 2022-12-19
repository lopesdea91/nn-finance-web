import React from 'react'
import Table from 'react-bootstrap/Table';
import { useRouter } from 'next/router';
import { FinanceWallet } from '@/types/entities/FinanceWallet'
import { AppIcon } from '../base';

type Props = {
  items: FinanceWallet[]
}
export const FinanceWalletListTable = ({ items }: Props) => {
  const router = useRouter()

  return (
    <div>
      <Table size="sm">
        <thead>
          <tr className='bg-secondary text-white'>
            <th className='text-center'>#</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Painel</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={`${item.description}-${i}`}>
              <td width="40">
                <div
                  className="d-flex align-items-center justify-content-center cursor-pointer"
                  style={{ height: '24px' }}
                  onClick={() => router.push(`/settings/finance/wallet/${item.id}`)}
                >
                  <AppIcon variant='edit' />
                </div>
              </td>
              <td>
                <span title={`${item.id} | ${item.description}`}>{item.description}</span>
              </td>
              <td>{item.enable ? 'Ativa' : 'Inativa'}</td>
              <td>{item.panel ? 'Painel' : ''}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
