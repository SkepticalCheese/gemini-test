'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCompany } from '@/lib/server/company';
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

interface CompaniesPageProps {
  companies: {
    id: number;
    name: string;
    createdAt: Date;
    contactCount: number;
  }[];
}

export function Companies({ companies }: CompaniesPageProps) {
  const router = useRouter();

  const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null);
  const [editingCompanyName, setEditingCompanyName] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async () => {
    if (editingCompanyId && editingCompanyName) {
      await updateCompany(editingCompanyId, editingCompanyName);
      setIsDialogOpen(false);
      setEditingCompanyId(null);
      setEditingCompanyName('');
      router.refresh(); // Refresh the page to show updated data
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-start p-24">
      <h1 className="mb-8 text-4xl font-bold">Companies</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Contacts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>
                <Dialog open={isDialogOpen && editingCompanyId === company.id} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      onClick={() => {
                        setEditingCompanyId(company.id);
                        setEditingCompanyName(company.name);
                        setIsDialogOpen(true);
                      }}
                    >
                      {company.name}
                    </Button>
                  </DialogTrigger>
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
                      <Button type="submit" onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>{new Date(company.createdAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell>
              <TableCell>{company.contactCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
