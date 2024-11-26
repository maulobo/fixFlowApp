import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm, UseFormReturn, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useState } from 'react';
import { ProductReceipt } from '@/types/types-tienda-nube';
import { useGetProducts } from '@/hooks/useFetchMain';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../ui/command';
import { cn } from '@/lib/utils';
import { FormTypes } from '@/types/types-mine';

const productSchema = z.object({
  name: z.string().min(1, 'Nombre del producto es requerido'),
  quantity: z.number().min(1, 'La cantidad debe ser mayor que 0')
});

const formSchema = z.object({
  products: z.array(productSchema)
});

export type ClaimForm = z.infer<typeof formSchema>;

export function TestForm({
  initialData,
  onSubmit,
  handleSubmit,
  markAsResolved,
  loading,
  form
}: FormTypes) {
  const [selectedProduct, setSelectedProduct] = useState<ProductReceipt | null>(
    null
  );
  const [productImage, setProductImage] = useState<string[] | undefined>([]);
  const [productImage2, setProductImage2] = useState<string[] | undefined>([]);

  const [change, setChange] = useState<boolean>(false);
  const action = initialData ? 'Guardar Cambios' : 'Crear';
  const { productsReceipt, error, loading1 } = useGetProducts();

  const handleProductSelect = (productName: string, number: number) => {
    if (number == 1) {
      const product = products.find((prod) => prod.name.es === productName);
      setSelectedProduct(product || null);
      setProductImage(product?.images.map((item: any) => item.src));
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

  const products: ProductReceipt[] = productsReceipt.filteredProducts;

  const {
    control,
    handleSubmit: handleFormSubmit,
    setValue,
    watch
  } = useForm<ClaimForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: [{ name: '', quantity: 1 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
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
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <div className="items-start gap-4 p-4 align-top md:grid md:grid-cols-2 md:p-8">
          {/* Productos dinámicos */}
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
        </div>

        {/* Botón para agregar más productos */}
        <Button type="button" onClick={handleAddProduct} variant="outline">
          + Agregar producto
        </Button>

        <div className="mt-4 flex gap-4">
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
          {initialData ? (
            <Button
              disabled={loading}
              variant="solved"
              onClick={markAsResolved}
            >
              Resuelto
            </Button>
          ) : null}
        </div>
      </form>
    </Form>
  );
}
