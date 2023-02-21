import React, { useEffect } from 'react'
import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect } from '../base'
import { useStoreFinance, useStoreFinanceExtractSearch } from '@/hooks/useStoreFinance'
import { Enable, FinanceExtractTypePreveiw, FinanceStatusId, FinanceTypeId } from '@/types/enum'
import { FinanceExtractFormSearchFields } from '@/types/form/financeExtract'
import { $ } from '@/utils'
import { useStoreSystem } from '@/hooks/useStoreSystem'

interface Props {
  loading: boolean
  getItems: (s: Partial<FinanceExtractFormSearchFields>) => Promise<void>
}

export const FinanceExtractFormSearch = (props: Props) => {
  const { financeState } = useStoreFinance()
  const { systemState } = useStoreSystem()
  const { extractSearch, onChangeSearch, resetExtractSearch } = useStoreFinanceExtractSearch()

  function onSubmit() {
    props.getItems(extractSearch)
  }

  const optionsTag = extractSearch.type_id
    ? financeState.tag.filter(el => el.type.id === extractSearch.type_id)
    : financeState.tag

  useEffect(() => {
    onChangeSearch({
      period: systemState.period,
      wallet_id: systemState.walletPanelId
    })
  }, [])

  return (
    <AppForm onSubmit={onSubmit}>
      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Tipo de extrato */}
          <AppSelect
            label='Tipo de extrato'
            value={String(extractSearch.type_preveiw)}
            onChange={(e) => {
              onChangeSearch({
                page: 1,
                type_preveiw: e.target.value as FinanceExtractTypePreveiw
              })
            }}
            options={[
              { id: 'extract', description: 'Extrato' },
              { id: 'historic', description: 'Histórico' },
              { id: 'moviment', description: 'Movimentação' },
            ]}
            disabled={props.loading}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Tipo */}
          <AppSelect
            label='Tipo'
            value={extractSearch.type_id || ''}
            onChange={(e) => {
              onChangeSearch({
                page: 1,
                type_id: Number(e.target.value) as FinanceTypeId
              })
            }}
            options={[
              { id: '1', description: 'Receita' },
              { id: '2', description: 'Despesa' },
            ]}
            disabled={props.loading}
            optionEmpty
          />
        </AppColumn>

        {/* SELECT TAG */}
        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Tag */}
          <AppSelect
            label='Tag'
            value={extractSearch.tag_ids || []}
            onChange={(e) => {
              onChangeSearch({
                page: 1,
                tag_ids: e.target.value as number[]
              })
            }}
            options={optionsTag.map($.parseItemToOption)}
            disabled={props.loading}
            multiple
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Situação */}
          <AppSelect
            label='Situação'
            value={extractSearch.status_id || ''}
            onChange={(e) => {
              onChangeSearch({
                page: 1,
                status_id: e.target.value as FinanceStatusId
              })
            }}
            options={[
              { id: '1', description: 'Ok' },
              { id: '2', description: 'Pendente' },
              { id: '3', description: 'Talvez' },
            ]}
            disabled={props.loading}
            optionEmpty
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Origem */}
          <AppSelect
            label='Origem'
            value={extractSearch.origin_id || ''}
            onChange={(e) => {
              onChangeSearch({
                origin_id: Number(e.target.value)
              })
            }}
            options={financeState.origin.map($.parseItemToOption)}
            disabled={props.loading}
            optionEmpty
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Status */}
          <AppSelect
            label='Status'
            value={extractSearch.enable || ''}
            onChange={(e) => {
              onChangeSearch({
                page: 1,
                enable: e.target.value as Enable
              })
            }}
            options={[
              { id: '1', description: 'Ativo' },
              { id: '0', description: 'Inativo' },
            ]}
            disabled={props.loading}
            optionEmpty
          />
        </AppColumn>
      </AppColumns>

      <AppColumns>
        <AppColumn xs={12} sm={4} md={3} lg={2}> {/* Pesquisar */}
          <AppInput
            label='Pesquisar'
            value={extractSearch._q || ''}
            onChange={(e) => {
              onChangeSearch({
                page: 1,
                _q: e.target.value,
              })
            }}
            disabled={props.loading}
          />
        </AppColumn>
      </AppColumns>

      <AppButtonGroup>
        <AppButton type="submit" >
          <AppIcon variant='search' />
        </AppButton>

        <AppButton type="button" onClick={() => {
          resetExtractSearch()
        }} >
          <AppIcon variant='reset' />
        </AppButton>
      </AppButtonGroup>
    </AppForm>
  )
}
