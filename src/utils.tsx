import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// tailwind에 동적으로 클래스이름 할당할 때 필요
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

export function formatDecimal(
  number: number | string,
  decimal: number = 3,
): string {
  if (typeof number === 'string') return number;

  return number.toFixed(decimal);
}
