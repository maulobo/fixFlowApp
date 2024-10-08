import { BASE_URL } from '@/constants/data';

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
