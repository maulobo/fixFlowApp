import { BASE_URL } from '@/constants/data';
import { ProductNube } from '@/types/types-tienda-nube';
const url = 'https://api.tiendanube.com/v1/965651/products?limit=20',
  token = 'f3f064765cbd7a4ed2d5e550c382156f2e4d58d3',
  User = 'FixFlow (maurolobo.ml@gmail.com)';

export const fetchData = async (url: string) => {
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
    const res = await fetch(
      'https://api.tiendanube.com/v1/965651/products?per_page=100',
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authentication: `f3f064765cbd7a4ed2d5e550c382156f2e4d58d3`,
          'User-Agent': 'FixFlow (maurolobo.ml@gmail.com)'
        }
      }
    );
    // console.log(res);
    if (!res.ok) {
      throw new Error(`Fetching ${url} failed`);
    }
    const products: ProductNube[] = await res.json();

    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};
