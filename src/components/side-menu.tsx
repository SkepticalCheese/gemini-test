'use client'

import { useMemo } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export const SideMenu = ({ children, className }: { children: React.ReactNode, className?: string }) => {

  const memoizedScrollArea = useMemo(
    () => (
      <ScrollArea
        className={cn(
          'hidden bg-zinc-50 lg:flex lg:flex-col lg:border-r lg:w-60 xl:w-72',
          className
        )}
      >
        <div className="bg-zinc-50 p-3">{children}</div>
      </ScrollArea>
    ),
    [children, className]
  )

  return memoizedScrollArea
}
