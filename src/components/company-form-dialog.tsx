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
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setCompanyName(company?.name || '');
    setIsTouched(false);
  }, [company, isOpen]);

  const handleSave = async () => {
    const trimmedName = companyName.trim();
    if (!trimmedName) return;

    if (company) {
      // Editing existing company
      await updateCompany(company.id, trimmedName);
    } else {
      // Adding new company
      await addCompany(user, trimmedName);
    }
    onOpenChange(false);
    setCompanyName('');
    router.refresh();
  };

  const isSaveDisabled = !companyName.trim();
  const showError = isTouched && isSaveDisabled;

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCompanyName(e.target.value);
                setIsTouched(true);
              }}
              className="col-span-3"
            />
          </div>
          {showError && (
            <p className="text-sm text-red-500 col-start-2 col-span-3">
              Company name cannot be empty.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSave} disabled={isSaveDisabled}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
