import { useFieldArray, useForm } from 'react-hook-form';
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
import { Check, ChevronsUpDown, Trash2 } from 'lucide-react';
import {
  Command,
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
import { useState } from 'react';
import { FormTypes, ProductReceipt, Variant } from '@/types/types-mine';
import { useGetProducts } from '@/hooks/useFetchMain';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Input } from '../ui/input';

export function FormTest({
  initialData,
  // onSubmit,
  handleSubmit,
  markAsResolved,
  loading,
  form
}: FormTypes) {
  const { productsReceipt, loading1 } = useGetProducts();
  const products: ProductReceipt[] = productsReceipt.filteredProducts;

  const [selectedProducts, setSelectedProducts] = useState<
    (ProductReceipt | null)[]
  >([null]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products'
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleProductSelect = (product: ProductReceipt, index: number) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index] = product;
    setSelectedProducts(newSelectedProducts);
    console.log(product);

    form.setValue(`products.${index}.product`, {
      name: product.name.es,
      id: product.id || ''
    });

    form.setValue(`products.${index}.variant`, {} as Variant);
  };

  const handleVariantSelect = (variant: Variant, index: number) => {
    form.setValue(`products.${index}.variant`, variant);
    console.log(variant);
  };

  const getVariantsForProduct = (index: number) => {
    const selectedProduct = selectedProducts[index];
    return selectedProduct
      ? selectedProduct.variants.map((variant) => ({
          label: `SKU: ${variant.sku}, Nombre: ${
            variant.name ? variant.name.es : 'sin Nombre'
          }`,
          value: variant
        }))
      : [];
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  defaultValue={field.value || initialData?.trackingCode || ''}
                />
              </FormControl>
              <FormDescription>
                Introduce el número de seguimiento
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* products */}
        <div className="bg-gray-800">
          {loading1 ? (
            <div>Cargando productos...</div>
          ) : (
            fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name={`products.${index}.product`}
                  render={({ field: fieldProps }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Producto</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              {fieldProps.value.name || 'Seleccionar producto'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full max-w-sm">
                          <Command>
                            <CommandInput placeholder="Buscar producto..." />
                            <CommandList>
                              <CommandGroup>
                                {products.map((product) => (
                                  <CommandItem
                                    key={product.id}
                                    onSelect={() =>
                                      handleProductSelect(product, index)
                                    }
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        product.name.es ===
                                          fieldProps.value.name
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

                <FormField
                  control={form.control}
                  name={`products.${index}.variant`}
                  render={({ field: fieldProps }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Variante</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                              disabled={
                                !form.watch(`products.${index}.product`)
                              }
                            >
                              {`SKU: ${
                                fieldProps.value?.sku || 'N/A'
                              }  |  Nombre: ${
                                fieldProps.value?.name?.es || 'Sin nombre'
                              }` || 'Seleccionar variante'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full max-w-sm">
                          <Command>
                            <CommandInput placeholder="Buscar variante..." />
                            <CommandList>
                              <CommandGroup>
                                {getVariantsForProduct(index).map((variant) => (
                                  <CommandItem
                                    key={variant.value.sku}
                                    onSelect={() =>
                                      handleVariantSelect(variant.value, index)
                                    }
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        variant.value.sku ===
                                          fieldProps.value?.sku
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    {/* esto es lo que se muestra */}
                                    {variant.label}
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

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      remove(index);
                      const newSelectedProducts = [...selectedProducts];
                      newSelectedProducts.splice(index, 1);
                      setSelectedProducts(newSelectedProducts);
                    }}
                    className="self-end"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))
          )}
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              append({
                product: { name: '', id: '' },
                variant: {
                  name: { es: '' },
                  id: '',
                  price: '',
                  product_id: '',
                  sku: ''
                } as Variant
              });
              setSelectedProducts([...selectedProducts, null]);
            }}
            disabled={loading1}
          >
            Agregar Producto
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={loading1}>
          Enviar
        </Button>
      </form>
    </Form>
  );
}
