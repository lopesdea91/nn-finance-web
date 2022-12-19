import useLayoutStore from "@/hooks/useLayoutStore"

export const LayoutLoading = () => {
  const { state } = useLayoutStore()

  return (
    <div className={`app-layout_internal-loading position-absolute ${state.loading && '--active'} border top-0 start-0 end-0 h-100 d-flex align-items-center justify-content-center shadow-sm`}>
      <div className="spinner-border p-3" role="status"></div>
    </div>
  )
}