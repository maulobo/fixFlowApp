export const fetchData = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/chart-data`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
