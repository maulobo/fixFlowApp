import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { ProductNube } from '@/types/types-tienda-nube';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { getSolutionsTypes } from '@/lib/actions';
import {
  Claim,
  FormTypes,
  ProductReceipt,
  SolutionType
} from '@/types/types-mine';
import { formSchema } from './formUtils';
import { useGetProducts } from '@/hooks/useFetchMain';

const status = [
  { label: 'Hablado', value: 'Hablado' },
  { label: 'No Hablado', value: 'No Hablado' },
  { label: 'Empaquetado', value: 'Empaquetado' }
];

export type ClaimForm = z.infer<typeof formSchema>;
export function MyForm({
  initialData,
  onSubmit,
  handleSubmit,
  markAsResolved,
  loading,
  form
}: FormTypes) {
  const action = initialData ? 'Guardar Cambios' : 'Crear';
  const [selectedProduct, setSelectedProduct] = useState<ProductReceipt | null>(
    null
  );
  const [productImage, setProductImage] = useState<string[] | undefined>([]);
  const [productImage2, setProductImage2] = useState<string[] | undefined>([]);
  const [solutions, setSolutions] = useState<SolutionType[]>([]);
  const [change, setChange] = useState<boolean>(false);
  const { productsReceipt, error, loading1 } = useGetProducts();
  const products: ProductReceipt[] = productsReceipt.filteredProducts;

  useEffect(() => {
    (async () => {
      const solution = await getSolutionsTypes();
      setSolutions(solution);
    })();
  }, []);
  // para Re set el form
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData]);
  const handleProductSelect = (productName: string, number: number) => {
    if (number == 1) {
      const product = products.find((prod) => prod.name.es === productName);
      setSelectedProduct(product || null);
      setProductImage(product?.images.map((item) => item.src));
      form.setValue('product', productName);
      form.setValue('variant', '');
    }
    if (number == 2) {
      const product = products.find((prod) => prod.name.es === productName);
      setSelectedProduct(product || null);
      setProductImage2(product?.images.map((item) => item.src));
      form.setValue('product2', productName);
      form.setValue('variant2', '');
    }
  };
  const handleVariantSelect = (variantValue: string, number: number) => {
    if (number == 1) {
      form.setValue('variant', variantValue);
    }
    if (number == 2) {
      form.setValue('variant2', variantValue);
    }
  };
  useEffect(() => {
    if (form.watch('solutionType') == 'Cambio de producto') {
      setChange(true);
    } else {
      setChange(false);
    }
  }, [form.watch('solutionType')]);
  const variants =
    selectedProduct?.variants.map((variant: any) => ({
      label: `Nombre: ${variant.values[0]?.es || 'Sin nombre'}, SKU: ${
        variant.sku
      }, Stock: ${variant.stock}`,
      value: variant.id.toString()
    })) || [];

  // para agregar mas productos

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products'
  });

  const handleAddProduct = () => {
    append({ name: '', quantity: 1 });
  };

  const handleRemoveProduct = (index: number) => {
    remove(index);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="items-start gap-4  p-4 align-top md:grid md:grid-cols-2 md:p-8">
          {/* Tipo de Reclamo */}
          <FormField
            control={form.control}
            name="claimReasons"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Error</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || initialData?.claimReasons}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de error" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sin-stock">Sin Stock</SelectItem>
                    <SelectItem value="garantia">Garantia</SelectItem>
                    <SelectItem value="cambio-previo">
                      Cambio previo al envio
                    </SelectItem>
                    <SelectItem value="error-empaquetado">
                      Error de empaquetado
                    </SelectItem>
                    <SelectItem value="retorno">Retorno</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Número de Orden */}
          <FormField
            control={form.control}
            name="orderNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Orden</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ejemplo: 12345"
                    {...field}
                    className=""
                    defaultValue={field.value || initialData?.orderNumber || ''}
                  />
                </FormControl>
                <FormDescription>Introduce el número de orden.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Número de Orden */}
          <FormField
            control={form.control}
            name="trackingCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tracking Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ejemplo: 12345"
                    {...field}
                    className=""
                    defaultValue={field.value || initialData?.orderNumber || ''}
                  />
                </FormControl>
                <FormDescription>
                  Introduce el número de seguimiento
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Producto */}

          {loading1 ? (
            'Buscando productos...'
          ) : (
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producto</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {initialData?.product ||
                            field.value ||
                            'Seleccionar producto'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-sm">
                      <Command>
                        <CommandInput placeholder="Buscar producto..." />
                        <CommandList>
                          <CommandGroup>
                            {products.map((product, i) => (
                              <CommandItem
                                key={`${product}_${i}`}
                                defaultValue={product.name.es}
                                onSelect={() =>
                                  handleProductSelect(product.name.es, 1)
                                }
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    product.name.es === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {product.name.es}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Variantes */}
          <FormField
            control={form.control}
            name="variant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variantes</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between text-sm"
                      >
                        {initialData?.variant ||
                          field.value ||
                          'Seleccionar variante'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full max-w-sm">
                    <Command>
                      <CommandInput placeholder="Buscar variante..." />
                      <CommandList>
                        <CommandGroup>
                          {variants.length > 0 ? (
                            variants.map((variant, i) => (
                              <CommandItem
                                key={`${variant.value}_${i} `}
                                defaultValue={variant.label}
                                onSelect={() =>
                                  handleVariantSelect(variant.value, 1)
                                }
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    variant.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {variant.label}
                              </CommandItem>
                            ))
                          ) : (
                            <span className="p-2 text-sm text-muted-foreground">
                              No hay variantes disponibles.
                            </span>
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
                <AlertDialog>
                  <AlertDialogTrigger>Ver</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Detalles del Producto</AlertDialogTitle>

                      <div className="flex flex-wrap items-center justify-center align-middle">
                        {productImage?.map((image, index) => (
                          <AlertDialogDescription key={`_${index}`}>
                            <Image
                              src={image}
                              alt={`Producto ${index + 1}`}
                              width={150}
                              height={150}
                              className="rounded-lg"
                            />
                          </AlertDialogDescription>
                        ))}
                      </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </FormItem>
            )}
          />
          {/* Método de Envío */}
          <FormField
            control={form.control}
            name="shippingMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Método de Envío</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ejemplo: DHL"
                    {...field}
                    className="w-full"
                    defaultValue={
                      initialData?.shippingMethod || field.value || ''
                    }
                  />
                </FormControl>
                <FormDescription>
                  Especifica el método de envío.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Costo de envio */}
          <FormField
            control={form.control}
            name="shippingCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo de envio</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ejemplo: 1000"
                    {...field}
                    className=""
                    defaultValue={field.value || initialData?.orderNumber || ''}
                  />
                </FormControl>
                <FormDescription>Introduce el costo del envio</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Comentarios */}
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentarios</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Escribe tus comentarios aquí"
                    {...field}
                    className="w-full rounded-md border p-2"
                    defaultValue={initialData?.comments || field.value || ''}
                  />
                </FormControl>
                <FormDescription>
                  Incluye cualquier detalle adicional
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Estado */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={initialData?.status || field.value || ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Indique estado del reclamo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {status.map((item, i) => (
                      <SelectItem value={item.value} key={`${item.value}_${i}`}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Estado del reclamo...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*tipo de solucion*/}
          <FormField
            control={form.control}
            name="solutionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de solucion</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={initialData?.solutionType || field.value || ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciones tipo de solucion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {solutions.map((item, i) => (
                      <SelectItem value={item.value} key={`${item}_${i}`}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* product 2 */}
          {!loading1 ? (
            <FormField
              control={form.control}
              name="product2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producto</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                          disabled={!change}
                          defaultValue={
                            initialData?.product2 || field.value || ''
                          }
                        >
                          {initialData?.product2 ||
                            field.value ||
                            'Seleccionar producto'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-sm">
                      <Command>
                        <CommandInput placeholder="Buscar producto..." />
                        <CommandList>
                          <CommandGroup>
                            {products.map((product, i) => (
                              <CommandItem
                                key={`${product}_${i}`}
                                defaultValue={product.name.es}
                                onSelect={() =>
                                  handleProductSelect(product.name.es, 2)
                                }
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    product.name.es === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {product.name.es}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            'Buscando productos...'
          )}

          {/* variants 2 */}
          <FormField
            control={form.control}
            name="variant2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variantes</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between text-sm"
                        disabled={!change || initialData?.product2.length == 0}
                        defaultValue={initialData?.variant2 || field.value}
                      >
                        {initialData?.variant2 ||
                          field.value ||
                          'Seleccionar variante 2'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full max-w-sm">
                    <Command>
                      <CommandInput placeholder="Buscar variante..." />
                      <CommandList>
                        <CommandGroup>
                          {variants.length > 0 ? (
                            variants.map((variant, i) => (
                              <CommandItem
                                key={`${variant.value}_${i} `}
                                value={variant.label}
                                onSelect={() =>
                                  handleVariantSelect(variant.value, 2)
                                }
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    variant.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {variant.label}
                              </CommandItem>
                            ))
                          ) : (
                            <span className="p-2 text-sm text-muted-foreground">
                              No hay variantes disponibles.
                            </span>
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
                <AlertDialog>
                  <AlertDialogTrigger>Ver</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Detalles del Producto</AlertDialogTitle>

                      <div className="flex flex-wrap items-center justify-center align-middle">
                        {productImage2?.map((image, index) => (
                          <AlertDialogDescription key={`_${index}`}>
                            <Image
                              src={image}
                              alt={`Producto ${index + 1}`}
                              width={150}
                              height={150}
                              className="rounded-lg"
                            />
                          </AlertDialogDescription>
                        ))}
                      </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
          {initialData ? (
            <Button
              disabled={loading}
              type="submit"
              variant="solved"
              onClick={markAsResolved}
            >
              Resuelto
            </Button>
          ) : (
            ''
          )}
        </div>
      </form>
    </Form>
  );
}
