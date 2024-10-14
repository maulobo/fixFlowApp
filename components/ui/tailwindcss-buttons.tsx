'use client';
import React from 'react';
import { IconClipboard } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const ButtonsCard = ({
  children,
  className,
  href
}: {
  children?: React.ReactNode;
  className?: string;
  href?: string;
}) => {
  return <Link href={`/dashboard/reclamos/${href}`}>{children} </Link>;
};
