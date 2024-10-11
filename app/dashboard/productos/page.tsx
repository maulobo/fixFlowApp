import { fetchProducts } from '@/lib/fetchData';
import { Producto } from '@/types';

import React from 'react';

export default async function page() {
  // const productos: Producto[] = await fetchProducts();
  // const productos: Producto[] = await fetchProducts();

  return (
    <div>
      {/* {productos ? <BlockProducts productos={productos} /> : <p>loading...</p>} */}
    </div>
  );
}
