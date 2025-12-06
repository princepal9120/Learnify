import React from 'react';
import { cn } from '@/lib/utils';

const BrutalInput = React.forwardRef(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            className={cn(
                'w-full px-4 py-3 text-base border-2 border-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-secondary transition-all duration-200',
                className
            )}
            {...props}
        />
    )
);

BrutalInput.displayName = 'BrutalInput';

export default BrutalInput;
