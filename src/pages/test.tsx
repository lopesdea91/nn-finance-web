import { Icon, Input } from '@/@core/presentation/shared/ui';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import moment from 'moment'

const test = () => {
  const [period, setPeriod] = useState<string>('2023-05')

  const currentDate = new Date(`${period}-15`)
  const currentMonth = Number(currentDate.getMonth() + 1)
  const currentyear = Number(currentDate.getFullYear())

  // console.group('render')
  // console.log('... currentDate', currentDate);
  // console.log('... currentMonth', currentMonth);
  // console.log('... currentyear', currentyear);
  // console.groupEnd()

  function PreviewMonth() {
    setPeriod(moment(`${period}-15`).subtract(1, 'month').format('YYYY-MM'))
  }

  function NextMonth() {
    setPeriod(moment(`${period}-15`).add(1, 'month').format('YYYY-MM'))
  }

  function mostartNovoPeriod(val: string) {
    console.log(val)
    setPeriod(val)
  }


  // React.useEffect(() => {
  //   console.log('... period', period);
  // }, [period])

  return (
    <>
      <p>period: {period}</p>
      <div className='flex gap-1 items-center justify-around p-1 border-[1px] bg-gray-100 rounded'>
        <button
          className='flex text-xs text-zinc-600 duration-300 hover:text-zinc-800 hover:bg-black/10 p-2 rounded'
          onClick={PreviewMonth}
        >
          <Icon icon={faChevronLeft} className='text-xs m-auto' />
        </button>

        {/* <label htmlFor="system-period" className='px-0 py-0 border-none rounded-none bg-transparent text-sm text-zinc-800'
        onClick={() => {
          inputRef.current?.focus() //?.focus()
        }}>
        01/2023
      </label> */}
        <Input
          // ref={inputRef}
          type='month'
          className='px-0 py-0 border-none rounded-none bg-transparent text-sm text-zinc-800'
          defaultValue={period}
          onChange={e => mostartNovoPeriod(e.target.value)}
        />


        <button
          className='flex text-xs text-zinc-600 duration-300 hover:text-zinc-800 hover:bg-black/10 p-2 rounded'
          onClick={NextMonth}
        >
          <Icon icon={faChevronRight} className='text-xs m-auto' />
        </button>
      </div>
    </>
  )
}

export default test


function formatMonth(value: Date) {
  //   console.log('... value', value);

  //   const a = value.getMonth()
  //   const b = +value.getMonth() + 1

  //   console.log('... a', a);
  //   console.log('... b', b);


  const year = value.getFullYear()
  let month = (+value.getMonth()) > 9
    ? String(value.getMonth())
    : String(value.getMonth()).padStart(2, '0')

  console.log('... n', value.getMonth());
  console.log('... +n', +value.getMonth());
  console.log('... +n >= 9', +value.getMonth() >= 9);
  console.log(`... padStart(2, '0')`, String(value.getMonth()).padStart(2, '0'));


  // console.log('... formatMonth year', year);
  // console.log('... formatMonth month', month);

  return `${year}-${month}`
}