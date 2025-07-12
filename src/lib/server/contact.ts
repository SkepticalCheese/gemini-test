'use server'

import prisma from '@/lib/server/prisma';
import { UserType } from '@/lib/server/user';

export async function getContacts(user: UserType) {

  const contacts = await prisma.contact.findMany({
    where: {
      company: {
        tenant_id: user?.tenant_id,
      },
    },
    include: {
      company: true,
    },
  });

  return contacts;
}
