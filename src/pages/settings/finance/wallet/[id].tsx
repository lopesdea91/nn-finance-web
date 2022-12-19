import { useMemo, useRef } from "react"
import { useRouter } from "next/router"
import { AppButtonGroup, AppButton, AppIcon } from "@/components/base"
import { FinanceWalletForm } from "@/components/form/FinanceWalletForm"
import { LayoutContentTitle } from "@/components/layout/internal/LayoutContentTitle"

const Page = () => {
  const route = useRouter()
  const childRef = useRef<{ submit: () => void, delete: () => void, resetForm: () => void, clearForm: () => void }>();

  const currentId = useMemo<number | null>(() => {
    const id = Number(route.query.id)
    const hasId = Number.isInteger(id)
    return hasId ? id : null
  }, [])

  return (
    <div className="page bg-white border-bottom p-2 rounded shadow-sm">
      <LayoutContentTitle
        text="Carteira"
        endContent={(
          <AppButtonGroup className="nino">
            <AppButton type="submit" className="px-3" onClick={() => childRef.current?.submit()}>
              <AppIcon variant="save" />
            </AppButton>

            {currentId && (
              <>
                <AppButton type="button" className="px-3" onClick={() => childRef.current?.delete()} variant="outline-danger">
                  <AppIcon variant="remove" />
                </AppButton>

                <AppButton type="button" className="px-3" onClick={() => childRef.current?.resetForm()}>
                  <AppIcon variant="reset" />
                </AppButton>

                <AppButton type="button" className="px-3" onClick={() => childRef.current?.clearForm()}>
                  <AppIcon variant="clean" />
                </AppButton>
              </>
            )}
          </AppButtonGroup>
        )}
      />

      <FinanceWalletForm ref={childRef} />
    </div>
  )
}

export default Page