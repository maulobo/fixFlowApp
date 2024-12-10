import { Breadcrumbs } from '@/components/breadcrumbs';
import { ComplaintForm } from '@/components/forms/complaint-form';
import PageContainer from '@/components/layout/page-container';
import UptadeHistory from '@/components/tables/update-history';
import { fetchClaimsById, fetchProducts } from '@/lib/actions';

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string };
}) {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Reclamos', link: '/dashboard/reclamos' },
    {
      title: `${searchParams.id}`,
      link: `/dashboard/reclamos/${searchParams.id}`
    }
  ];
  const { id } = searchParams;

  let initialData = null;
  let history = null;

  if (id) {
    const reclamos = await fetchClaimsById(id);
    initialData = reclamos?.initialData;
    history = reclamos?.history;
  }

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ComplaintForm initialData={initialData} key={null} />
      </div>
      {/* si hay data inicial entonces devuelve historial */}
      {initialData ? <UptadeHistory history={history} /> : null}
    </PageContainer>
  );
}
