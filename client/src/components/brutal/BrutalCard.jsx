import React from 'react';
import { cn } from '@/lib/utils';

const BrutalCard = React.forwardRef(
    ({ className, borderWidth = '2', children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                `bg-white border-${borderWidth} border-black rounded-lg overflow-hidden transition-all duration-200 hover:shadow-brutal-md`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);

BrutalCard.displayName = 'BrutalCard';

export default BrutalCard;
