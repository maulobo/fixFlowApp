'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddnewButon() {
  const router = useRouter();
  return (
    <Button
      className="
          text-xs md:text-sm"
      onClick={() => router.push(`/dashboard/reclamos`)}
    >
      <Plus className="mr-2 h-4 w-4" /> Nuevo Reclamo
    </Button>
  );
}
