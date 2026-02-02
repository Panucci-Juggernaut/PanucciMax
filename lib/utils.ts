import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// convert a prisma object into a regular javascript object
export function convertToPlainObject<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}  
