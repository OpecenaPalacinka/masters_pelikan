import React from 'react'
import { Text } from '@/components/ui/Text'
import { cx } from '@/lib/cva'
import { FieldState } from '@tanstack/react-form'

export type FieldProps = {
  textFieldClassName?: string
  label?: string
  fieldState: FieldState<string>
  children: React.ReactNode
}

export const Field = (props: FieldProps) => {
  const { textFieldClassName, label, fieldState, children } = props
  const id = React.useId()

  const touchedError = fieldState.meta.touchedErrors

  return (
    <div className={cx('flex w-full flex-col justify-between gap-y-1.5', textFieldClassName)}>
      <div className={'flex flex-wrap items-end justify-between gap-x-2 gap-y-1'}>
        {label && (
          <Text size={'body1'} weight={'medium'} as={'label'} htmlFor={id}>
            {label}
          </Text>
        )}
        {fieldState.meta.touchedErrors && (
          <Text size={'body0'} color={'danger'} as={'span'}>
            {touchedError.length > 0 ? touchedError.join(',').split(', ')[0] : null}
          </Text>
        )}
      </div>
      {children}
    </div>
  )
}
