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
        ' min-h-screen flex items-center justify-center mx-auto w-full max-w-screen-lg px-2.5 py-2.5 md:px-20',
        className
      )}>
        {children}
      
    </div>
  )
}

export default CenterWidthWrapper
