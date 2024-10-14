import React from 'react';
import { ButtonsComplaints } from './buttons-complaints';
import { Separator } from '@/components/ui/separator';

export default function ReclamosIndex() {
  return (
    <div className="space-y-4 ">
      <Separator />
      <ButtonsComplaints />
    </div>
  );
}
