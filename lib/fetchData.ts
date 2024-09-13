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
