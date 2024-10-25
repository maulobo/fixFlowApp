import { Breadcrumbs } from '@/components/breadcrumbs';
import { ComplaintForm } from '@/components/forms/complaint-form';
import PageContainer from '@/components/layout/page-container';
import UptadeHistory from '@/components/tables/update-history';
import { BASE_URL } from '@/constants/data';
import { fetchClaimsById, fetchProducts } from '@/lib/actions';
import { ProductNube } from '@/types/types-tienda-nube';

export default async function Page({ params }: any) {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Reclamos', link: '/dashboard/reclamos' },
    {
      title: `${params.type}`,
      link: `/dashboard/reclamos/${params.type}`
    }
  ];
  const { type } = params;

  let initialData = null;
  let history = null;

  if (type) {
    const reclamos = await fetchClaimsById(type);
    initialData = reclamos?.initialData;
    history = reclamos?.history;
  }

  const products: ProductNube[] = await fetchProducts();

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        {products.length > 1 ? (
          <ComplaintForm
            type={type}
            initialData={initialData}
            products={products}
            key={null}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* si hay data inicial entonces devuelve historial */}
      {initialData ? <UptadeHistory history={history} /> : null}
    </PageContainer>
  );
}
