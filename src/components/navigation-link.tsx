'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface NavigationLinkProps {
  href: string
  label: string
  icon: React.ReactNode
  shortcutNumber?: number
}

export function NavigationLink({ href, label, icon, shortcutNumber }: NavigationLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center justify-between rounded-md px-2 py-1.5 text-sm',
        isActive ? 'bg-black text-white' : 'hover:bg-gray-100'
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      {shortcutNumber && (
        <span
          className={cn(
            'hidden h-5 w-5 place-content-center rounded-md bg-gray-100 text-xs font-medium text-gray-500 group-hover:bg-gray-200 lg:grid',
            isActive && 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
          )}
        >
          {shortcutNumber}
        </span>
      )}
    </Link>
  )
}
