'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCompany, addCompany, deleteCompany } from '@/lib/server/company';
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
import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserType } from '@/lib/server/user';
import { ConfirmationDialogContent } from './ui/confirmation-dialog';

interface CompaniesPageProps {
  companies: {
    id: number;
    name: string;
    createdAt: Date;
    contactCount: number;
  }[];
  user: UserType;
}

export function Companies({ companies, user }: CompaniesPageProps) {
  const router = useRouter();

  const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null);
  const [editingCompanyName, setEditingCompanyName] = useState<string>('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [newCompanyName, setNewCompanyName] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [deletingCompany, setDeletingCompany] = useState<{ id: number; name: string, contactCount: number } | null>(null);

  const handleEditSave = async () => {
    if (editingCompanyId && editingCompanyName) {
      await updateCompany(editingCompanyId, editingCompanyName);
      setIsEditDialogOpen(false);
      setEditingCompanyId(null);
      setEditingCompanyName('');
      router.refresh(); // Refresh the page to show updated data
    }
  };

  const handleAddSave = async () => {
    if (newCompanyName) {
      await addCompany(user, newCompanyName);
      setIsAddDialogOpen(false);
      setNewCompanyName('');
      router.refresh();
    }
  };

  const handleDelete = async (companyId: number) => {
    await deleteCompany(companyId);
    setDeletingCompany(null);
    router.refresh();
  };

  return (
    <main className="flex min-h-screen flex-col justify-start p-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Companies</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>
                Enter the new company name below. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="new-name"
                  value={newCompanyName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCompanyName(e.target.value)}
                  className="col-span-3"
                />
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
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Contacts</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>
                {company.name}
              </TableCell>
              <TableCell>{new Date(company.createdAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell>
              <TableCell className="text-right">{company.contactCount}</TableCell>
              <TableCell className="flex items-center space-x-2">
                <Dialog open={isEditDialogOpen && editingCompanyId === company.id} onOpenChange={setIsEditDialogOpen}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingCompanyId(company.id);
                            setEditingCompanyName(company.name);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit company</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Company Name</DialogTitle>
                      <DialogDescription>
                        Make changes to your company name here. Click save when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={editingCompanyName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingCompanyName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                      <Button type="submit" onClick={handleEditSave}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog open={deletingCompany?.id === company.id} onOpenChange={() => setDeletingCompany(null)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={company.contactCount > 0}
                          onClick={() => setDeletingCompany(company)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {company.contactCount > 0 ? (
                          <p>Cannot delete company with associated contacts</p>
                        ) : (
                          <p>Delete company</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent>
                    <ConfirmationDialogContent
                      title="Are you sure you want to delete this company?"
                      description="This action cannot be undone. This will permanently delete the company."
                      onConfirm={() => handleDelete(company.id)}
                      onCancel={() => setDeletingCompany(null)}
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

