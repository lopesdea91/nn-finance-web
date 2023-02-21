import { FinanceItemRepeat } from "../entities/finance-item"
import { FinanceTagShort } from "../entities/finance-tag"
import { Enable, FinanceStatusId, FinanceTypeId } from "../enum"

// form
export interface FinanceItemFormFields {
  id: number | null
  value: number
  date: string
  sort: number
  enable: Enable
  obs?: string
  origin_id: number | null
  status_id: FinanceStatusId
  tag_ids: FinanceTagShort[]
  type_id: FinanceTypeId
  wallet_id: number | null
}
export interface FinanceItemFormFieldsPost {
  value: number
  date: string
  sort: number
  enable: Enable
  obs: string
  origin_id: number
  status_id: FinanceStatusId
  tag_ids: number[]
  type_id: FinanceTypeId
  wallet_id: number
  repeat: FinanceItemRepeat
}
export interface FinanceItemFormFieldsPut {
  value: number
  date: string
  sort: number
  enable: Enable
  obs: string
  origin_id: number
  status_id: FinanceStatusId
  tag_ids: number[]
  type_id: FinanceTypeId
  wallet_id: number
  repeat: FinanceItemRepeat
}