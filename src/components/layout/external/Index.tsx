interface Props {
  children: React.ReactNode
}
export const LayoutExternal = ({ children }: Props) => {
  return (
    <div className="app-layout bg-light vh-100 vw-100 d-flex align-items-center justify-content-center">
      {children}
    </div>
  )
}
