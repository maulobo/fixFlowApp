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
import { useEffect, useState } from 'react';
import {
  FormTypes,
  ProductReceipt,
  SolutionType,
  Variant
} from '@/types/types-mine';
import { useGetProducts } from '@/hooks/useFetchMain';
import { Input } from '../ui/input';
import { DrawerDemo } from '../drawer';
import { getClaimReason, getSolutionsTypes } from '@/lib/actions';
import { FormItemInput } from './components/form-item-input';
import { FormSelectMine } from './components/form-select';

const status = [
  { label: 'Hablado', value: 'Hablado' },
  { label: 'No Hablado', value: 'No Hablado' },
  { label: 'Pendiente', value: 'Pendiente' },
  { label: 'Resuelto', value: 'Resuelto' },
  { label: 'Empaquetado', value: 'Empaquetado' },
  { label: 'Cancelado', value: 'Cancelado' }
];

export function FormTest({ initialData, form, onSubmit }: FormTypes) {
  const { productsReceipt, loading1 } = useGetProducts();
  const products: ProductReceipt[] = productsReceipt.filteredProducts;
  const [selectedProducts, setSelectedProducts] = useState<
    (ProductReceipt | null)[]
  >([null]);
  const [variantDrawer, setVariantDrawer] = useState<Variant>();
  const [productDrawer, setProducttDrawer] = useState<any>();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [imgRes, setImgRes] = useState('');
  const [solutions, setSolutions] = useState<SolutionType[]>([]);
  const [claimReasons, setClaimReasons] = useState<SolutionType[]>([]);

  const buton = initialData ? 'Editar' : 'Crear';

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products'
  });

  useEffect(() => {
    (async () => {
      const solution = await getSolutionsTypes();
      setSolutions(solution);
      const claimsReason = await getClaimReason();
      setClaimReasons(claimsReason);
    })();
  }, []);

  const handleProductSelect = (product: ProductReceipt, index: number) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index] = product;
    setSelectedProducts(newSelectedProducts);
    // console.log(product);

    form.setValue(`products.${index}.product`, {
      name: product.name.es,
      id: product.id || ''
    });

    form.setValue(`products.${index}.variant`, {} as Variant);
    form.setValue(`products.${index}.quantity`, 1);
  };

  const handleVariantSelect = (variant: Variant, index: number) => {
    form.setValue(`products.${index}.variant`, variant);
    form.setValue(`products.${index}.quantity`, 1);
  };

  const showData = (index: any) => {
    setImgRes('');
    const variant = form.watch(`products.${index}.variant`);
    const name = form.watch(`products.${index}.product`);
    setVariantDrawer(variant);
    setProducttDrawer(name);
  };

  const getVariantsForProduct = (index: number) => {
    const selectedProduct = selectedProducts[index];

    return selectedProduct
      ? selectedProduct.variants.map((variant) => ({
          label: `SKU: ${variant.sku} Variante: ${
            variant.sku ? variant.values.map((e) => e.es) : 'Sin Nombre'
          } , Precio: $${variant.price}, Stock ${variant.stock}`,
          value: variant
        }))
      : [];
  };

  const handleReplacementProductSelect = (
    product: ProductReceipt,
    index: number
  ) => {
    form.setValue(`products.${index}.solution.productToChange.product`, {
      name: product.name.es,
      id: product.id || ''
    });
  };

  const handleVariantSelectToChange = (variant: Variant, index: number) => {
    form.setValue(
      `products.${index}.solution.productToChange.variant`,
      variant
    );
    form.setValue(`products.${index}.solution.productToChange.Quantity`, 1);
  };

  // const onSubmit = (data: any) => {
  //   console.log(data);
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Tipo de Reclamo */}
        <FormField
          control={form.control}
          name="claimReasons"
          render={({ field }) => (
            <FormSelectMine
              field={field}
              selectOption={claimReasons}
              label="Tipo de error"
              description="Seleccione el tipo de error"
            />
          )}
        />

        {/* Número de Orden */}
        <FormField
          control={form.control}
          name="orderNumber"
          render={({ field }) => (
            <FormItemInput
              field={field}
              description="Indique numero de orden"
              label="Numero de Orden"
              type="number"
            />
          )}
        />
        {/* Codigo de envio */}
        <FormField
          control={form.control}
          name="trackingCode"
          render={({ field }) => (
            <FormItemInput
              field={field}
              description="Indique su numero de seguimiento"
              label="Numero de seguimiento"
            />
          )}
        />
        {/* producto SECTION */}
        <div className="flex flex-col gap-10 space-y-4 ">
          {loading1 ? (
            <div>Cargando productos...</div>
          ) : (
            fields.map((field, index) => (
              <div key={field.id} className=" m-4 space-y-4 bg-gray-800 p-4">
                <FormField
                  control={form.control}
                  name={`products.${index}.product`}
                  render={({ field: fieldProps }) => (
                    <FormItem className="flex-grow ">
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
                                (fieldProps.value?.values
                                  ? fieldProps.value?.values[0]?.es
                                  : '') || 'Sin Nombre'
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
                <DrawerDemo
                  index={index}
                  showData={showData}
                  variantDrawer={variantDrawer}
                  productDrawer={productDrawer}
                  setLoadingImage={setLoadingImage}
                  loadingImage={loadingImage}
                  imgRes={imgRes}
                  setImgRes={setImgRes}
                />
                <FormField
                  control={form.control}
                  name={`products.${index}.solution.type`}
                  render={({ field }) => (
                    <FormSelectMine
                      field={field}
                      selectOption={solutions}
                      label="Tipo de Solucion"
                      description="Seleccione el tipo de solucion"
                    />
                  )}
                />
                {form.watch(`products.${index}.variant`)?.sku && (
                  <FormField
                    control={form.control}
                    name={`products.${index}.quantity`}
                    render={({ field: fieldProps }) => (
                      <FormItem className="w-24">
                        <FormLabel>Cantidad</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...fieldProps}
                            onChange={(e) => {
                              const value = parseInt(e.target.value, 10);
                              fieldProps.onChange(isNaN(value) ? 1 : value);
                            }}
                            className="text-center"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch(`products.${index}.solution.type`) ===
                'Cambio de producto' ? (
                  <>
                    <FormField
                      control={form.control}
                      name={`products.${index}.solution.productToChange.product`}
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
                                  {fieldProps.value?.name ||
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
                                    {products.map((product) => (
                                      <CommandItem
                                        key={product.id}
                                        onSelect={() =>
                                          handleReplacementProductSelect(
                                            product,
                                            index
                                          )
                                        }
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            product.name.es ===
                                              fieldProps.value?.name
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
                      name={`products.${index}.solution.productToChange.variant`}
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
                                    {getVariantsForProduct(index).map(
                                      (variant) => (
                                        <CommandItem
                                          key={variant.value.sku}
                                          onSelect={() =>
                                            handleVariantSelectToChange(
                                              variant.value,
                                              index
                                            )
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
                                      )
                                    )}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : null}

                <FormField
                  control={form.control}
                  name={`products.${index}.shippingMethod`}
                  render={({ field }) => (
                    <FormItemInput
                      field={field}
                      description="Ingrese el metodo de envio"
                      label="Metodo de envio"
                    />
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
            className="w-40"
            onClick={() => {
              append({
                solution: {
                  type: ''
                },
                shippingMethod: '',
                product: { name: '', id: '' },
                variant: {
                  name: { es: '' },
                  id: '',
                  price: '',
                  product_id: '',
                  sku: ''
                } as Variant,
                quantity: 1
              });
              setSelectedProducts([...selectedProducts, null]);
            }}
            disabled={loading1}
          >
            Agregar Producto
          </Button>
        </div>

        {/* Comentarios */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItemInput
              field={field}
              description="Agregue cualquier comentario adicional"
              label="Comentarios"
            />
          )}
        />

        {/* costo de envio */}
        <FormField
          control={form.control}
          name="shippingCost"
          render={({ field }) => (
            <FormItemInput
              field={field}
              description="Ingrese el costo de envio"
              label="Costo de Envio"
              type="number"
            />
          )}
        />
        {/* Estado */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormSelectMine
              field={field}
              selectOption={status}
              description="Seleccione el estado en el que se encuentra el reclamo"
              label="Estado"
            />
          )}
        />

        <Button
          type="submit"
          name="default" // Add a name attribute
          className="w-full"
          disabled={loading1}
        >
          {buton}
        </Button>

        <Button
          name="solved"
          variant={'solved'}
          className="w-full"
          type="submit"
          disabled={loading1}
        >
          Marcar Como resuelto
        </Button>
      </form>
    </Form>
  );
}
