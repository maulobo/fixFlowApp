import { CredentialsInputs, NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { z } from 'zod';
import { connectdb } from './lib/dbConnect';
import { getUserModel } from './schema/UserSchema';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        },
        name: {
          type: 'string'
        }
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error('Invalid credentials');
        }

        const { email, password } = parsedCredentials.data;

        async function getUser(
          email: string
        ): Promise<CredentialsInputs | null> {
          try {
            await connectdb();
            const User = getUserModel();
            const user = await User.findOne({ email });

            return user;
          } catch (error) {
            console.error('Failed to find user:', error);
            throw new Error('Failed to find user');
          }
        }

        const user = await getUser(email);
        if (!process.env.JWT_SECRET) {
          throw new Error(
            'JWT_SECRET is not defined in the environment variables'
          );
        }

        if (user) {
          const isPasswordValid = await compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }
          // Asegúrate de que aquí obtienes el ID del usuario correctamente
          return {
            id: user._id.toString(), // Asegúrate de que `user._id` sea un string
            email: user.email,
            name: user.name // Si tienes un campo `name`, también puedes devolverlo
          };
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name
        };

        const customToken = jwt.sign(payload, process.env.JWT_SECRET!, {
          expiresIn: '220m',
          algorithm: 'HS256'
        });

        token.customToken = customToken;
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id as string; // ID del usuario
        session.user.name = token.name as string; // Nombre del usuario
        session.user.email = token.email as string; // Email del usuario
        session.sessionToken = token.customToken as string; // Token personalizado
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt', // Usar JWT para manejar las sesiones
    maxAge: 150 * 60, // 150 minutos en segundos
    updateAge: 24 * 60 * 60 // Opcional: refrescar sesión cada 24 horas
  },
  pages: {
    signIn: '/signin', // Página de inicio de sesión
    newUser: '/signup' // Página de registro
  },

  secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthConfig;

export default authConfig;
