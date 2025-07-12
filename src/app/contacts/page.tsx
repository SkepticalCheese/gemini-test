import { auth0 } from '@/lib/auth0';
import { getUser } from '@/lib/user';
import prisma from '@/lib/prisma';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function Contacts() {
  const session = await auth0.getSession();
  const user = await getUser(session);

  if (!session || !user) {
    return (
      <main>
        <a href="/auth/login">Log in</a>
      </main>
    );
  }

  const contacts = await prisma.contact.findMany({
    where: {
      company: {
        tenant_id: user.tenant_id,
      },
    },
    include: {
      company: true,
    },
  });

  return (
    <main className="flex min-h-screen flex-col justify-start p-24">
      <h1 className="mb-8 text-4xl font-bold">Contacts</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.company.name}</TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
