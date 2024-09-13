import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import crypto from 'crypto'; // Para generar el token de verificación
import { connectdb } from '@/lib/dbConnect';
import { sendVerificationEmail } from '@/lib/email'; // Importa tu función de envío de email
import User from '@/schema/UserSchema';

export async function POST(req: NextRequest) {
  await connectdb();
  console.log('db connected');

  // Define el esquema de validación
  const schema = z.object({
    name: z.string().min(1), // Agrega validación para el nombre
    email: z.string().email(),
    password: z.string().min(6) // Puedes añadir más reglas de validación aquí
  });

  // Validar los datos de entrada
  const parsed = schema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', issues: parsed.error.errors },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;
  console.log(parsed.data);

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('AAA EXISTE');
      const { emailVerified } = await User.findOne({ email });
      console.log(emailVerified);
      if (emailVerified == false) {
        const verificationToken = crypto.randomBytes(32).toString('hex');
        await sendVerificationEmail(email, verificationToken);
        return NextResponse.json(
          {
            message:
              'User Already exists but is not verificated, check your mail and verify'
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

    // Generate a verification token (could be a JWT or random string)
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Save the user to the database
    const newUser = new User({
      name, // Agrega el nombre al nuevo usuario
      email,
      password: hashedPassword,
      verificationToken,
      emailVerified: false // Por defecto, el email no está verificado
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
