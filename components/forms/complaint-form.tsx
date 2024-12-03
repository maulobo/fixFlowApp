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

import { ClaimForm, MyForm } from './form-generated';
import { useGetProducts } from '@/hooks/useFetchMain';
import { FormTest } from './form-test';
import { Claim, FormValues, Variant } from '@/types/types-mine';
import { revalidatePath } from 'next/cache';

export const IMG_MAX_LIMIT = 3;

interface ComplaintFormProps {
  initialData: Claim;
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

  const defaultValues = initialData
    ? initialData
    : {
        products: [
          {
            product: {
              name: '',
              id: ''
            },
            solution: {
              type: '',
              productToChange: {
                product: { name: '', id: '' },
                variant: {
                  name: { es: '' },
                  id: '',
                  price: '',
                  product_id: '',
                  sku: ''
                },
                Quantity: 0
              }
            },
            shippingMethod: '',
            quantity: 0,
            variant: {
              name: {
                es: ''
              },
              id: '',
              price: '',
              product_id: '',
              sku: ''
            } as Variant
          }
        ],
        orderNumber: '',
        comments: '',
        shippingMethod: undefined,
        status: '',
        trackingCode: undefined,
        shippingCost: undefined
      };

  const form = useForm<FormValues>({
    defaultValues
  });

  console.log('Errores del formulario:', form.formState.errors);

  const onSubmit = async (data: FormValues, event: any) => {
    const submitter = event.nativeEvent.submitter as any;
    const buttonAction = submitter.name;

    setLoading(true);

    try {
      const requestData =
        buttonAction === 'solved'
          ? {
              ...data,
              isClosed: true,
              status: 'Resuelto',
              closedAt: new Date().toISOString()
            }
          : data;

      if (initialData) {
        const res = await axios.put(
          `${BASE_URL}/complaints/${initialData._id}`,
          requestData,
          {
            headers: {
              authorization: `Bearer ${session?.sessionToken}`,
              'Content-Type': 'application/json',
              'X-User-Id': session?.user?.email
            }
          }
        );
      } else {
        await axios.post(`${BASE_URL}/complaints`, requestData, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.sessionToken}`,
            'X-User-Id': session?.user?.email
          }
        });
      }
      router.refresh();
      router.push(
        buttonAction === 'solved' ? `/dashboard` : `/dashboard/pendientes`
      );

      toast({
        variant: 'success',
        title: buttonAction === 'solved' ? 'Resolved' : 'Success',
        description:
          buttonAction === 'solved'
            ? 'El caso fue cerrado con exito'
            : toastMessage
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          buttonAction === 'solved'
            ? 'Hubo un problema al intentar resolver la queja'
            : `${error?.response.data.error.errorResponse?.errmsg}`
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

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...defaultValues, // Valores por defecto
        ...initialData // Sobrescribe con datos iniciales
      });
    }
  }, [initialData, form.reset]);

  // Observa los valores del formulario
  const watchedProducts = form.watch('products');

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
      <FormTest
        onSubmit={onSubmit}
        initialData={initialData}
        handleSubmit={handleSubmit}
        loading={loading}
        form={form}
      />
    </>
  );
};
