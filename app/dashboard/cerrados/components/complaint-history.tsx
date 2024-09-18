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
        {updateHistory.map((update, index) => (
          <div key={index}>
            <p>
              <strong>Fecha de Actualización:</strong>{' '}
              {new Date(update.updatedAt).toLocaleString()}
            </p>
            <p>
              <strong>Actualizado por:</strong> {update.updatedBy}
            </p>
            <Separator className="my-2" />

            {/* Mostrar los cambios realizados */}
            <div>
              {update.changes.map((change, idx) => (
                <div key={idx} className="mb-2">
                  <p>
                    <strong>Campo:</strong> {change.field}
                  </p>
                  <p>
                    <strong>Valor anterior:</strong> {change.oldValue}
                  </p>
                  <p>
                    <strong>Nuevo valor:</strong> {change.newValue}
                  </p>
                  <Separator className="my-1" />
                </div>
              ))}
            </div>
            <Separator className="my-4" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
