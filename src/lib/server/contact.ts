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

export async function updateContact(id: number, name: string, email: string, phone: string, company_id: number) {
  await prisma.contact.update({
    where: { id: id },
    data: { 
      name,
      email,
      phone,
      company_id
    },
  });
}

export async function addContact(user: UserType, name: string, email: string, phone: string, company_id: number) {
  await prisma.contact.create({
    data: {
      name,
      email,
      phone,
      company_id
    },
  });
}
