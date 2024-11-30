import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Check, ChevronsUpDown, Trash2 } from 'lucide-react';
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
import { useState } from 'react';

// Define a schema for form validation
const formSchema = z.object({
  products: z.array(
    z.object({
      product: z.string().min(1, 'Selecciona un producto'),
      variant: z.string().min(1, 'Selecciona una variante')
    })
  )
});

export function FormTest() {
  // Simulated products data (replace with your actual data fetching logic)
  const [products] = useState([
    {
      name: 'Producto 1',
      variants: [
        { id: '1', name: 'Variante A', sku: 'SKU-001', stock: 10 },
        { id: '2', name: 'Variante B', sku: 'SKU-002', stock: 5 }
      ]
    },
    {
      name: 'Producto 2',
      variants: [
        { id: '3', name: 'Variante X', sku: 'SKU-003', stock: 15 },
        { id: '4', name: 'Variante Y', sku: 'SKU-004', stock: 7 }
      ]
    }
  ]);

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: [{ product: '', variant: '' }]
    }
  });

  // Use field array for dynamic products
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products'
  });

  // Handle product selection
  const handleProductSelect = (productName: string, index: number) => {
    form.setValue(`products.${index}.product`, productName);
    form.setValue(`products.${index}.variant`, '');
  };

  // Handle variant selection
  const handleVariantSelect = (variantId: string, index: number) => {
    form.setValue(`products.${index}.variant`, variantId);
  };

  // Get variants for a selected product
  const getVariantsForProduct = (productName: string) => {
    const product = products.find((p) => p.name === productName);
    return product
      ? product.variants.map((variant) => ({
          label: `${variant.name} - SKU: ${variant.sku}, Stock: ${variant.stock}`,
          value: variant.sku
        }))
      : [];
  };

  // Form submission handler
  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4">
            {/* Product Selection */}
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
                          {fieldProps.value || 'Seleccionar producto'}
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
                                key={product.name}
                                onSelect={() =>
                                  handleProductSelect(product.name, index)
                                }
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    product.name === fieldProps.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {product.name}
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

            {/* Variant Selection */}
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
                          disabled={!form.watch(`products.${index}.product`)}
                        >
                          {fieldProps.value
                            ? getVariantsForProduct(
                                form.watch(`products.${index}.product`)
                              ).find((v) => v.value === fieldProps.value)?.label
                            : 'Seleccionar variante'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-sm">
                      <Command>
                        <CommandInput placeholder="Buscar variante..." />
                        <CommandList>
                          <CommandGroup>
                            {getVariantsForProduct(
                              form.watch(`products.${index}.product`)
                            ).map((variant) => (
                              <CommandItem
                                key={variant.value}
                                onSelect={() =>
                                  handleVariantSelect(variant.value, index)
                                }
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    variant.value === fieldProps.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
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

            {/* Remove Product Button */}
            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                className="self-end"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        {/* Add Product Button */}
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ product: '', variant: '' })}
        >
          Agregar Producto
        </Button>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </Form>
  );
}
