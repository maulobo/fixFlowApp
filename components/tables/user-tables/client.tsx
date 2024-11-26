'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Claim } from '@/types/types-mine';

interface ProductsClientProps {
  data: Claim[];
}

export const PendingComplaints: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Pending (${data.length})`}
          description="Manage products"
        />
      </div>
      <Separator />
      <DataTable searchKey="orderNumber" columns={columns} data={data} />
    </>
  );
};
