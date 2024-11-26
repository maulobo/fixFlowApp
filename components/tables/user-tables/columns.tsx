'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';
import { Claim } from '@/types/types-mine';

export const columns: ColumnDef<Claim>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'orderNumber',
    header: 'N ORDEN'
  },
  {
    accessorKey: 'product',
    header: 'PRODUCTO'
  },
  {
    accessorKey: 'claimReasons',
    header: 'TIPO DE ERROR'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    accessorKey: 'solutionType',
    header: 'SOLUCION'
  },
  {
    accessorKey: 'createdAt',
    header: 'FECHA CREACION'
  },
  {
    accessorKey: 'trackingCode',
    header: 'TRACKING CODE'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
