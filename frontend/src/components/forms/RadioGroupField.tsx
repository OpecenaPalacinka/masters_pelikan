import React from 'react'
import { Text } from '@/components/ui/Text'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { cx } from '@/lib/cva'
import type { RadioGroupProps } from '@/components/ui/RadioGroup'
import { FieldState } from '@tanstack/react-form'

export type RadioGroupFieldProps = {
  textFieldClassName?: string
  label?: string
  fieldState: FieldState<string>
} & RadioGroupProps

export const RadioGroupField = (props: RadioGroupFieldProps) => {
  const { children, textFieldClassName, label, fieldState, ...radioGroupProps } = props
  const id = React.useId()

  const touchedError = fieldState.meta.touchedErrors

  return (
    <div className={cx('flex w-full flex-col gap-y-1.5', textFieldClassName)}>
      {label && (
        <Text size={'body1'} weight={'medium'} as={'label'} htmlFor={id}>
          {label}
        </Text>
      )}
      <div className={'flex flex-col gap-y-1.5'}>
        <RadioGroup
          id={id}
          invalid={touchedError.length > 0}
          className={'flex'}
          {...radioGroupProps}
        >
          {children}
        </RadioGroup>
        {fieldState.meta.touchedErrors && (
          <Text size={'body0'} color={'danger'} as={'span'}>
            {touchedError.length > 0 ? touchedError.join(',').split(', ')[0] : null}
          </Text>
        )}
      </div>
    </div>
  )
}
