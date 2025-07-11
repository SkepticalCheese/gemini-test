import Link from 'next/link'

import { NavigationLink } from '@/components/navigation-link'
import { LINKS } from '@/lib/constants'
import { auth0 } from '@/lib/auth0'

export const MenuContent = async() => {
  const session = await auth0.getSession();
  return (
  <div className="flex w-full flex-col text-sm">
    <div className="flex flex-col gap-4">
      <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight">{session?.user.name}</span>
        </div>
      </Link>
      <div className="flex flex-col gap-1">
        {LINKS.map((link, linkIndex) => (
          <NavigationLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            shortcutNumber={linkIndex + 1}
          />
        ))}
      </div>
    </div>
    <hr />
    {/* <div className="flex flex-col gap-2 text-sm">
      <span className="px-2 text-xs leading-relaxed font-medium text-gray-600">Online</span>
      <div className="flex flex-col gap-1">
        {Object.values(PROFILES).map((profile) => (
          <NavigationLink key={profile.url} href={profile.url} label={profile.title} icon={profile.icon} />
        ))}
      </div>
    </div> */}
  </div>
  );
}
