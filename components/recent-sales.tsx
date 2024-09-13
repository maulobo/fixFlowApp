import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Complaint } from '@/types/types-mine';
import { format } from 'date-fns';

interface RecentSalesProps {
  added: Complaint[];
}

export function RecentSales({ added }: RecentSalesProps) {
  return (
    <div className="space-y-8">
      {added.map((complaint, i) => (
        <div key={`${i}_product`} className="flex items-center">
          {/* <Avatar className="h-9 w-9">
            <AvatarImage src={product.} alt="Avatar" />
            <AvatarFallback></AvatarFallback>
          </Avatar> */}
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {complaint.product}
            </p>
            <p className="text-sm text-muted-foreground">{complaint.status}</p>
            <p className="text-sm text-muted-foreground">
              {complaint.solutionType}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {format(new Date(complaint.updatedAt), "d'/'MM'/'yyyy, HH:mm")}
          </div>
        </div>
      ))}
    </div>
  );
}
