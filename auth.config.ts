import { CredentialsInputs, NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { z } from 'zod';
import { connectdb } from './lib/dbConnect';
import { getUserModel } from './schema/UserSchema';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
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
            console.log('Failed to find user:', error);
            throw new Error('Failed to find user');
          }
        }

        const user = await getUser(email);

        if (user) {
          // Aquí deberías verificar la contraseña
          // Por ejemplo: if (await bcrypt.compare(password, user.password)) {
          //   return user;
          // }
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/', //signin page
    newUser: '/signup'
  },
  secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthConfig;

export default authConfig;
