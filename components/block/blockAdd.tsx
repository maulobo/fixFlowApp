'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function BlockAdd() {
  return (
    <Card className="sm:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle>Add Products</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Click here to add a new Product
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Create New Order</Button>
      </CardFooter>
    </Card>
  );
}
