'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateContact, addContact } from '@/lib/server/contact';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserType } from '@/lib/server/user';

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

interface ContactFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contact?: Contact; // Optional, for editing
  companies: Company[];
  user: UserType;
}

export function ContactFormDialog({ isOpen, onOpenChange, contact, companies, user }: ContactFormDialogProps) {
  const router = useRouter();
  const [contactData, setContactData] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    company_id: contact?.company_id || 0,
  });

  useEffect(() => {
    setContactData({
      name: contact?.name || '',
      email: contact?.email || '',
      phone: contact?.phone || '',
      company_id: contact?.company_id || 0,
    });
  }, [contact]);

  const handleSave = async () => {
    if (contact) {
      // Editing existing contact
      await updateContact(contact.id, contactData.name, contactData.email, contactData.phone, contactData.company_id);
    } else {
      // Adding new contact
      await addContact(user, contactData.name, contactData.email, contactData.phone, contactData.company_id);
    }
    onOpenChange(false);
    setContactData({ name: '', email: '', phone: '', company_id: 0 });
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{contact ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
          <DialogDescription>
            {contact ? 'Make changes to the contact here.' : 'Enter the new contact details below.'} Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={contactData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactData({ ...contactData, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={contactData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactData({ ...contactData, email: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={contactData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactData({ ...contactData, phone: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Company
            </Label>
            <select
              id="company"
              value={contactData.company_id}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setContactData({ ...contactData, company_id: parseInt(e.target.value) })}
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
