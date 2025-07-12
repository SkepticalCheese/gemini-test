'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface NavigationLinkProps {
  href: string
  label: string
  icon: React.ReactNode
}

export function NavigationLink({ href, label, icon }: NavigationLinkProps) {
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
      </Link>
  )
}
