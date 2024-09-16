import { Breadcrumbs } from '@/components/breadcrumbs';
import { ComplaintForm } from '@/components/forms/complaint-form';

import PageContainer from '@/components/layout/page-container';
import UptadeHistory from '@/components/tables/update-history';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BASE_URL } from '@/constants/data';
import axios from 'axios';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Complaint', link: '/dashboard/complaint' },
  { title: 'Create', link: '/dashboard/complaint/create' }
];

export default async function Page({ params }: any) {
  const { productId } = params;

  let initialData = null;
  let history = null;

  if (productId && productId != 'new') {
    try {
      const response = await fetch(`${BASE_URL}/complaint/${productId}`, {
        cache: 'no-store'
      });
      const res = await response.json();

      initialData = await res.complaint;

      history = await res.updateHistory;
    } catch (error) {
      console.error('Error fetching complaint data:', error);
    }
  }

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ComplaintForm initialData={initialData} key={null} />
      </div>
      {initialData ? <UptadeHistory history={history} /> : null}
    </PageContainer>
  );
}
