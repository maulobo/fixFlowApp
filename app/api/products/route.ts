import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get('sku');

    if (!sku) {
      return NextResponse.json(
        { error: 'El parámetro SKU es requerido' },
        { status: 400 }
      );
    }
    const response = await fetch(
      `https://api.tiendanube.com/v1/965651/products/sku/${sku}`,
      {
        method: 'GET',
        headers: {
          Authentication: 'f3f064765cbd7a4ed2d5e550c382156f2e4d58d3',
          'Content-Type': 'application/json'
        }
      }
    );

    // Verifica si la respuesta es válida
    if (!response.ok) {
      return NextResponse.json(
        { error: `Error en la API: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Devuelve los datos como respuesta JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en la petición a Tienda Nube:', error);
    return NextResponse.json(
      { error: 'Error interno al realizar la solicitud' },
      { status: 500 }
    );
  }
}
