'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import GoogleSignInButton from '../github-auth-button';
import Link from 'next/link';
import { URL } from '@/constants/data';
import { useToast } from '../ui/use-toast';

// Define schema for sign in
const signInSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter'
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
});

// Define schema for sign up
const signUpSchema = signInSchema.extend({
  name: z.string().min(1, { message: 'Name is required' }) // Add name field for sign up
});

type UserFormValue =
  | z.infer<typeof signInSchema>
  | z.infer<typeof signUpSchema>;

interface UserAuthFormProps {
  isSignup?: boolean; // Prop to differentiate between sign up and sign in
}

export default function UserAuthForm({ isSignup }: UserAuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(isSignup ? signUpSchema : signInSchema),
    defaultValues: {
      email: '', // Define initial value to ensure controlled input
      password: '', // Define initial value to ensure controlled input
      ...(isSignup && { name: '' }) // Ensure 'name' has an initial value if in sign-up mode
    }
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);

    if (isSignup) {
      try {
        const response = await fetch(`${URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const result = await response.json();

        if (response.ok) {
          toast({
            variant: 'success',
            title: 'Account Created',
            description: 'Please check your email to verify your account.'
          });
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error || 'An error occurred. Please try again.'
          });
        }
      } catch (error) {
        console.error(error);
      }
      // Example: await registerUser(data);
    } else {
      await signIn('credentials', {
        email: data.email as string,
        password: data.password as string,
        callbackUrl: callbackUrl ?? '/dashboard'
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          {isSignup && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                    autoComplete="your-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    disabled={loading}
                    {...field}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton />
      {!isSignup && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Dont have an account?{' '}
            <Link href="/signup" className="text-primary underline">
              Sign Up
            </Link>
          </p>
        </div>
      )}
      {isSignup && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/" className="text-primary underline">
              Sign In
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
