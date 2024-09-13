import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/client';
import { fetchData } from '@/lib/fetchData';
import { ChartData, Complaint } from '@/types/types-mine';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'products', link: '/dashboard/products' }
];

export default async function page() {
  const data: ChartData = await fetchData('complaints');

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        {data.recentComplaints ? (
          <UserClient data={data.pendingComplaints} />
        ) : (
          'No data'
        )}
      </div>
    </PageContainer>
  );
}
