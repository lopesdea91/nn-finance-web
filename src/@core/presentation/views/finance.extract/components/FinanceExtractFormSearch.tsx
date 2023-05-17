import { useMemo, createRef } from 'react'
import styled from 'styled-components'
import { AppButton, AppButtonGroup, AppColumn, AppColumns, AppForm, AppIcon, AppInput, AppSelect, AppSwitch, FormSearchResponsive } from '@/@core/presentation/shared'
import { Enable, FinanceExtractTypePreveiw, FinanceStatusId, FinanceTypeId } from '@/types/enum'
import { FinanceStore, PageFinanceExtractStore, SystemStore } from '@/store/hook'
import { $utils } from '@/utils'
import { FinanceExtractMethods } from '../index.methods'

export const FinanceExtractFormSearch = () => {
  const { getItems, onChangeSearch, resetSearch, onChangePage } = FinanceExtractMethods()

  const systemStore = SystemStore()
  const financeStore = FinanceStore()
  const pageFinanceExtractStore = PageFinanceExtractStore()

  const formSearchRef = createRef<{ close: () => void }>();

  const optionsTag = useMemo(() => {
    return pageFinanceExtractStore.state.formSearch.type_id
      ? financeStore.state.tag.filter(el => el.type.id === pageFinanceExtractStore.state.formSearch.type_id)
      : financeStore.state.tag
  }, [pageFinanceExtractStore.state.formSearch.type_id])

  const handleSubmit = ((e: React.FormEvent) => {
    e.preventDefault()
    getItems()
    formSearchRef.current?.close()
  })

  return (
    <FormSearchResponsive ref={formSearchRef}>
      <AppForm onSubmit={handleSubmit}>
        <AppColumns>
          <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Tipo de extrato */}
            <AppSelect
              label='Tipo de extrato'
              value={String(pageFinanceExtractStore.state.formSearch.type_preveiw)}
              onChange={(e) => {
                onChangePage(1)
                onChangeSearch({
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
              value={pageFinanceExtractStore.state.formSearch.type_id || ''}
              onChange={(e) => {
                onChangePage(1)
                onChangeSearch({
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
              value={pageFinanceExtractStore.state.formSearch.tag_ids || []}
              onChange={(e) => {
                onChangePage(1)
                onChangeSearch({
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
              value={pageFinanceExtractStore.state.formSearch.status_id || ''}
              onChange={(e) => {
                onChangePage(1)
                onChangeSearch({
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
              value={pageFinanceExtractStore.state.formSearch.origin_id || ''}
              onChange={(e) => {
                onChangePage(1)
                onChangeSearch({
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
              value={pageFinanceExtractStore.state.formSearch.enable || ''}
              onChange={(e) => {
                onChangeSearch({
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
                value: pageFinanceExtractStore.state.formSearch.query || '',
                onChange: (e) => {
                  onChangePage(1)
                  onChangeSearch({
                    query: e.target.value,
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

            <AppButton type="button" onClick={() => resetSearch()}>
              <AppIcon variant='reset' />
            </AppButton>

          </AppButtonGroup>

          <AppSwitch
            label="Status"
            value={pageFinanceExtractStore.state.formSearch.enable == 1}
            onChange={(e: unknown) => {
              onChangePage(1)
              onChangeSearch({
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