import { Widget } from '@/@core/presentation/shared/components'
import { Card } from '@/@core/presentation/shared/pages/dashboard/Card'
import React, { FC } from 'react'
import { useHomePageContext } from '../../HomePage.context';

interface FinanceBalanceProps { }

export const FinanceBalance: FC = () => {
  const pageContext = useHomePageContext()

  return (
    <Widget.Root className='h-[240px] flex flex-col justify-around'>
      <Card.Root className="border-b-[1px] border-zinc-300 bg-red-400a">
        <Card.Title className="text-center">Receita</Card.Title>
        <Card.Value className="text-center">{pageContext.finance.monthBalance.revenue}</Card.Value>
      </Card.Root>

      <Card.Root className="border-b-[1px] border-zinc-300 bg-red-400a">
        <Card.Title className="text-center">Despesas</Card.Title>
        <Card.Value className="text-center">{pageContext.finance.monthBalance.expense}</Card.Value>
      </Card.Root>

      <Card.Root className="bg-red-400a">
        <Card.Title className="text-center">Disponível</Card.Title>
        <Card.Value className="text-center">{pageContext.finance.monthBalance.available}</Card.Value>
      </Card.Root>
    </Widget.Root>
  )
}

