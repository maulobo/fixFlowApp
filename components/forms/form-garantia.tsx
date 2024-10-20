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
import { Label } from '../ui/label';

const solutionTypes = [
  'Reenvio',
  'Cupon',
  'Devolucion',
  'Regalo',
  'Cambio de producto',
  'Logistica inversa'
];
const statuses = ['Hablado', 'No Hablado', 'Empaquetado'];

export default function FormGarantia({
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

  useEffect(() => {
    if (selectedProduct2) {
      setVariants2(selectedProduct2?.variants);
    }
  }, [selectedProduct2]);

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
                  <Input disabled value={field.value || type} />
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
                    disabled={loading || initialData}
                    placeholder="Order Number"
                    {...field}
                    value={field.value || ''}
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
                      placeholder="Search product"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
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
                              form.setValue('product', product.name.es);
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

          {/* Select para mostrar variantes si hay variantes disponibles */}
          {variants.length > 0 && (
            <FormField
              control={form.control}
              name="variant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seleccionar variante</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
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
                      <SelectContent className="max-h-52 ">
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
          )}

          <FormField
            control={form.control}
            name="trackingCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tracking Code</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading || initialData}
                    placeholder="N tracking"
                    {...field}
                    value={field.value || ''}
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
                    disabled={loading || initialData}
                    placeholder="Comments"
                    {...field}
                    value={field.value || ' '}
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
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a solution"
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
          {cambio && (
            <FormField
              control={form.control}
              name="product2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producto</FormLabel>
                  <FormControl>
                    <div style={{ position: 'relative' }}>
                      <Input
                        placeholder="Buscar nuevo producto"
                        {...field}
                        value={searchTerm2}
                        onChange={(e) => {
                          setSearchTerm2(e.target.value);
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
                      {variants2.length > 0 && (
                        <FormField
                          control={form.control}
                          name="variant2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Seleccionar variante del nuevo producto
                              </FormLabel>
                              <FormControl>
                                <Select
                                  disabled={loading}
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
                                      <SelectItem
                                        key={variant.sku}
                                        value={variant.sku}
                                      >
                                        <div className="flex flex-col">
                                          <span>SKU: {variant.sku}</span>
                                          {variant.values.map(
                                            (value, index) => (
                                              <span key={index}>
                                                {value.en ||
                                                  value.es ||
                                                  value.pt}{' '}
                                              </span>
                                            )
                                          )}
                                          <span>Precio: ${variant.price}</span>
                                          {variant.promotional_price && (
                                            <span className="text-red-500">
                                              Promoción: $
                                              {variant.promotional_price}
                                            </span>
                                          )}
                                          <span>
                                            Stock:{' '}
                                            {variant.stock > 0
                                              ? variant.stock
                                              : 'Agotado'}
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
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <Button disabled={loading} type="submit">
          {action}
        </Button>
      </form>
    </Form>
  );
}
