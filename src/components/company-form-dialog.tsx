'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateCompany, addCompany } from '@/lib/server/company';
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

interface CompanyFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  company?: { id: number; name: string }; // Optional, for editing
  user: UserType;
}

export function CompanyFormDialog({ isOpen, onOpenChange, company, user }: CompanyFormDialogProps) {
  const router = useRouter();
  const [companyName, setCompanyName] = useState(company?.name || '');

  useEffect(() => {
    setCompanyName(company?.name || '');
  }, [company]);

  const handleSave = async () => {
    if (company) {
      // Editing existing company
      await updateCompany(company.id, companyName);
    } else {
      // Adding new company
      await addCompany(user, companyName);
    }
    onOpenChange(false);
    setCompanyName('');
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{company ? 'Edit Company Name' : 'Add New Company'}</DialogTitle>
          <DialogDescription>
            {company ? 'Make changes to your company name here.' : 'Enter the new company name below.'} Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
              className="col-span-3"
            />
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
