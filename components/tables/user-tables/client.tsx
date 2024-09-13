'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Complaint } from '@/types/types-mine';

interface ProductsClientProps {
  data: Complaint[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage products"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/reclamo/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {/* aca van las columnas */}
      <DataTable searchKey="product" columns={columns} data={data} />
    </>
  );
};
