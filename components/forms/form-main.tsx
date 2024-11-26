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
  const [searchTerm3, setSearchTerm3] = useState('');
  const [filteredVariants, setFilteredVariants] = useState(variants);
  const [selectedVariant, setSelectedVariant] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setVariants(selectedProduct?.variants);
    }
  }, [selectedProduct]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    const lowerValue = value.toLowerCase();
    const results = variants.filter(
      (variant) =>
        variant.sku.toLowerCase().includes(lowerValue) ||
        variant.values.some(
          (val) =>
            val.en?.toLowerCase().includes(lowerValue) ||
            val.es?.toLowerCase().includes(lowerValue) ||
            val.pt?.toLowerCase().includes(lowerValue)
        )
    );
    setFilteredVariants(results);
  };

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

          <FormItem>
            <FormLabel>Buscar variante</FormLabel>
            <FormControl>
              <div className="relative">
                {/* Input para buscar variantes */}
                <Input
                  placeholder="Buscar por SKU o valor..."
                  value={searchTerm3}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm3(value);

                    // Filtrar variantes basadas en el término de búsqueda
                    const lowerValue = value.toLowerCase();
                    const results = variants.filter(
                      (variant) =>
                        variant.sku.toLowerCase().includes(lowerValue) ||
                        variant.values.some(
                          (val) =>
                            val.en?.toLowerCase().includes(lowerValue) ||
                            val.es?.toLowerCase().includes(lowerValue) ||
                            val.pt?.toLowerCase().includes(lowerValue)
                        )
                    );
                    setFilteredVariants(results); // Actualizar la lista filtrada
                  }}
                  disabled={!selectedProduct || !!selectedVariant} // Desactivar si no hay un producto seleccionado
                />

                {/* Mostrar lista desplegable */}
                {searchTerm3 != '' && !selectedVariant && (
                  <div
                    className="absolute z-10 mt-1 max-h-52 w-full overflow-y-auto rounded-md border border-gray-300 bg-secondary
                   shadow-lg"
                  >
                    {filteredVariants.length > 0 ? (
                      filteredVariants.map((variant: any) => (
                        <div
                          key={variant.sku}
                          onClick={() => {
                            setSelectedVariant(variant);
                            form.setValue('variant', variant.sku); // Setear la variante en el formulario
                            setSearchTerm3(variant.sku);
                          }}
                          className="cursor-pointer px-4 py-2 hover:bg-black"
                        >
                          <div className="text-sm font-medium">
                            SKU: {variant.sku}
                          </div>
                          <div className="text-xs ">
                            {variant.values
                              .map((v: any) => v.en || v.es || v.pt)
                              .join(', ')}
                          </div>
                          <div className="text-xs">
                            Precio: ${variant.price}{' '}
                            {variant.promotional_price && (
                              <span className="text-red-500">
                                (Promoción: ${variant.promotional_price})
                              </span>
                            )}
                          </div>
                          <div className="text-xs">
                            Stock:{' '}
                            {variant.stock > 0 ? variant.stock : 'Agotado'}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No se encontraron variantes
                      </div>
                    )}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading || initialData}
                    placeholder="Cantidad"
                    {...field}
                    value={initialData?.quantity || field.value || ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value, 10) : ''
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medio de envio</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading || initialData}
                    placeholder="Medio de envio"
                    {...field}
                    value={initialData?.shippingMode || field.value || ''}
                  />
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
                <FormLabel>Tracking Code</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="N tracking"
                    {...field}
                    value={initialData?.trackingCode || field.value || ''}
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
              <FormItem className=" ">
                <FormLabel>Comentarios</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Comments"
                    {...field}
                    value={initialData?.comments || field.value || ' '}
                  />
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
                <FormDescription>Seleccione el estado</FormDescription>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={initialData?.status || field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Seleccione"
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
                      } else {
                        setCambio(false);
                      }
                    }}
                    value={initialData?.solutionType || field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Seleccione"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {solutionTypes.map((solutionType) => (
                        <SelectItem key={solutionType} value={solutionType}>
                          {solutionType}
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
            name="product2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producto</FormLabel>
                <FormControl>
                  <div style={{ position: 'relative' }}>
                    <Input
                      disabled={!cambio}
                      placeholder="Buscar nuevo producto"
                      {...field}
                      value={searchTerm2 || initialData?.product2}
                      onChange={(e) => {
                        setSearchTerm2(e.target.value);
                        field.onChange(e.target.value);
                        if (e.target.value === '') {
                          setFilteredProducts2([]);
                        } else {
                          setFilteredProducts2(
                            products.filter((product: any) =>
                              product.name.es
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
                          maxHeight: '200px',
                          overflowY: 'auto'
                        }}
                      >
                        {filteredProducts2.map((product) => (
                          <li
                            key={product.id}
                            onClick={() => {
                              setSearchTerm2(product.name.es);
                              setSelectedProduct2(product);
                              setFilteredProducts2([]);
                              form.setValue('product2', product.name.es);
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
          <FormField
            control={form.control}
            name="variant2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seleccionar variante del nuevo producto</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading || !cambio}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="overflow-hidden align-top">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Selecciona una variante"
                      />
                    </SelectTrigger>
                    <SelectContent className="max-h-52">
                      {variants2.map((variant) => (
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
