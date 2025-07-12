import { auth0 } from '@/lib/auth0';
import { getUser } from '@/lib/server/user';
import { getContacts } from '@/lib/server/contact';
import { getCompanyList } from '@/lib/server/company';
import { Contacts } from '@/components/contacts';

export default async function ContactsPage() {
  const session = await auth0.getSession();
  const user = await getUser(session);
  const contacts = await getContacts(user);
  const companies = await getCompanyList(user);

  return <Contacts contacts={contacts} companies={companies} user={user} />;
}
