import { SelectMultiOptionData } from '@/types/enum';
import { cssMerge } from '@/utils'
import React, { forwardRef, useId } from 'react'
import AsyncSelect from 'react-select/async';
import { ActionMeta, MultiValue } from 'react-select/dist/declarations/src';


interface SelectMultiAsyncProps {
  label?: string
  error?: string
  className?: string
  wrapper?: {
    className?: string
  }
  apiGateway: Function
  disabled?: HTMLSelectElement['disabled']
  placeholder?: HTMLSelectElement['ariaPlaceholder']
  value: SelectMultiOptionData[] | undefined
  onChange: (p: SelectMultiOptionData[]) => void
}
export const SelectMultiAsync = forwardRef<HTMLSelectElement, SelectMultiAsyncProps>(($props, ref) => {
  const { label, error, className, wrapper, apiGateway, onChange, ...props } = $props
  const currentId = useId()

  const promiseOptions = async (inputValue: string) => {
    const { data } = await apiGateway({ query: inputValue })
    return data.map((el: { id: number, description: string }) => ({ value: el.id, label: el.description }))
  }

  function onChangeLocal(newValue: MultiValue<{ value: number, label: string }>, actionMeta: ActionMeta<{ value: number, label: string }>) {
    onChange(newValue.map(el => ({
      id: el.value,
      label: el.label
    })))
  }

  return (
    <div className={cssMerge(
      'w-full',
      wrapper?.className
    )}>
      {label && <label
        htmlFor={currentId}
        className="block text-xs text-gray-800 dark:text-white/50">
        {label}
      </label>
      }

      <AsyncSelect
        id={currentId}
        classNamePrefix="react-select"
        className={className}
        isMulti
        isClearable // mostra o X para limpar
        isSearchable // permite fazer pesquisa
        // closeMenuOnSelect={false}
        // options={options}
        defaultOptions
        cacheOptions
        loadOptions={promiseOptions}
        {...props}
        value={props.value?.map(e => ({ value: e.id, label: e.label }))}
        onChange={onChangeLocal}
        components={{ DropdownIndicator: null }}
      />

      {error && <span
        className='block truncate text-sm font-semibold text-red-800 dark:text-red-600'>
        {error}
      </span>}
    </div>
  )
})

SelectMultiAsync.displayName = 'Select'