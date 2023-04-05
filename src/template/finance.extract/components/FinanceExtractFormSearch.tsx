import React from 'react'
import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect } from '@/components/base'
import { Enable, FinanceExtractTypePreveiw, FinanceStatusId, FinanceTypeId } from '@/types/enum'
import { FinanceExtractFormSearchFields } from '@/types/form/financeExtract'
import { $utils } from '@/utils'
import { useAppSelector } from '@/store/hook'

interface Props {
  getItems: () => Promise<void>
  search: FinanceExtractFormSearchFields
  onChangeSearch: (value: Partial<FinanceExtractFormSearchFields>) => void
  resetSearch: () => void
}

export const FinanceExtractFormSearch = (props: Props) => {
  const { financeState, systemState } = useAppSelector(e => ({
    financeState: e.finance,
    systemState: e.system
  }))

  const optionsTag = props.search.type_id
    ? financeState.tag.filter(el => el.type.id === props.search.type_id)
    : financeState.tag

  return (
    <AppForm onSubmit={() => props.getItems()}>
      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Tipo de extrato */}
          <AppSelect
            label='Tipo de extrato'
            value={String(props.search.type_preveiw)}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                type_preveiw: e.target.value as FinanceExtractTypePreveiw
              })
            }}
            options={[
              { id: 'extract', description: 'Extrato' },
              { id: 'historic', description: 'Histórico' },
              { id: 'moviment', description: 'Movimentação' },
            ]}
            disabled={systemState.loading}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Tipo */}
          <AppSelect
            label='Tipo'
            value={props.search.type_id || ''}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                type_id: Number(e.target.value) as FinanceTypeId
              })
            }}
            options={[
              { id: '1', description: 'Receita' },
              { id: '2', description: 'Despesa' },
            ]}
            disabled={systemState.loading}
            optionEmpty
          />
        </AppColumn>

        {/* SELECT TAG */}
        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Tag */}
          <AppSelect
            label='Tag'
            value={props.search.tag_ids || []}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                tag_ids: e.target.value as number[]
              })
            }}
            options={optionsTag.map($utils.parseItemToOption)}
            disabled={systemState.loading}
            multiple
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Situação */}
          <AppSelect
            label='Situação'
            value={props.search.status_id || ''}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                status_id: e.target.value as FinanceStatusId
              })
            }}
            options={[
              { id: '1', description: 'Ok' },
              { id: '2', description: 'Pendente' },
              { id: '3', description: 'Talvez' },
            ]}
            disabled={systemState.loading}
            optionEmpty
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Origem */}
          <AppSelect
            label='Origem'
            value={props.search.origin_id || ''}
            onChange={(e) => {
              props.onChangeSearch({
                origin_id: Number(e.target.value)
              })
            }}
            options={financeState.origin.map($utils.parseItemToOption)}
            disabled={systemState.loading}
            optionEmpty
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Status */}
          <AppSelect
            label='Status'
            value={props.search.enable || ''}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                enable: e.target.value as Enable
              })
            }}
            options={[
              { id: '1', description: 'Ativo' },
              { id: '0', description: 'Inativo' },
            ]}
            disabled={systemState.loading}
            optionEmpty
          />
        </AppColumn>
      </AppColumns>

      <AppColumns>
        <AppColumn xs={12} sm={4} md={3} lg={2}> {/* Pesquisar */}
          <AppInput
            label='Pesquisar'
            value={props.search._q || ''}
            onChange={(e) => {
              props.onChangeSearch({
                page: 1,
                _q: e.target.value,
              })
            }}
            disabled={systemState.loading}
          />
        </AppColumn>
      </AppColumns>

      <AppButtonGroup>
        <AppButton type="submit" >
          <AppIcon variant='search' />
        </AppButton>

        <AppButton type="button" onClick={() => props.resetSearch()}>
          <AppIcon variant='reset' />
        </AppButton>
      </AppButtonGroup>
    </AppForm>
  )
}
