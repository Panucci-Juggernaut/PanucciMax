import { ZodError } from 'zod';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// convert a prisma object into a regular javascript object
export function convertToPlainObject<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}  

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any): string {
  // Zod error
  if (error instanceof ZodError) {
    return error.issues
      .map((issue) => issue.message)
      .join('. ');
  }
  // Prisma unique constraint error
  if (
    error.name === 'PrismaClientKnownRequestError' &&
    error.code === 'P2002'
  ) {
    return 'email already exists';
  }
  // Fallback
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong';
}

// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error('Value is not a number or string');
  }
}
