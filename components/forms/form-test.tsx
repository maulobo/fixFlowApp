import React, { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
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
import { formFields, solutionTypes, statuses } from './constants-form';

export default function FormTest({
  onSubmit,
  initialData,
  products,
  form,
  loading,
  action
}: any) {
  const [filteredProducts, setFilteredProducts] = useState<ProductNube[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductNube | null>(
    null
  );
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [variantInputValue, setVariantInputValue] = useState<string>(''); // Para el input de la variante

  useEffect(() => {
    if (selectedProduct) {
      setVariants(selectedProduct.variants);
    } else {
      setVariants([]);
    }
  }, [selectedProduct]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = products.filter((product: ProductNube) =>
      product.name.es.toLowerCase().includes(searchValue)
    );

    setFilteredProducts(filtered);
  };

  const handleSelectProduct = (product: ProductNube) => {
    setSelectedProduct(product);
    setSearchTerm(product.name.es); // Setea el término de búsqueda con el nombre del producto seleccionado
    setFilteredProducts([]); // Limpia los productos filtrados
    setSelectedVariant(null); // Limpia la variante seleccionada
    setVariantInputValue(''); // Limpia el valor del input de la variante
  };

  const handleSelectVariant = (variant: Variant) => {
    setSelectedVariant(variant);
    setVariantInputValue(''); // Resetea el valor del input al seleccionar una variante
  };

  const renderFormFields = (fields: any) => {
    return fields.map((fieldConfig: any) => {
      const { name, formLabel, placeholder, type, required } = fieldConfig;

      switch (type) {
        case 'input':
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabel}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        case 'search':
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabel}</FormLabel>
                  <FormControl>
                    <div style={{ position: 'relative' }}>
                      <Input
                        autoComplete="off"
                        {...field}
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={handleSearch}
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
                              onClick={() => handleSelectProduct(product)}
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
          );
        case 'variantInput':
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabel}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!selectedVariant || loading}
                      placeholder={placeholder}
                      value={variantInputValue}
                      onChange={(e) => {
                        setVariantInputValue(e.target.value);
                        field.onChange(e.target.value); // Actualiza el valor en el formulario
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        case 'variantSelect':
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabel}</FormLabel>
                  <FormControl>
                    <Select
                      disabled={!selectedProduct || loading}
                      onValueChange={(value) => {
                        const variant = variants.find(
                          (v) => v.id.toString() == value
                        );
                        if (variant) handleSelectVariant(variant);
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una variante" />
                      </SelectTrigger>
                      <SelectContent>
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
          );
        case 'select':
          return (
            <FormField
              key={name}
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabel}</FormLabel>
                  <FormDescription>Selecciona el estado</FormDescription>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((statusOption: string) => (
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
          );
        case 'selectSolution':
          return (
            <FormField
              key={name}
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabel}</FormLabel>
                  <FormDescription>Selecciona el estado</FormDescription>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {solutionTypes.map((statusOption: string) => (
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
          );

        default:
          return null;
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        {renderFormFields(formFields)}
        <Button type="submit" disabled={loading}>
          {action}
        </Button>
      </form>
    </Form>
  );
}
