import { auth } from '@/auth';
import { BASE_URL } from '@/constants/data';
import { Claim, SolutionType } from '@/types/types-mine';
import { ProductNube } from '@/types/types-tienda-nube';

const url = 'https://api.tiendanube.com/v1/965651/products?limit=20';

export const fetchData = async (url: string) => {
  const session = await auth();
  const token = session?.sessionToken;

  try {
    const res = await fetch(`${process.env.BASE_URL}/${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};
// este creo que deberia esta en hooks
export const fetchDataClient = async (url: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, {
      method: 'GET',
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getOneHistory = async (url: string) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/${url}`, {
      method: 'GET',

      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/products`);
    console.log(res);
    if (!res.ok) {
      throw new Error(`Fetching ${url} failed`);
    }
    // const products: ProductNube[] = await res.json();

    return res;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

export const getClosed = async (): Promise<Claim[]> => {
  const session = await auth();
  const token = session?.sessionToken;
  try {
    const response = await fetch(`${BASE_URL}/get-history`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch task history');
    }
    const data = await response.json();
    const historyComplaints = data.history;
    return historyComplaints;
  } catch (error) {
    console.error('Validation error:', error);
    throw new Error('Invalid data ');
  }
};

export const fetchClaimsById = async (productId: any) => {
  const session = await auth();
  const token = session?.sessionToken;
  try {
    const response = await fetch(`${BASE_URL}/complaints/${productId}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const res = await response.json();
    if (res.success === false) return;

    let initialData = await res.complaint,
      history = await res.updateHistory;

    return { initialData, history };
  } catch (error) {
    console.error('Error fetching complaint data:', error);
  }
};

export const getSolutionsTypes = async (): Promise<SolutionType[]> => {
  return [
    { value: 'Reenvio', label: 'Reenvio' },
    { value: 'Cupon', label: 'cupon' },
    { value: 'Devolucion', label: 'devolucion' },
    { value: 'Regalo', label: 'regalo' },
    { value: 'Cambio de producto', label: 'cambio_de_producto' },
    { value: 'Logistica inversa', label: 'logistica_inversa' }
  ];
};