'use client';

import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export default function UpdateHistory({ history }: any) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial</CardTitle>
        <CardDescription>
          A continuación se muestra el historial del reclamo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:block">Usuario</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Input</TableHead>
              <TableHead className="hidden md:block">Valor viejo</TableHead>
              <TableHead className="hidden md:block"> Valor nuevo</TableHead>
            </TableRow>
          </TableHeader>

          {history &&
            history.map((his: any, index: number) =>
              his.changes.map((change: any, changeIndex: number) => (
                <TableBody key={`${index}-${changeIndex}`}>
                  <TableRow>
                    <TableCell className="hidden md:block">
                      {his.updatedBy.split('@', 1)}
                    </TableCell>
                    <TableCell>
                      {new Date(his.updatedAt).toLocaleString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}
                    </TableCell>
                    <TableCell>{change.field}</TableCell>
                    <TableCell className="hidden md:block">
                      {change.oldValue !== null
                        ? change.oldValue.toString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:block">
                      {change.newValue !== null
                        ? change.newValue.toString()
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            )}
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          size="sm"
          variant="destructive"
          className="gap-1"
          onClick={() => router.refresh()}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Actualizar historial
        </Button>
      </CardFooter>
    </Card>
  );
}
