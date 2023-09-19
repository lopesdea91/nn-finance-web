import { cssMerge } from "@/utils"

interface ContainerRootProps {
  children: React.ReactNode
  className?: string
}
export const ContainerRoot: React.FC<ContainerRootProps> = ({
  children,
  className
}) => {
  return (
    <div
      data-testid="partial-container"
      className={cssMerge(
        'h-screen w-screen text-neutral-600 dark:text-neutral-400 bg-zinc-100 dark:bg-zinc-900 overflow-y-scroll',
        className
      )}>
      {children}
    </div>
  )
}
