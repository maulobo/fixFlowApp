'use client';
import { BASE_URL } from '@/constants/data';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface UseFetchDataResult<T> {
  data: T | null;
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

export function useFetchData<T>(url: string): UseFetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
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

    fetchData();
  }, [url]);

  return { data, loading, error };
}

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
