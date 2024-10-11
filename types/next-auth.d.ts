import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type UserSession = DefaultSession['user'];
  interface Session {
    user: UserSession;
  }

  interface CredentialsInputs {
    name: string;
    email: string;
    password: string;
    _id: string;
  }
}
