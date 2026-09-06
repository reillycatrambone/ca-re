'use client'

import type { ComponentProps } from 'react'
import { ToggleGroup as Primitive } from 'radix-ui'
import { cn } from '@/lib/utils'

export function ToggleGroup({ className, ...props }: ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root
      data-slot="toggle-group"
      className={cn('inline-flex items-center rounded-md bg-muted p-1 gap-1', className)}
      {...props}
    />
  )
}
export function ToggleGroupItem({ className, ...props }: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      data-slot="toggle-group-item"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-sm px-3 py-2 text-xs font-medium cursor-pointer data-[state=on]:bg-background data-[state=on]:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground',
        className
      )}
      {...props}
    />
  )
}
