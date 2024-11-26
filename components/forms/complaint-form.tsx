'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from '../file-upload';
import { formSchema } from './formUtils';
import { BASE_URL } from '@/constants/data';
import { AlertModal } from '../modal/alert-modal';

import { ProductNube, Variant } from '@/types/types-tienda-nube';

import { ClaimForm, MyForm } from './form-generated';
import { useGetProducts } from '@/hooks/useFetchMain';
import { TestForm } from './form-test';

export const IMG_MAX_LIMIT = 3;

interface ComplaintFormProps {
  initialData: any;
}

export const ComplaintForm: React.FC<ComplaintFormProps> = ({
  initialData
}) => {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Editar Reclamo' : 'Crear Reclamo';
  const description = initialData
    ? 'Editar un reclamo'
    : 'Agregar un nuevo reclamo';
  const toastMessage = initialData ? 'Reclamo Editado.' : 'Reclamo Creado.';

  const form = useForm<ClaimForm>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: ClaimForm) => {
    console.log('data que llega', data);
    setLoading(true);

    try {
      if (initialData) {
        console.log('Editando...');
        const res = await axios.put(
          `${BASE_URL}/complaints/${initialData._id}`,
          data,
          {
            headers: {
              authorization: `Bearer ${session?.sessionToken}`,
              'Content-Type': 'application/json',
              'X-User-Id': session?.user?.email
            }
          }
        );
        console.log(res);
      } else {
        console.log('Creando...');
        await axios.post(`${BASE_URL}/complaints`, data, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.sessionToken}`,
            'X-User-Id': session?.user?.email
          }
        });
      }
      router.refresh();
      router.push(`/dashboard/pendientes`);
      toast({
        variant: 'success',
        title: 'Success',
        description: toastMessage
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `${error?.response.data.error.errorResponse?.errmsg}`
      });
    } finally {
      setLoading(false);
    }
  };

  const {
    handleSubmit,
    formState: { errors }
  } = form;
  console.log(errors);

  const markAsResolved = async () => {
    const formValues = form.getValues();

    try {
      setLoading(true);
      console.log('FORM', formValues);

      const res = await axios.put(
        `${BASE_URL}/complaints/${initialData._id}`,
        {
          ...formValues,
          isClosed: true,
          status: 'Resuelto',
          closedAt: new Date().toISOString() // Fecha actual
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': session?.user?.email,
            authorization: `Bearer ${session?.sessionToken}`
          }
        }
      );
      router.refresh();
      router.push(`/dashboard`);
      toast({
        variant: 'success',
        title: 'Resolved',
        description: 'El caso fue cerrado con exito'
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Hubo un problema al intentar resolver la queja'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/delete-complaint/${params.complaintId}`);
      router.refresh();
      router.push(`/dashboard/reclamo`);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was a problem deleting the complaint.'
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      {/* <MyForm
        onSubmit={onSubmit}
        initialData={initialData}
        markAsResolved={markAsResolved}
        handleSubmit={handleSubmit}
        loading={loading}
        form={form}
      /> */}
      <TestForm
        onSubmit={onSubmit}
        initialData={initialData}
        markAsResolved={markAsResolved}
        handleSubmit={handleSubmit}
        loading={loading}
        form={form}
      />
    </>
  );
};
