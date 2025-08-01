'use client'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import * as React from 'react'

import { cn } from 'website/src/lib/utils'

function ScrollArea({
    className,
    children,
    ref,
    ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
    return (
        <ScrollAreaPrimitive.Root
            data-slot='scroll-area'
            className={cn('relative ', className)}
            {...props}
        >
            <ScrollAreaPrimitive.Viewport
                ref={ref}
                data-slot='scroll-area-viewport'
                className='flex !overflow-x-visible [&>div]:!grow [&>div]:!flex [&>div]:!flex-col [&>div]:!overflow-x-visible flex-col grow rounded-[inherit]'
            >
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    )
}

function ScrollBar({
    className,
    orientation = 'vertical',
    ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
    return (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            data-slot='scroll-area-scrollbar'
            orientation={orientation}
            className={cn(
                'flex touch-none select-none',
                orientation === 'vertical' &&
                    'h-full w-2.5 border-l border-l-transparent p-px',
                orientation === 'horizontal' &&
                    'h-2.5 flex-col border-t border-t-transparent p-px',
                className,
            )}
            {...props}
        >
            <ScrollAreaPrimitive.ScrollAreaThumb
                data-slot='scroll-area-thumb'
                className='bg-border relative flex-1 rounded-full'
            />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    )
}

export { ScrollArea, ScrollBar }
