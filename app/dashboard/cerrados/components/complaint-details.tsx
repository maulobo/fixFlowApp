import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Complaint } from '@/types/types-mine';
import React from 'react';

interface ComplaintDetailsProps {
  complaint: Complaint;
}

export default function ComplaintDetails({ complaint }: ComplaintDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles de la Queja</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Número de Pedido:</strong> {complaint.orderNumber}
        </p>
        <p>
          <strong>Fecha:</strong>{' '}
          {new Date(complaint.dateTime).toLocaleDateString()}
        </p>
        <p>
          <strong>Producto:</strong> {complaint.product}
        </p>
        <p>
          <strong>Comentarios:</strong> {complaint.comments}
        </p>
        <p>
          <strong>Código de Seguimiento:</strong> {complaint.trackingCode}
        </p>
        <p>
          <strong>Razón del Reclamo:</strong> {complaint.claimReasons}
        </p>
        <p>
          <strong>Estado:</strong> {complaint.status}
        </p>
        <p>
          <strong>Tipo de Solución:</strong> {complaint.solutionType}
        </p>
        <p>
          <strong>Costo de Envío:</strong> ${complaint.shippingCost}
        </p>
        <p>
          <strong>Ubicación de Detección:</strong> {complaint.detectionLocation}
        </p>
        <p>
          <strong>Cliente:</strong> {complaint.customer}
        </p>
        <p>{/* <strong>Envío:</strong> {complaint.shippingTypes} */}</p>
        <p>
          <strong>Cerrado:</strong> {complaint.isClosed ? 'Sí' : 'No'}
        </p>
        <p>
          <strong>Fecha de Creación:</strong>{' '}
          {new Date(complaint.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Última Actualización:</strong>{' '}
          {new Date(complaint.updatedAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
