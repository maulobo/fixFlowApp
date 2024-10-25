import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { PendingComplaints } from '@/components/tables/user-tables/client';
import { fetchData } from '@/lib/actions';
import { ChartData, Complaint } from '@/types/types-mine';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'products', link: '/dashboard/products' }
];

export default async function page() {
  const data: ChartData = await fetchData('dashboard-data');

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        {data.recentComplaints ? (
          <PendingComplaints data={data.pendingComplaints} />
        ) : (
          'No data'
        )}
      </div>
    </PageContainer>
  );
}
