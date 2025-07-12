import { auth0 } from '@/lib/auth0';
import { getUser } from '@/lib/server/user';
import { getCompanies } from '@/lib/server/company';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function Companies() {
  const session = await auth0.getSession();
  const user = await getUser(session);

  if (!session || !user) {
    return (
      <main>
        <a href="/auth/login">Log in</a>
      </main>
    );
  }

  const companies = await getCompanies(user);

  return (
    <main className="flex min-h-screen flex-col justify-start p-24">
      <h1 className="mb-8 text-4xl font-bold">Companies</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Contacts Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{new Date(company.createdAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell>
              <TableCell>{company.contactCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
