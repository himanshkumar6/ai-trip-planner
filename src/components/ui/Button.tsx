import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, children, disabled, ...props }, ref) => {

    const variants = {
      default: 'bg-primary-gradient text-white hover:shadow-lift hover:-translate-y-0.5',
      outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground text-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground text-foreground',
      secondary: 'bg-primary/10 text-primary hover:bg-primary/20',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
      link: 'text-primary underline-offset-4 hover:underline',
    };

    const sizes = {
      default: 'h-11 px-6 py-2 rounded-xl',
      sm: 'h-10 rounded-lg px-4',
      lg: 'h-12 rounded-xl px-8',
      icon: 'h-11 w-11 rounded-xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
