import { ReactNode } from 'react';
import { cn } from '@/lib/utils'; // Will be created soon

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('container mx-auto px-4 md:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
