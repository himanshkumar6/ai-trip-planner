import * as React from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        <select
          ref={ref}
          className={cn(
            'appearance-none flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-accent',
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 opacity-40 group-hover:opacity-70 transition-opacity" />
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
