import { Widget } from '@/@core/presentation/shared/components'
import { Card } from '@/@core/presentation/shared/pages/dashboard/Card'
import React, { FC } from 'react'

interface InvestmentBalanceProps { }
export const InvestmentBalance: FC<InvestmentBalanceProps> = ({ }) => {
  return (
    <Widget.Root className='h-[240px] flex flex-col justify-around'>
      <Card.Root className="border-b-[1px] border-zinc-300 bg-red-400a">
        <Card.Title className="text-center">Total Atual</Card.Title>
        <Card.Value className="text-center">11.922,95</Card.Value>
      </Card.Root>

      <Card.Root className="border-b-[1px] border-zinc-300 bg-red-400a">
        <Card.Title className="text-center">Rendimentos</Card.Title>
        <Card.Value className="text-center">11.922,95</Card.Value>
      </Card.Root>

      <Card.Root className="bg-red-400a">
        <Card.Title className="text-center">Dividendos</Card.Title>
        <Card.Value className="text-center">11.922,95</Card.Value>
      </Card.Root>
    </Widget.Root>
  )
}
