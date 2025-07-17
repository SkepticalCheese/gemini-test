'use server'

import prisma from '@/lib/server/prisma';
import { UserType } from '@/lib/server/user';

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

export async function getCompanyList(user: UserType) {
  const companies = await prisma.company.findMany({
    where: {
      tenant_id: user?.tenant_id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return companies;
}

export async function updateCompany(id: number, name: string) {
  if (!name || !name.trim()) {
    throw new Error('Company name cannot be empty');
  }
  await prisma.company.update({
    where: { id: id },
    data: { name },
  });
}

export async function addCompany(user: UserType, name: string) {
  if (!name || !name.trim()) {
    throw new Error('Company name cannot be empty');
  }
  await prisma.company.create({
    data: {
      name,
      tenant_id: user?.tenant_id || 0,
    },
  });
}

export async function deleteCompany(id: number) {
  await prisma.company.delete({
    where: { id: id },
  });
}
