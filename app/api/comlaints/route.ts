// app/api/complaints/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'https://your-base-url';

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const res = await axios.post(`${BASE_URL}/complaints/add`, body);
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear la queja' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...data } = body;

  try {
    const res = await axios.post(`${BASE_URL}/complaints/edit/${id}`, data);
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar la queja' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await axios.delete(`${BASE_URL}/complaints/${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar la queja' },
      { status: 500 }
    );
  }
}
