'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { BASE_URL } from '@/constants/data';
import { useDeleteById } from '@/hooks/useFetchMain';
import { Claim } from '@/types/types-mine';

import {
  Edit,
  Eye,
  EyeOff,
  MoreHorizontal,
  Trash,
  PercentCircle
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: Claim;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<
    'delete' | 'show' | 'hide' | 'spotlight' | 'unspotlight' | null
  >(null);
  const router = useRouter();
  const session = useSession();
  const token = session.data?.sessionToken;

  const onConfirm = async () => {
    setLoading(true);
    try {
      if (actionType === 'delete') {
        await useDeleteById(data._id, token);
      } else if (actionType === 'show') {
        console.log('Mostrando producto', data._id);
        await updateProductVisibility(data._id, true);
      } else if (actionType === 'hide') {
        console.log('Ocultando producto', data._id);
        await updateProductVisibility(data._id, false);
      } else if (actionType === 'spotlight') {
        console.log('spotlight');
        await updateProductSpotlight(data._id, true);
      } else if (actionType === 'unspotlight') {
        console.log('spotlight');
        await updateProductSpotlight(data._id, false);
      }
      console.log('resfrescando');
      router.refresh();
    } catch (error) {
      console.error('Error during action:', error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const updateProductVisibility = async (
    productId: string,
    visible: boolean
  ) => {
    const res = await fetch(`${BASE_URL}/update/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ active: visible })
    });

    if (!res.ok) {
      throw new Error('Failed to update product visibility');
    }

    const result = await res.json();

    return result;
  };
  const updateProductSpotlight = async (
    productId: string,
    destacado: boolean
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ destacado })
      });

      if (!res.ok) {
        throw new Error('Failed to update product visibility');
      }

      const result = await res.json();

      return result;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };
  const deleteProduct = async (productId: string) => {};

  const onDelete = () => {
    setActionType('delete');
    setOpen(true);
  };
  const onShow = () => {
    setActionType('show');
    setOpen(true);
  };
  const onHide: any = () => {
    setActionType('hide');
    setOpen(true);
  };
  const onSpotlight = () => {
    setActionType('spotlight');
    setOpen(true);
  };
  const onUnSpotlight = () => {
    setActionType('unspotlight');
    setOpen(true);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/reclamos?id=${data._id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="mr-2 h-4 w-4 text-red-500" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onShow}>
            <Eye className="mr-2 h-4 w-4 text-green-500" /> Mostrar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onHide}>
            <EyeOff className="text-grey-500 mr-2 h-4 w-4" /> No Mostrar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSpotlight}>
            <PercentCircle className="mr-2 h-4 w-4 text-red-500" /> Destacar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUnSpotlight}>
            <PercentCircle className="text-grey-500 mr-2 h-4 w-4" /> No destacar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
