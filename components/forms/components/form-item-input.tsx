import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormItemInputType = {
  field: any;
  description: string;
  label: string;
};

export const FormItemInput = ({
  field,
  description,
  label
}: FormItemInputType) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input type="text" placeholder="Ejemplo: 12345" {...field} />
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
