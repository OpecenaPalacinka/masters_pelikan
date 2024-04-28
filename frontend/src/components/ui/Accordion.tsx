import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { cx } from '@/lib/cva'

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cx(
      'border-b border-gray-200 first:rounded-t last:rounded-b last:border-none focus-within:relative focus-within:z-10 focus-within:shadow-blue-500 focus-within:ring-1 focus-within:ring-inset',
      className
    )}
    {...props}
  />
))

AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className={'flex'}>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cx(
        'group flex w-full items-center justify-between py-3 text-sm/snug font-medium text-slate-900 transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
      <FontAwesomeIcon
        icon={faChevronDown}
        className={
          'h-4 w-4 shrink-0 duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state="open"]:rotate-180'
        }
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={
      'mx-2.5 overflow-hidden border-t border-gray-200 text-sm/normal data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown'
    }
    {...props}
  >
    <div className={cx('py-3', className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName
