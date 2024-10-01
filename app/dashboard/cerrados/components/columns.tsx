'use client';

import { ColumnDef } from '@tanstack/react-table';

import { labels } from '../data/data';
import { Task } from '../data/schema';

import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Numero de orden" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('orderNumber')}</div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'resolutionTimeFormatted',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tiempo Resolucion" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.closedAt
      );

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('resolutionTimeFormatted')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'solutionType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo solucion" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.solutionType
      );

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('solutionType')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'closedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Cierre" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.closedAt
      );

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('closedAt')}
          </span>
        </div>
      );
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
