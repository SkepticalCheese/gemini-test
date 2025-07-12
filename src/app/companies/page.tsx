import { auth0 } from '@/lib/auth0';
import { getUser } from '@/lib/server/user';
import { getCompanies } from '@/lib/server/company';
import { Companies } from '@/components/companies';

export default async function CompaniesPage() {
  const session = await auth0.getSession();
  const user = await getUser(session);
  const companies = await getCompanies(user);

  return <Companies companies={companies} user={user} />;
}