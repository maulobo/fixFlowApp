'use client';

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { useToast } from '@/components/ui/use-toast';
import FileUpload from '../file-upload';
import { formSchema } from './formUtils';
import { BASE_URL } from '@/constants/data';
import { AlertModal } from '../modal/alert-modal';

export const IMG_MAX_LIMIT = 3;

interface ComplaintFormProps {
  initialData: any; // Ajusta el tipo según sea necesario
}

interface Products {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

type ComplaintFormValues = z.infer<typeof formSchema>;

export const ComplaintForm: React.FC<ComplaintFormProps> = ({
  initialData
}) => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [filteredProducts2, setFilteredProducts2] = useState<Products[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTerm2, setSearchTerm2] = useState<string>('');
  const [cambio, setCambio] = useState(false);

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

  const defaultValues = initialData || {
    orderNumber: '',
    dateTime: new Date(),
    comments: '',
    product: '',
    trackingCode: '',
    claimReasons: '',
    status: 'No Hablado',
    solutionType: '',
    shippingCost: 0,
    photo: '',
    errorPrice: 0,
    shippingType: '',
    detectionLocation: '',
    customer: '',
    createdBy: '',
    isClosed: false,
    closedAt: null,
    updatedBy: '',
    updateHistory: []
  };

  const solutionTypes = [
    'Reenvio',
    'Cupon',
    'Devolucion',
    'Regalo',
    'Cambio de producto',
    'Logistica inversa'
  ];
  const statuses = ['Hablado', 'No Hablado', 'Empaquetado'];
  const claimReasons = [
    'Error empaquetado',
    'Cambio despacho',
    'Devolucion',
    'Error Logistica',
    'Otro',
    'Sin Stock',
    'Garantia',
    'Retorno',
    'Cambio previo al envio'
  ];

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  console.log('Form errors:', form.formState.errors);

  const onSubmit = async (data: ComplaintFormValues) => {
    try {
      if (initialData) {
        const res = await axios.put(
          `${BASE_URL}/edit-complaint/${initialData._id}`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-User-Id': session?.user?.email
            }
          }
        );
      } else {
        await axios.post(`${BASE_URL}/add`, data, {
          headers: {
            'Content-Type': 'application/json',
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
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsResolved = async () => {
    // Validar que los campos requeridos estén completos
    const { errorPrice, shippingCost, solutionType, product } =
      form.getValues();
    console.log(errorPrice, shippingCost, solutionType, product);
    if (!errorPrice || !shippingCost || !solutionType || !product) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Fields',
        description:
          'Please ensure all required fields are filled: error price, shipping cost, solution type, and product.'
      });
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${BASE_URL}/edit-complaint/${initialData._id}`,
        {
          ...initialData,
          isClosed: true,
          status: 'Resuelto',
          closedAt: new Date().toISOString(), // Fecha actual
          errorPrice,
          shippingCost,
          solutionType,
          product
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': session?.user?.email
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

  useEffect(() => {
    const fetchProd = async () => {
      const res = await fetch(`${BASE_URL}/products`);
      const productsRes = await res.json();
      setProducts(productsRes);
    };

    fetchProd();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filtrar los productos por nombre
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(filtered); // Guardar productos filtrados
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero de Orden</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading || initialData}
                      placeholder="Order Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producto</FormLabel>
                  <FormControl>
                    <div style={{ position: 'relative' }}>
                      {/* Contenedor padre con posición relativa */}
                      <Input
                        autoComplete="off"
                        {...field}
                        placeholder="Search product"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          if (e.target.value === '') {
                            setFilteredProducts([]);
                          } else {
                            setFilteredProducts(
                              products.filter((product) =>
                                product.name
                                  .toLowerCase()
                                  .includes(e.target.value.toLowerCase())
                              )
                            );
                          }
                        }}
                      />
                      {filteredProducts.length > 0 && (
                        <ul
                          style={{
                            position: 'absolute',
                            zIndex: 1,
                            width: '100%',
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            backgroundColor: 'black',
                            maxHeight: '200px', // Limita la altura máxima (ajusta según el tamaño de los elementos)
                            overflowY: 'auto' // Activa el scroll vertical cuando excede la altura máxima
                          }}
                        >
                          {/* Estilos para la lista */}
                          {filteredProducts.map((product) => (
                            <li
                              key={product._id}
                              onClick={() => {
                                setSearchTerm(product.name);
                                form.setValue('product', product.name);
                                setFilteredProducts([]);
                              }}
                              style={{ padding: '8px', cursor: 'pointer' }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  '#7d7d7d')
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  'transparent')
                              }
                            >
                              {product.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trackingCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trakking Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading || initialData}
                      placeholder="N trackking"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentarios</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Comments"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="claimReasons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razon del reclamo</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a reason"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {claimReasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormDescription>Seleccione el estado</FormDescription>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a status"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((statusOption) => (
                          <SelectItem key={statusOption} value={statusOption}>
                            {statusOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="solutionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Solucion</FormLabel>
                  <FormDescription>
                    Seleccione el tipo de solucion
                  </FormDescription>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === 'Cambio de producto') {
                          setCambio(true);
                        } else if (value !== 'Cambio de producto') {
                          setCambio(false);
                        }
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a solution type"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {solutionTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {cambio && (
              <FormField
                control={form.control}
                name="productChange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producto a cambiar</FormLabel>
                    <FormControl>
                      <div style={{ position: 'relative' }}>
                        <Input
                          autoComplete="off"
                          {...field}
                          placeholder="Search product"
                          value={searchTerm2}
                          onChange={(e) => {
                            setSearchTerm2(e.target.value);
                            if (e.target.value === '') {
                              setFilteredProducts2([]);
                            } else {
                              setFilteredProducts2(
                                products.filter((product) =>
                                  product.name
                                    .toLowerCase()
                                    .includes(e.target.value.toLowerCase())
                                )
                              );
                            }
                          }}
                        />
                        {filteredProducts2.length > 0 && (
                          <ul
                            style={{
                              position: 'absolute',
                              zIndex: 1,
                              width: '100%',
                              listStyle: 'none',
                              padding: 0,
                              margin: 0,
                              backgroundColor: 'black',
                              maxHeight: '200px', // Limita la altura máxima
                              overflowY: 'auto' // Activa el scroll vertical
                            }}
                          >
                            {filteredProducts2.map((product) => (
                              <li
                                key={product._id}
                                onClick={() => {
                                  setSearchTerm2(product.name);
                                  form.setValue('productChange', product.name); // Actualiza el valor correcto en el formulario
                                  setFilteredProducts2([]);
                                }}
                                style={{ padding: '8px', cursor: 'pointer' }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    '#7d7d7d')
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    'transparent')
                                }
                              >
                                {product.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="shippingCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Cost</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      placeholder="Shipping Cost"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="errorPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Costo del error</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="string"
                      placeholder="Error Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Photo</FormLabel>
                  <FormControl>
                    <FileUpload
                      disabled={loading}
                      onChange={(files: File[]) => {
                        if (files.length) {
                          // Handle file upload here
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {action}
          </Button>
          {initialData && (
            <Button
              type="button"
              className="w-full bg-green-400 hover:bg-green-500"
              disabled={loading}
              onClick={markAsResolved}
            >
              Mark as Resolved
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};
