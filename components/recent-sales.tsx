import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Product } from '@/types/types-mine';

interface RecentSalesProps {
  added: Product[];
}

export function RecentSales({ added }: RecentSalesProps) {
  return (
    <div className="space-y-8">
      {added.map((product, i) => (
        <div key={`${i}_product`} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={product.image} alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{product.nombre}</p>
            <p className="text-sm text-muted-foreground">{product.created}</p>
          </div>
          <div className="ml-auto font-medium">{product.categoria}</div>
        </div>
      ))}
    </div>
  );
}
