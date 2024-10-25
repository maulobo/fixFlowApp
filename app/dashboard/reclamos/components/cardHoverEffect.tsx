'use client';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { tiposdereclamo } from '../reclamos-contants';

export function CardHoverEffectDemo() {
  return (
    <div className="mx-auto max-w-5xl px-8">
      <HoverEffect items={tiposdereclamo} />
    </div>
  );
}
