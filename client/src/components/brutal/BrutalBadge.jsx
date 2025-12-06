import React from 'react';
import { cn } from '@/lib/utils';

const BrutalBadge = React.forwardRef(
    ({ className, variant = 'primary', children, ...props }, ref) => {
        const variants = {
            primary: 'bg-black text-white border-2 border-black',
            secondary: 'bg-secondary text-white border-2 border-secondary',
            accent: 'bg-accent text-black border-2 border-black',
            success: 'bg-success text-white border-2 border-success',
            warning: 'bg-warning text-black border-2 border-warning',
            error: 'bg-error text-white border-2 border-error',
            outline: 'bg-transparent text-black border-2 border-black',
        };

        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center px-3 py-1 text-sm font-bold rounded-md',
                    variants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </span>
        );
    }
);

BrutalBadge.displayName = 'BrutalBadge';

export default BrutalBadge;
