import React from 'react'
import { Text } from '@/components/ui/Text'
import { Checkbox } from '@/components/ui/Checkbox'
import { cx } from '@/lib/cva'
import type { CheckboxProps } from '@/components/ui/Checkbox'
import { FieldState } from '@tanstack/react-form'

export type CheckboxFieldProps = {
  textFieldClassName?: string
  label?: string
  fieldState: FieldState<boolean>
} & CheckboxProps

export const CheckboxField = (props: CheckboxFieldProps) => {
  const { textFieldClassName, label, fieldState, ...checkboxProps } = props
  const id = React.useId()

  const touchedError = fieldState.meta.touchedErrors

  return (
    <div className={cx('flex w-full flex-col gap-y-1.5', textFieldClassName)}>
      {label && (
        <Text size={'body1'} weight={'medium'} as={'label'} htmlFor={id}>
          {label}
        </Text>
      )}
      <div className={'flex items-center justify-between gap-x-4'}>
        <Checkbox id={id} invalid={touchedError.length > 0} {...checkboxProps} />
        {fieldState.meta.touchedErrors && (
          <Text size={'body0'} color={'danger'} as={'span'}>
            {touchedError.length > 0 ? touchedError.join(',').split(', ')[0] : null}
          </Text>
        )}
      </div>
    </div>
  )
}
