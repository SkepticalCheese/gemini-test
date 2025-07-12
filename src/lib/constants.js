
import { HomeIcon, UserIcon, LogOutIcon, ContactIcon } from 'lucide-react'

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
    href: '/contacts',
    label: 'Contacts',
    icon: <ContactIcon size={16} />
  },
 {
    href: '/auth/logout',
    label: 'Log out',
    icon: <LogOutIcon size={16} />
  }
]
