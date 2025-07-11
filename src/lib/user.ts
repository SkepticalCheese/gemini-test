import prisma from '@/lib/prisma';
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
