'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCompany } from '@/lib/server/company';
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
import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserType } from '@/lib/server/user';
import { ConfirmationDialog } from './ui/confirmation-dialog';
import { CompanyFormDialog } from './company-form-dialog';

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

  const [isAddCompanyDialogOpen, setIsAddCompanyDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<{ id: number; name: string } | null>(null);

  const [deletingCompany, setDeletingCompany] = useState<{ id: number; name: string, contactCount: number } | null>(null);

  const handleAddCompany = () => {
    setIsAddCompanyDialogOpen(true);
    setEditingCompany(null); // Ensure no company is being edited when adding a new one
  };

  const handleEditCompany = (company: { id: number; name: string }) => {
    setEditingCompany(company);
    setIsAddCompanyDialogOpen(true);
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
        <Button onClick={handleAddCompany}>Add New</Button>
        <CompanyFormDialog
          isOpen={isAddCompanyDialogOpen}
          onOpenChange={setIsAddCompanyDialogOpen}
          user={user}
          company={editingCompany || undefined}
        />
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditCompany(company)}
                      >
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit company</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Dialog open={deletingCompany?.id === company.id} onOpenChange={() => setDeletingCompany(null)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={company.contactCount > 0}
                            onClick={() => setDeletingCompany(company)}
                          >
                            <Trash2 className={`h-4 w-4 ${company.contactCount === 0 ? 'text-red-500' : ''}`} />
                          </Button>
                        </span>
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
                    <ConfirmationDialog
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
