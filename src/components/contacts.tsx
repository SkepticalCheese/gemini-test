'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateContact, addContact, deleteContact } from '@/lib/server/contact';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserType } from '@/lib/server/user';
import { ConfirmationDialogContent } from './ui/confirmation-dialog-content';

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

  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', company_id: 0 });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  const handleEditSave = async () => {
    if (editingContact) {
      await updateContact(editingContact.id, editingContact.name, editingContact.email, editingContact.phone, editingContact.company_id);
      setIsEditDialogOpen(false);
      setEditingContact(null);
      router.refresh();
    }
  };

  const handleAddSave = async () => {
    if (newContact.name && newContact.email && newContact.phone && newContact.company_id) {
      await addContact(user, newContact.name, newContact.email, newContact.phone, newContact.company_id);
      setIsAddDialogOpen(false);
      setNewContact({ name: '', email: '', phone: '', company_id: 0 });
      router.refresh();
    }
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>
                Enter the new contact details below. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="new-name"
                  value={newContact.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewContact({ ...newContact, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="new-email"
                  value={newContact.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewContact({ ...newContact, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="new-phone"
                  value={newContact.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-company" className="text-right">
                  Company
                </Label>
                <select
                  id="new-company"
                  value={newContact.company_id}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewContact({ ...newContact, company_id: parseInt(e.target.value) })}
                  className="col-span-3"
                >
                  <option value={0}>Select a company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={handleAddSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.company.name}</TableCell>
              <TableCell>
                <Dialog open={isEditDialogOpen && editingContact?.id === contact.id} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      onClick={() => {
                        setEditingContact(contact);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      {contact.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Contact</DialogTitle>
                      <DialogDescription>
                        Make changes to the contact here. Click save when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={editingContact?.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingContact({ ...editingContact, name: e.target.value } as Contact)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={editingContact?.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingContact({ ...editingContact, email: e.target.value } as Contact)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          value={editingContact?.phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingContact({ ...editingContact, phone: e.target.value } as Contact)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="company" className="text-right">
                          Company
                        </Label>
                        <select
                          id="company"
                          value={editingContact?.company_id}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditingContact({ ...editingContact, company_id: parseInt(e.target.value) } as Contact)}
                          className="col-span-3"
                        >
                          {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                              {company.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                      <Button type="submit" onClick={handleEditSave}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>
                <Dialog open={deletingContact?.id === contact.id} onOpenChange={() => setDeletingContact(null)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingContact(contact)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Deletes the contact</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent>
                    <ConfirmationDialogContent
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

