import { cn } from '@/utils';
import React from 'react';

export default function Button({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      className={cn(
        `bg-blue-200 rounded-md px-1 py-0.5 whitespace-nowrap shrink-0 
        hover:bg-blue-400 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400`,
        className ?? '',
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
