import { connectdb } from '@/lib/dbConnect';
import { getUserModel } from '@/schema/UserSchema';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  try {
    await connectdb(); // Asegúrate de que la base de datos esté conectada

    // Encuentra el usuario por el token de verificación
    const User = getUserModel();
    const user = await User.findOne({ verificationToken: token });

    if (user) {
      // Actualiza el usuario para establecer verified: true
      user.emailVerified = true;
      user.verificationToken = ''; // Limpia el token después de la verificación
      await user.save();

      return NextResponse.json(
        { message: 'Email verified successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { error: 'Error verifying email' },
      { status: 500 }
    );
  }
}
