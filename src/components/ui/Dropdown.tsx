import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ trigger, children, align = 'left', className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const internalRef = React.useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    useOnClickOutside(internalRef, () => setIsOpen(false));

    return (
      <div className="relative inline-block text-left" ref={ref || internalRef}>
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={shouldReduceMotion ? {} : { y: 8, scale: 0.95 }}
              animate={shouldReduceMotion ? {} : { y: 0, scale: 1 }}
              exit={shouldReduceMotion ? {} : { y: 8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={cn(
                'absolute mt-2 w-64 rounded-xl bg-card text-card-foreground shadow-xl border border-border focus:outline-none origin-top overflow-hidden ring-0 z-[100]',
                align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
                className
              )}
              onClick={() => setIsOpen(false)} // Close on item click inside
            >
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Dropdown.displayName = 'Dropdown';

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'block w-full px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200',
          'text-foreground/80 hover:text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
          className
        )}
        role="menuitem"
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownItem.displayName = 'DropdownItem';
