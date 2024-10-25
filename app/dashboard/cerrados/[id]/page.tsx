import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { BASE_URL } from '@/constants/data';
import { getOneHistory } from '@/lib/actions';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import ComplaintDetails from '../components/complaint-details';
import UpdateHistoryes from '../components/complaint-history';

// Elementos del breadcrumb

export const revalidate = 0;

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Historial', link: '/dashboard/historial' }
];

export default async function Page({ params }: Params) {
  const { id } = params;

  const { complaint, updateHistory } = await getOneHistory(`complaint/${id}`);

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbItems} />
      <Heading
        title={`Cambios realizados (${updateHistory.length})`}
        description="Manage products"
      />
      <Separator />

      <ComplaintDetails complaint={complaint} />

      <UpdateHistoryes updateHistory={updateHistory} />
    </PageContainer>
  );
}
