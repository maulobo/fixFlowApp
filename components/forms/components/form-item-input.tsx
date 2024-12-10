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
  type?: string;
};

export const FormItemInput = ({
  field,
  description,
  label,
  type = 'text'
}: FormItemInputType) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type={type}
          placeholder=""
          {...field}
          onChange={(e) => {
            const value =
              type === 'number'
                ? parseFloat(e.target.value) || undefined
                : e.target.value;
            field.onChange(value);
          }}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};
