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

const getInitialFormState = (contact?: Contact) => ({
  name: contact?.name || '',
  email: contact?.email || '',
  phone: contact?.phone || '',
  company_id: contact?.company_id || 0,
});

interface FormState {
  name: string;
  email: string;
  phone: string;
  company_id: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company_id?: string;
}

const validate = (formData: FormState) => {
  const newErrors: FormErrors = {};
  if (!formData.name.trim()) newErrors.name = 'Contact name cannot be empty.';
  if (!formData.email.trim()) {
    newErrors.email = 'Email address cannot be empty.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email address is invalid.';
  }
  if (!formData.phone.trim()) newErrors.phone = 'Phone number cannot be empty.';
  if (formData.company_id === 0) newErrors.company_id = 'A company must be selected.';
  return newErrors;
};

export function ContactFormDialog({ isOpen, onOpenChange, contact, companies, user }: ContactFormDialogProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(getInitialFormState(contact));
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  useEffect(() => {
    setFormData(getInitialFormState(contact));
    setErrors({});
    setTouched({});
  }, [contact, isOpen]);

  const handleFieldChange = (field: keyof FormState, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validate({ ...formData, [field]: value });
      setErrors(newErrors);
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const newErrors = validate(formData);
    setErrors(newErrors);
  };

  const handleSave = async () => {
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, phone: true, company_id: true });
      return;
    }

    if (contact) {
      await updateContact(contact.id, formData.name, formData.email, formData.phone, formData.company_id);
    } else {
      await addContact(user, formData.name, formData.email, formData.phone, formData.company_id);
    }
    onOpenChange(false);
    router.refresh();
  };

  const isSaveDisabled = Object.keys(validate(formData)).length > 0;

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
            <div className="col-span-3">
              <Input
                id="name"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
              />
              {touched.name && errors.name && <p className="pt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <div className="col-span-3">
              <Input
                id="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
              />
              {touched.email && errors.email && <p className="pt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <div className="col-span-3">
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
              />
              {touched.phone && errors.phone && <p className="pt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Company
            </Label>
            <div className="col-span-3">
              <select
                id="company"
                value={formData.company_id}
                onChange={e => handleFieldChange('company_id', parseInt(e.target.value))}
                onBlur={() => handleBlur('company_id')}
                className="w-full"
              >
                <option value={0}>Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              {touched.company_id && errors.company_id && <p className="pt-1 text-sm text-red-500">{errors.company_id}</p>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSave} disabled={isSaveDisabled}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
