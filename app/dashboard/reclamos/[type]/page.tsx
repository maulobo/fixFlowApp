import { Breadcrumbs } from '@/components/breadcrumbs';
import { ComplaintForm } from '@/components/forms/complaint-form';
import PageContainer from '@/components/layout/page-container';
import UptadeHistory from '@/components/tables/update-history';
import { BASE_URL } from '@/constants/data';
import { fetchProducts } from '@/lib/fetchData';
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
  const { productId } = params;
  const { type } = params;

  let initialData = null;
  let history = null;

  if (productId && productId != 'new') {
    try {
      const response = await fetch(`${BASE_URL}/complaint/${productId}`, {
        cache: 'no-store'
      });
      const res = await response.json();
      if (res.success === false) return;

      initialData = await res.complaint;
      history = await res.updateHistory;
    } catch (error) {
      console.error('Error fetching complaint data:', error);
    }
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
