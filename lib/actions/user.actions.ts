'use server';

import { signInFormSchema, signUpFormSchema } from '../validators';
import { signIn, signOut } from '@/auth';
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from 'bcrypt-ts-edge';
import { prisma} from '@/db/prisma'
import { formatError } from '../utils';

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    });


    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: 'Invalid email or password' };
  }
}

// Sign the user out
export async function signOutUser() {
  await signOut();
}

// Sign up a new user
export async function signUpUser(
  prevState: unknown,
  formData: FormData
) {
  // console.log([...formData.entries()]);

  try {
    const newUser = signUpFormSchema.parse({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
    });
    const hashedPassword = hashSync(newUser.password, 10);

    await prisma.user.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
      },
    });
    await signIn('credentials', {
      email: newUser.email,
      password: newUser.password,
    });

    return { success: true, message: 'Account created successfully' };
  } catch (error) {
    console.log(error)
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}