import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import crypto from 'crypto'; // Para generar el token de verificación
import { connectdb } from '@/lib/dbConnect';
import { sendVerificationEmail } from '@/lib/email'; // Importa tu función de envío de email

import { getTenantFromSubdomain } from '@/lib/tenants'; // Asegúrate de que esta función esté definida
import { getUserModel } from '@/schema/UserSchema';

export async function POST(req: NextRequest) {
  await connectdb();
  console.log('db connected');
  // Define el esquema de validación
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    tenantId: z.string().min(1)
  });

  const parsed = schema.safeParse(await req.json());
  console.log(parsed);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', issues: parsed.error.errors },
      { status: 400 }
    );
  }

  const { name, email, password, tenantId } = parsed.data;
  console.log('Parsed data:', parsed.data);
  console.log(tenantId);

  try {
    const User = getUserModel();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const { emailVerified } = existingUser; // Cambiado a existingUser

      if (!emailVerified) {
        const verificationToken = crypto.randomBytes(32).toString('hex');
        await sendVerificationEmail(email, verificationToken);
        return NextResponse.json(
          {
            message:
              'User already exists but is not verified, check your mail and verify'
          },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }
    }

    // Hash the password before saving it
    const hashedPassword = await hash(password, 10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Save the user to the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      tenantId,
      verificationToken,
      emailVerified: false
    });
    console.log(newUser);

    await newUser.save();

    // Send a verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      {
        message:
          'User created successfully. Please check your email to verify your account.'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Error registering user' },
      { status: 500 }
    );
  }
}
