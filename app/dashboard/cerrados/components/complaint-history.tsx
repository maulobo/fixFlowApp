import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';

// Definir la estructura de los objetos dentro de updateHistory
interface Change {
  field: string;
  oldValue: string;
  newValue: string;
}

interface Update {
  updatedAt: string;
  updatedBy: string;
  changes: Change[];
}

interface UpdateHistoryProps {
  updateHistory: Update[];
}

export default function UpdateHistory({ updateHistory }: UpdateHistoryProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Historial de Actualizaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border px-4 py-2">Fecha de Actualización</th>
              <th className="border px-4 py-2">Actualizado por</th>
              <th className="border px-4 py-2">Campo</th>
              <th className="border px-4 py-2">Valor Anterior</th>
              <th className="border px-4 py-2">Nuevo Valor</th>
            </tr>
          </thead>
          <tbody>
            {updateHistory.map((update, index) => (
              <React.Fragment key={index}>
                {update.changes.map((change, idx) => (
                  <tr key={idx}>
                    {idx === 0 && (
                      <>
                        <td
                          className="border px-4 py-2"
                          rowSpan={update.changes.length}
                        >
                          {new Date(update.updatedAt).toLocaleString()}
                        </td>
                        <td
                          className="border px-4 py-2"
                          rowSpan={update.changes.length}
                        >
                          {update.updatedBy}
                        </td>
                      </>
                    )}
                    <td className="border px-4 py-2">{change.field}</td>
                    <td className="border px-4 py-2">{change.oldValue}</td>
                    <td className="border px-4 py-2">{change.newValue}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5}>
                    <Separator className="my-4" />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
