interface Props {
  children: React.ReactNode
}

export const LayoutContent = ({ children }: Props) => {
  return <>
    <div className="app-layout_internal-content">
      {children}
    </div>
  </>
}
