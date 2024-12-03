import {
  FormControl,
  FormDescription,
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

type SelectOption = {
  value: string;
  label: string;
};

interface ForMSelectMine {
  label: string;
  field: any;
  selectOption: SelectOption[];
  description: string;
}

export const FormSelect = ({
  label,
  field,
  selectOption,
  description
}: ForMSelectMine) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el tipo de error" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {selectOption.map((item: any, i: number) => (
            <SelectItem value={item.label} key={`${item}_${i}`}>
              {item.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
