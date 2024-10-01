import { CredentialsInputs, NextAuthConfig, User } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { z } from 'zod';

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
        ): Promise<CredentialsInputs | undefined> {
          try {
            const user = {
              email: email,
              password: password
            };

            return user;
          } catch (error) {
            console.log('failed to found user:', error);
            throw new Error('Failed');
          }
        }

        const user = await getUser(email);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  pages: {
    signIn: '/', //sigin pages
    newUser: '/signup'
  },
  secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthConfig;

export default authConfig;
