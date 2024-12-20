'use client';
import { BASE_URL, URL } from '@/constants/data';
import { DataStructure } from '@/types/types-dashboard';
import { ProductNube } from '@/types/types-tienda-nube';
import { IconChessKing } from '@tabler/icons-react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface UseFetchDataResult {
  data: DataStructure | null;
  loading: boolean;
  error: string | null;
}

export const useFetchDataMine = async (token: string | null | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/dashboard-data`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching claim reasons:', error);
  }
};

export const useFetchData = (url: string): UseFetchDataResult => {
  const [data, setData] = useState<null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();

  console.log(data);

  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(`${BASE_URL}/${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.sessionToken}` // Incluye el token en los encabezados
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(url);
  }, [url]);

  return { data, loading, error };
};

export const useDeleteById = async (productId: any, token: any) => {
  try {
    const res = await fetch(`${BASE_URL}/complaints/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });

    if (!res.ok) {
      throw new Error('failed to delete product');
    }

    const result = await res.json();

    return result;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const useGetProducts = () => {
  const [productsReceipt, setProductsReceipt] = useState<any>([]);
  const [loading1, setLoading1] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          cache: 'default'
        });
        const proddd = await res.json();

        setProductsReceipt(proddd);

        if (!res.ok) {
          throw new Error(`Fetching failed`);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError('Ocurrio un error');
        } else {
          setError('Ocurrió un error '); // Para otros casos
        }
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading1(false); // Asegúrate de desactivar el estado de carga
      }
    };

    fetchProducts();
  }, []);

  return { productsReceipt, loading1, error };
};

export const useGetImages = async (
  variantId: number,
  productId: number
): Promise<any> => {
  const [image, setImage] = useState<any>([]);
  const [loading1, setLoading1] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/products/images?variantId=${variantId}&productId=${productId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        const images = await res.json();

        setImage(images);

        if (!res.ok) {
          throw new Error(`Fetching failed`);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError('Ocurrio un error');
        } else {
          setError('Ocurrió un error '); // Para otros casos
        }
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading1(false); // Asegúrate de desactivar el estado de carga
      }
    };

    fetchImages();
  }, []);

  return { image, loading1, error };
};
