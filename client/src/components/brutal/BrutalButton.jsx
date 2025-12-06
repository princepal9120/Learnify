import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const brutalButtonVariants = cva(
    'inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-95',
    {
        variants: {
            variant: {
                primary: 'bg-black text-white border-2 border-black hover:bg-white hover:text-black',
                secondary: 'bg-white text-black border-2 border-black hover:bg-black hover:text-white',
                accent: 'bg-accent text-black border-2 border-black hover:shadow-brutal-lg',
                outline: 'bg-transparent text-black border-3 border-black hover:bg-black hover:text-white',
                ghost: 'bg-transparent text-black hover:bg-gray-100 border-2 border-transparent hover:border-black',
            },
            size: {
                sm: 'px-3 py-2 text-sm leading-none h-8',
                md: 'px-4 py-3 text-base leading-none h-10',
                lg: 'px-6 py-4 text-lg leading-none h-12',
                xl: 'px-8 py-5 text-xl leading-none h-14',
            },
            fullWidth: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

const BrutalButton = React.forwardRef(
    ({ className, variant, size, fullWidth, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(brutalButtonVariants({ variant, size, fullWidth }), className)}
            {...props}
        />
    )
);

BrutalButton.displayName = 'BrutalButton';

export default BrutalButton;
