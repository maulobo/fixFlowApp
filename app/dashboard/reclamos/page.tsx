import React from 'react';

import PageContainer from '@/components/layout/page-container';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import ReclamosIndex from './components/reclamos-index';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Complaint', link: '/dashboard/complaint' }
];
const title = 'Elija el tipo de reclamo';
const description = 'alguna description';

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading title={title} description={description} />
        <ReclamosIndex />
      </div>
    </PageContainer>
  );
}
