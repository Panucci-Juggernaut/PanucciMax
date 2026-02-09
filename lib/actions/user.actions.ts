'use server';

import { signInFormSchema, signUpFormSchema, shippingAddressSchema } from '../validators';
import { auth, signIn, signOut } from '@/auth';
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from 'bcrypt-ts-edge';
import { prisma} from '@/db/prisma'
import { formatError } from '../utils';
import { ShippingAddress } from '@/types';

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

// Get user by the ID
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) throw new Error('User not found');
  return user;
}

// Update the user's address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error('User not found');

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });

    return {
      success: true,
      message: 'User updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}