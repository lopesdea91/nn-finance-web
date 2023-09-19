import { SelectMultiOptionData } from '@/types/enum';
import { cssMerge } from '@/utils'
import React, { forwardRef, useId } from 'react'
import Select, { OnChangeValue } from 'react-select';
import { ActionMeta, MultiValue } from 'react-select/dist/declarations/src';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';


interface SelectMultiProps {
  label?: string
  error?: string
  className?: string
  wrapper?: {
    className?: string
  }
  disabled?: HTMLSelectElement['disabled']
  placeholder?: HTMLSelectElement['ariaPlaceholder']
  value: SelectMultiOptionData[]
  onChange: (p: SelectMultiOptionData[]) => void
  options: SelectMultiOptionData[]
  // filterOptions?: <T>(option: FilterOptionOption<T>, inputValue: string) => boolean
}

export const colourOptions: readonly { value: string, label: string }[] = [
  { value: 'Ocean', label: 'Ocean' },
  { value: 'Blue', label: 'Blue' },
  { value: 'Purple', label: 'Purple' },
  { value: 'Red', label: 'Red' },
  { value: 'Orange', label: 'Orange' },
  { value: 'Yellow', label: 'Yellow' },
  { value: 'Green', label: 'Green' },
  { value: 'Forest', label: 'Forest' },
  { value: 'Slate', label: 'Slate' },
  { value: 'Silver', label: 'Silver' }
];

export const SelectMulti = forwardRef<HTMLSelectElement, SelectMultiProps>(($props, ref) => {
  const { label, error, className, wrapper, onChange, options, value, ...props } = $props
  const currentId = useId()

  const [optionsSelected, setOptionsSelected] = React.useState<readonly { value: string, label: string }[]>([]);

  function onChangeLocal(newValue: OnChangeValue<{ value: string, label: string }, true>) {
    setOptionsSelected(newValue)

    onChange(newValue.map(el => ({ id: Number(el.value), label: String(el.label) })))
  }

  React.useEffect(() => {
    setOptionsSelected(value.map(e => ({ value: String(e.id), label: String(e.label) })))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (value.length === 0 && optionsSelected.length > 0) {
      setOptionsSelected([])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])


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

      <Select
        // id={currentId}
        // classNamePrefix="react-select"
        // isMulti
        isMulti
        options={options.map(e => ({ value: String(e.id), label: String(e.label) }))}
        value={optionsSelected}
        onChange={onChangeLocal}
        // isClearable // mostra o X para limpar
        // isSearchable // permite fazer pesquisa
        isDisabled={props.disabled}
        {...props}
        // value={props.value?.map(e => ({ value: e.id, label: e.label }))}
        // value={props.value?.map(e => ({
        //   value: e.id,
        //   label: e.label
        // }))}
        // onChange={onChangeLocal}
        components={{ DropdownIndicator: null }}
      />

      {error && <span
        className='block truncate text-sm font-semibold text-red-800 dark:text-red-600'>
        {error}
      </span>}
    </div>
  )
})

SelectMulti.displayName = 'SelectMulti'