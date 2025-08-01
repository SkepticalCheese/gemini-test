'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteContact } from '@/lib/server/contact';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Plus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserType } from '@/lib/server/user';
import { ConfirmationDialog } from './ui/confirmation-dialog';
import { ContactFormDialog } from './contact-form-dialog';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    company_id: number;
    company: {
        name: string;
    };
}

interface Company {
    id: number;
    name: string;
}

interface ContactsPageProps {
  contacts: Contact[];
  companies: Company[];
  user: UserType;
}

export function Contacts({ contacts, companies, user }: ContactsPageProps) {
  const router = useRouter();

  const [isContactFormDialogOpen, setIsContactFormDialogOpen] = useState(false);
  const [editingContactData, setEditingContactData] = useState<Contact | null>(null);

  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  const handleOpenContactFormDialog = (contact?: Contact) => {
    setEditingContactData(contact || null);
    setIsContactFormDialogOpen(true);
  };

  const handleDelete = async (contactId: number) => {
    await deleteContact(contactId);
    setDeletingContact(null);
    router.refresh();
  };

  return (
    <main className="flex min-h-screen flex-col justify-start p-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Contacts</h1>
        <Button onClick={() => handleOpenContactFormDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
        <ContactFormDialog
          isOpen={isContactFormDialogOpen}
          onOpenChange={setIsContactFormDialogOpen}
          contact={editingContactData || undefined}
          companies={companies}
          user={user}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.company.name}</TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='edit'
                        onClick={() => handleOpenContactFormDialog(contact)}
                      >
                        <Pencil/>
                        Edit
                      </Button>
                    </TooltipTrigger> 
                    <TooltipContent>
                      <p>Edit contact</p>
                    </TooltipContent>
                  </Tooltip> 
                </TooltipProvider>  
                <Dialog open={deletingContact?.id === contact.id} onOpenChange={() => setDeletingContact(null)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant= 'destructive'
                          onClick={() => setDeletingContact(contact)}
                        >
                          <Trash2/>
                          Delete
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Deletes the contact</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent>
                    <ConfirmationDialog
                      title="Are you sure you want to delete this contact?"
                      description="This action cannot be undone. This will permanently delete the contact."
                      onConfirm={() => handleDelete(contact.id)}
                      onCancel={() => setDeletingContact(null)}
                    />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
