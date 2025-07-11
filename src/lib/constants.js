
import { HomeIcon, UserIcon, LogOutIcon } from 'lucide-react'

export const LINKS = [
  {
    href: '/',
    label: 'Home',
    icon: <HomeIcon size={16} />
  },
  {
    href: '/welcome',
    label: 'Welcome',
    icon: <UserIcon size={16} />
  },
 {
    href: '/auth/logout',
    label: 'Log out',
    icon: <LogOutIcon size={16} />
  }
]
