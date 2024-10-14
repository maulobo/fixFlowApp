'use client';
import { ButtonsCard } from '@/components/ui/tailwindcss-buttons';
import Link from 'next/link';
import React from 'react';

// este errors podria venir del back
import { errorTypeButtons } from '../buttons-contants';

export function ButtonsComplaints() {
  return (
    <div className="w-full px-4 pb-40">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1  gap-10 md:grid-cols-2 lg:grid-cols-3">
        {errorTypeButtons.map((button, idx) => (
          <Link href={`reclamos/${button.href}`} key={idx}>
            {button.component}
          </Link>
        ))}
      </div>
    </div>
  );
}
