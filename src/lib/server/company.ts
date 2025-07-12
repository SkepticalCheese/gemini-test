'use server'

import { PrismaClient } from '@prisma/client';
import { UserType } from '@/lib/server/user';

const prisma = new PrismaClient();

export async function getCompanies(user: UserType) {
  const companies = await prisma.company.findMany({
    where: {
      tenant_id: user?.tenant_id,
    },
    include: {
      Contact: true, // Include contacts to count them
    },
  });

  return companies.map(company => ({
    id: company.id,
    name: company.name,
    createdAt: company.created_at,
    contactCount: company.Contact.length,
  }));
}

export async function updateCompany(id: number, name: string) {
  await prisma.company.update({
    where: { id: id },
    data: { name },
  });
}
