import { CredentialsInputs, NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { z } from 'zod';
import { connectdb } from './lib/dbConnect';
import User from './schema/UserSchema';
import { compare } from 'bcryptjs';

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

        try {
          console.log(email, password);
          const user = await User.findOne({ email });
          console.log(user);
          if (!user) {
            throw new Error('Invalid credentials');
          }
          const isPasswordValid = await compare(password, user.passwordHash);
          if (!isPasswordValid) {
            throw new Error('Invalid credentials');
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email
          };
        } catch (error) {
          console.error('Failed to authenticate user:', error);
          throw new Error('Failed');
        }
      }
    })
  ],
  pages: {
    signIn: '/', //signin pages
    newUser: '/signup'
  },
  secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthConfig;

export default authConfig;
