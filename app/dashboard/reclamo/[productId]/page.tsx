import { Breadcrumbs } from '@/components/breadcrumbs';
import { ComplaintForm } from '@/components/forms/complaint-form';

import PageContainer from '@/components/layout/page-container';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BASE_URL } from '@/constants/data';
import axios from 'axios';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
  { title: 'Create', link: '/dashboard/user/create' }
];

export default async function Page({ params }: any) {
  const { productId } = params;

  let initialData = null;

  if (productId && productId != 'new') {
    try {
      const response = await fetch(`${BASE_URL}/complaint/${productId}`);
      initialData = await response.json();
    } catch (error) {
      console.error('Error fetching complaint data:', error);
      // Manejo del error o redirigir a una página de error si es necesario
    }
  }

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ComplaintForm initialData={initialData} key={null} />
      </div>
    </PageContainer>
  );
}
