import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { PendingComplaints } from '@/components/tables/pending-tables/client';
import { fetchData, fetchPending } from '@/lib/actions';
import { ChartData } from '@/types/types-mine';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'products', link: '/dashboard/products' }
];

type PendingComplaints = {
  pendingComplaints: any;
};

export default async function page() {
  const data: PendingComplaints = await fetchPending('complaints/pending');

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        {data ? <PendingComplaints data={data.pendingComplaints} /> : 'No data'}
      </div>
    </PageContainer>
  );
}
