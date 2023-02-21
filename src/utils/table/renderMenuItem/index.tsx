import { Enable } from "@/types/enum"

export const renderMenuItemFinanceEnable = (enableId: Enable, enable: Enable, content: React.ReactNode) => {
  return enableId == enable ? null : content
}

export const renderMenuItemFinanceStatus = (statusId: number, ids: number[], content: React.ReactNode) => {
  return !ids.includes(statusId) ? null : content
}