import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn(
        'min-h-full mx-auto w-full max-w-screen-xl p-3 md:px-20',
        className
      )}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
