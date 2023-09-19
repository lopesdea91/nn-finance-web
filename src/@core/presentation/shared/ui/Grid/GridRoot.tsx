import { cssMerge } from "@/utils"
import { FC, ReactNode } from "react"

interface GridRootProps {
  children: ReactNode
  className?: string
}

const GridRoot: FC<GridRootProps> = ({ children, className }) => {
  return (
    <div data-testid="grid-root" className={cssMerge('grid', className)}>
      {children}
    </div>
  )
}

export default GridRoot
