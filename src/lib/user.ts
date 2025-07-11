import prisma from '@/lib/prisma';
import { SessionData } from '@auth0/nextjs-auth0/types';

export async function getUserName(session: SessionData | null) {
  if (!session?.user?.sub) {
    return session?.user.name;
  }

  const user = await prisma.user.findUnique({
    where: {
      auth0_id: session.user.sub,
    },
    select: {
      name: true,
    },
  });

  return user?.name || session.user.name;
}
