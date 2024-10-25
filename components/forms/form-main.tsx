'use client';
import React, { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ProductNube, Variant } from '@/types/types-tienda-nube';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ca } from 'date-fns/locale';

const solutionTypes = [
  'Reenvio',
  'Cupon',
  'Devolucion',
  'Regalo',
  'Cambio de producto',
  'Logistica inversa'
];
const statuses = ['Hablado', 'No Hablado', 'Empaquetado'];

export default function FormMain({
  onSubmit,
  markAsResolved,
  initialData,
  products,
  form,
  loading,
  action,
  type
}: any) {
  const [filteredProducts, setFilteredProducts] = useState<ProductNube[]>([]);
  const [filteredProducts2, setFilteredProducts2] = useState<ProductNube[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTerm2, setSearchTerm2] = useState<string>('');
  const [cambio, setCambio] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductNube>();
  const [selectedProduct2, setSelectedProduct2] = useState<ProductNube>();
  const [variants, setVariants] = useState<Variant[]>([]);
  const [variants2, setVariants2] = useState<Variant[]>([]);

  useEffect(() => {
    if (selectedProduct) {
      setVariants(selectedProduct?.variants);
    }
  }, [selectedProduct]);

  console.log(products);
  useEffect(() => {
    if (initialData) {
      const { __v, ...dataWithoutVersion } = initialData; // Excluir '__v'
      for (const key in dataWithoutVersion) {
        form.setValue(key, dataWithoutVersion[key] || '');
      }
    }
  }, [initialData, form]);

  useEffect(() => {
    if (selectedProduct2) {
      setVariants2(selectedProduct2?.variants);
    }
  }, [selectedProduct2]);

  if (initialData) {
    type = initialData.type;
  }

  console.log(selectedProduct);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="gap-8 md:grid md:grid-cols-3">
          <FormField
            control={form.control}
            name="claimReasons"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de reclamo</FormLabel>
                <FormControl>
                  <Input disabled value={initialData?.claimReasons || type} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orderNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de Orden</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading || !!initialData?.orderNumber}
                    placeholder="Order Number"
                    {...field}
                    value={field.value || initialData?.orderNumber || ''}
                    onChange={(e) => field.onChange(e.target.value)}
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
                    <Input
                      autoComplete="off"
                      {...field}
                      disabled={initialData}
                      placeholder="Search product"
                      value={searchTerm || initialData?.product || ''}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        field.onChange(e.target.value); // Aseguramos que el formulario maneje el cambio
                        if (e.target.value === '') {
                          setFilteredProducts([]);
                        } else {
                          setFilteredProducts(
                            products.filter((product: any) =>
                              product.name.es
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
                          maxHeight: '200px',
                          overflowY: 'auto'
                        }}
                      >
                        {filteredProducts.map((product, i) => (
                          <li
                            key={`${i}_${product.id}`}
                            onClick={() => {
                              setSearchTerm(product.name.es);
                              form.setValue('product', product.name.es); // Setea el valor en el formulario
                              setSelectedProduct(product); // Seleccionamos el producto y actualizamos variantes
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
                            {product.name.es}
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
          {/* <FormField
            control={form.control}
            name="filter"
            render={({ field }) => {
              <FormItem>
                <FormLabel>Seleccione modelo</FormLabel>
                <FormControl>
                  <Input value={field.value || initialData?.filter} />
                </FormControl>
              </FormItem>;
            }}
          /> */}

          <FormField
            control={form.control}
            name="variant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seleccionar variante</FormLabel>
                <FormControl>
                  <Select
                    disabled={initialData?.variant?.sku || initialData}
                    onValueChange={field.onChange} // Pasa el objeto directamente
                    value={field.value || initialData?.variant || ''} // Utiliza el objeto completo
                  >
                    <SelectTrigger className="overflow-hidden align-top">
                      {/* Muestra el SKU o el placeholder */}
                      <span>
                        {field.value?.sku ||
                          initialData?.variant?.sku ||
                          'Selecciona una variante'}
                      </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-52">
                      {variants.map((variant) => (
                        <SelectItem key={variant.sku} value={variant.sku}>
                          <div className="flex flex-col">
                            <span>SKU: {variant.sku}</span>
                            {variant.values.map((value, index) => (
                              <span key={index}>
                                {value.en || value.es || value.pt}{' '}
                              </span>
                            ))}
                            <span>Precio: ${variant.price}</span>
                            {variant.promotional_price && (
                              <span className="text-red-500">
                                Promoción: ${variant.promotional_price}
                              </span>
                            )}
                            <span>
                              Stock:{' '}
                              {variant.stock > 0 ? variant.stock : 'Agotado'}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <Button disabled={loading} type="submit">
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
