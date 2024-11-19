'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CloudHail, Trash } from 'lucide-react';
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
import FormMain from './form-main';

export const IMG_MAX_LIMIT = 3;

interface ComplaintFormProps {
  initialData: any; // Ajusta el tipo según sea necesario
  products: ProductNube[];
  type: string;
}

type ComplaintFormValues = z.infer<typeof formSchema>;

export const ComplaintForm: React.FC<ComplaintFormProps> = ({
  initialData,
  products,
  type
}) => {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Complaint' : 'Create Complaint';
  const description = initialData ? 'Edit a Complaint.' : 'Add a new Complaint';
  const toastMessage = initialData
    ? 'Complaint updated.'
    : 'Complaint created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      claimReasons: type
    }
  });

  const onSubmit = async (data: ComplaintFormValues) => {
    console.log(data);
    try {
      if (initialData) {
        const res = await axios.put(
          `${BASE_URL}/edit-complaint/${initialData._id}`,
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
        console.log('asfksafonafhoifjfoijas');
        await axios.post(`${BASE_URL}/complaints`, data, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.sessionToken}`,
            'X-User-Id': session?.user?.email
          }
        });
      }
      router.refresh();
      router.push(`/dashboard/reclamo`);
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
    console.log('INITIAL', initialData);
    const formValues = form.getValues();

    // if (!errorPrice || !shippingCost || !solutionType || !product) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Incomplete Fields',
    //     description:
    //       'Please ensure all required fields are filled: error price, shipping cost, solution type, and product.'
    //   });
    //   return;
    // }

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
        description: 'The complaint has been marked as resolved.'
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was a problem marking the complaint as resolved.'
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

      <FormMain
        onSubmit={onSubmit}
        markAsResolved={markAsResolved}
        initialData={initialData}
        products={products}
        form={form}
        loading={loading}
        action={action}
        type={type}
      />
    </>
  );
};
