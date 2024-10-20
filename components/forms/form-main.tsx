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

export default function FormMain({
  onSubmit,
  markAsResolved,
  initialData,
  products,
  form,
  loading,
  action
}: any) {
  const [filteredProducts, setFilteredProducts] = useState<ProductNube[]>([]);
  const [filteredProducts2, setFilteredProducts2] = useState<ProductNube[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTerm2, setSearchTerm2] = useState<string>('');
  const [cambio, setCambio] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductNube>();
  const [selectedReason, setSelectedReason] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setVariants(selectedProduct?.variants);
    }
  }, [selectedProduct]);
  const [variants, setVariants] = useState<Variant[]>([]);

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
                <FormLabel>Razon del reclamo</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={(value) => {
                      field.onChange(value); // Esto actualiza el valor en el formulario
                      setSelectedReason(value); // Esto actualiza el estado local
                    }}
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
                        {filteredProducts.map((product) => (
                          <li
                            key={product.id}
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
                  <Input disabled={loading} placeholder="Comments" {...field} />
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
                                form.setValue('productChange', product.name.es); // Actualiza el valor correcto en el formulario
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
            {action}
          </Button>
        )}
      </form>
    </Form>
  );
}
