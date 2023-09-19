import { cssMerge } from "@/utils"
import { FC, ReactNode } from "react"

interface GridItemProps {
  children: ReactNode
  className?: string
}

const GridItem: FC<GridItemProps> = ({ children, className }) => {
  return (
    <div data-testid="grid-item" className={cssMerge("grid", className)}>
      {children}
    </div>
  )
}

export default GridItem
