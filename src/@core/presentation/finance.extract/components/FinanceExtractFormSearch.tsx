import React from 'react'
import styled from 'styled-components'
import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect, AppSwitch } from '@/components/base'
import { Enable, FinanceExtractTypePreveiw, FinanceStatusId, FinanceTypeId } from '@/types/enum'
import { FinanceExtractFormSearchFields } from '@/types/form/financeExtract'
import { $utils } from '@/utils'
import { FinanceStore, SystemStore } from '@/store/hook'
import { FormSearchResponsive } from '@/components'

interface Props {
  getItems: () => Promise<void>
  search: FinanceExtractFormSearchFields
  onChangeSearch: (value: Partial<FinanceExtractFormSearchFields>) => void
  resetSearch: () => void
}
export const FinanceExtractFormSearch = (props: Props) => {
  const systemStore = SystemStore()
  const financeStore = FinanceStore()

  const formSearchRef = React.createRef<{ close: () => void }>();

  const optionsTag = props.search.type_id
    ? financeStore.state.tag.filter(el => el.type.id === props.search.type_id)
    : financeStore.state.tag

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.getItems()
    formSearchRef.current?.close()
  }

  return (
    <FormSearchResponsive ref={formSearchRef}>
      <AppForm onSubmit={handleSubmit}>
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
              disabled={systemStore.state.loading}
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
              disabled={systemStore.state.loading}
              optionEmpty
            />
          </AppColumn>

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
              disabled={systemStore.state.loading}
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
              disabled={systemStore.state.loading}
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
              options={financeStore.state.origin.map($utils.parseItemToOption)}
              disabled={systemStore.state.loading}
              optionEmpty
            />
          </AppColumn>

          {/* <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Status * /}
            <AppSelect
              label='Status'
              value={props.search.enable || ''}
              onChange={(e) => {
                props.onChangeSearch({
                  page: 1,
                  enable: e.target.value as Enable,
                  type_preveiw: e.target.value === '1' ? 'extract' : 'moviment'
                })
              }}
              options={[
                { id: '1', description: 'Ativo' },
                { id: '0', description: 'Inativo' },
              ]}
              disabled={systemStore.state.loading}
              optionEmpty
            />
          </AppColumn> */}

          <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Pesquisar */}
            <AppInput
              labelProps={{
                label: 'Pesquisar'
              }}
              inputProps={{
                value: props.search._q || '',
                onChange: (e) => {
                  props.onChangeSearch({
                    page: 1,
                    _q: e.target.value,
                  })
                },
                disabled: systemStore.state.loading
              }}
            />
          </AppColumn>
        </AppColumns>

        <Footer>
          <AppButtonGroup>
            <AppButton type="submit" >
              <AppIcon variant='search' />
            </AppButton>

            <AppButton type="button" onClick={() => props.resetSearch()}>
              <AppIcon variant='reset' />
            </AppButton>

          </AppButtonGroup>

          <AppSwitch
            label="Status"
            value={props.search.enable == 1}
            onChange={(e: unknown) => {
              props.onChangeSearch({
                page: 1,
                enable: e as Enable,
                type_preveiw: e == 1 ? 'extract' : 'moviment'
              })
            }}
            labelPlacement="end"
          />
        </Footer>
      </AppForm>
    </FormSearchResponsive>
  )
}

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`