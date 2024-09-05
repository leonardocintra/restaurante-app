import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SANDRA_BASE_URL =
  process.env.NEXT_PUBLIC_SANDRA_URL || "http://localhost:3005";
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
