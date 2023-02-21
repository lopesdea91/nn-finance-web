import { useMediaQuery } from "@mui/material"
import { AppColumn, AppColumns, AppForm, AppInput, AppSelect, AppInputDate, AppText, AppRadio, AppSwitch } from "../base"
import { FieldError } from "@/hooks/useForm"
import { Enable, FinanceStatusId, FinanceTypeId } from "@/types/enum"
import { FinanceItemFormFields } from "@/types/form/financeItem"
import { useStoreFinance } from "@/hooks/useStoreFinance"
import { $ } from "@/utils"
import { SelectionTag } from "../SelectionTag"

interface Props {
  isLoading: boolean
  fields: FinanceItemFormFields
  errors: Partial<Record<keyof FinanceItemFormFields, FieldError>>
  onSubmit: () => void
  onChangeField: (partialFields: Partial<FinanceItemFormFields>) => void
}

export const FinanceItemForm = (props: Props) => {
  const { financeState } = useStoreFinance()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const tags = financeState.tag.filter(el => el.type.id === Number(props.fields.type_id)).map((el) => ({
    id: el.id,
    description: el.description,
    type_id: el.type.id,
  }))

  return (
    <AppForm onSubmit={props.onSubmit}>
      <AppColumns>
        <AppColumn> {/* Status */}
          <AppSwitch
            label="Status"
            value={!!props.fields.enable}
            onChange={(value) => {
              props.onChangeField({
                enable: Number(value) as Enable
              })
            }}
          />
        </AppColumn>

        <AppColumn> {/* Tipo */}
          <AppRadio
            value={String(props.fields.type_id)}
            options={financeState.type.map($.parseItemToOption)}
            onChange={(value) => {
              props.onChangeField({
                type_id: Number(value) as FinanceTypeId,
                tag_ids: []
              })
            }}
            disabled={!props.fields.enable}
          />
        </AppColumn>
      </AppColumns>

      <AppColumns>
        <AppColumn xs={6} sm={4} md={3} lg={2} hidden={!isDesktop}> {/* Carteira */}
          <AppSelect
            label='Carteira'
            value={String(props.fields.wallet_id)}
            onChange={(e) => {
              props.onChangeField({
                wallet_id: Number(e.target.value)
              })
            }}
            options={financeState.wallet.map($.parseItemToOption)}
            disabled={props.isLoading || !props.fields.enable}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/*  Origem */}
          <AppSelect
            label='Origem'
            value={props.fields.origin_id || ''}
            onChange={(e) => {
              props.onChangeField({
                origin_id: Number(e.target.value)
              })
            }}
            options={financeState.origin.map($.parseItemToOption)}
            disabled={props.isLoading || !props.fields.enable}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Situação */}
          <AppSelect
            label='Situação'
            value={String(props.fields.status_id)}
            onChange={(e) => {
              props.onChangeField({
                status_id: e.target.value as FinanceStatusId
              })
            }}
            options={financeState.status.map($.parseItemToOption)}
            disabled={props.isLoading || !props.fields.enable}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Valor */}
          <AppInput
            label='Valor'
            value={props.fields.value}
            type="number"
            inputProps={{
              step: 0.1
            }}
            onChange={(e) => {
              props.onChangeField({
                value: Number(e.target.value),
              })
            }}
            disabled={props.isLoading || !props.fields.enable}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Data */}
          <AppInputDate
            label="Data"
            value={props.fields.date}
            onChange={(value) => {
              props.onChangeField({
                date: value
              })
            }}
            disabled={props.isLoading || !props.fields.enable}
          />
        </AppColumn>

        <AppColumn xs={6} sm={4} md={3} lg={2}> {/* Ordenação */}
          <AppInput
            label='Ordenação'
            value={props.fields.sort}
            type="number"
            onChange={(e) => {
              props.onChangeField({
                sort: Number(e.target.value),
              })
            }}
            disabled={props.isLoading || !props.fields.enable}
          />
        </AppColumn>
      </AppColumns>

      <AppColumns>
        <AppColumn xs={12} sm={6} lg={8}> {/* Tag */}
          <SelectionTag
            tags={tags}
            value={props.fields.tag_ids}
            onChange={(value) => {
              props.onChangeField({
                tag_ids: value
              })
            }}
            disabled={props.isLoading || !props.fields.enable}
          />
        </AppColumn>

        <AppColumn xs={12} sm={6} lg={4}> {/* Obs */}
          <AppInput
            label='Obs'
            value={props.fields.obs}
            onChange={(e) => {
              props.onChangeField({
                obs: e.target.value,
              })
            }}
            disabled={props.isLoading || !props.fields.enable}
            multiline
            rows={4}
          />
        </AppColumn>
      </AppColumns>
    </AppForm>
  )
}