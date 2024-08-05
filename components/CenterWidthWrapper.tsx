import { cn } from '@/app/lib/utils'
import { ReactNode } from 'react'

const CenterWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
    className={cn(
      ' min-h-[85vh] p-2.5 flex items-center justify-center max-w-screen-md mx-auto md:px-20 ',
      className
    )}>
        {children}
      
    </div>
  )
}

export default CenterWidthWrapper
