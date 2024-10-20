import PageContainer from '@/components/layout/page-container';

import { getClosed } from '@/lib/fetchData';
import { Complaint } from '@/types/types-mine';
import HistoyPage from './history-page';

// Elementos del breadcrumb
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'products', link: '/dashboard/products' }
];

export default async function Page() {
  const historyComplaints: Complaint[] = await getClosed();

  return (
    <PageContainer>
      {historyComplaints.length ? (
        <HistoyPage historyComplaints={historyComplaints} />
      ) : (
        <p>No task history available</p>
      )}
    </PageContainer>
  );
}
