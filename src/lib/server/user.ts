'use server'

import prisma from '@/lib/server/prisma';
import { SessionData } from '@auth0/nextjs-auth0/types';

export async function getUser(session: SessionData | null) {
  if (!session?.user?.sub) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      auth0_id: session.user.sub,
    },
    select: {
      name: true,
      tenant_id: true,
    },
  });

  return user;
}

export type UserType = Awaited<ReturnType<typeof getUser>>;
