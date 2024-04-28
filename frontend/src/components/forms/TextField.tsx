import React from 'react'
import { Input } from '@/components/ui/Input'
import { Field } from '@/components/forms/Field'

import type { FieldProps } from '@/components/forms/Field'
import type { InputProps } from '@/components/ui/Input'

export type TextFieldProps = Omit<FieldProps, 'children'> & Omit<InputProps, 'invalid'>

export const TextField = (props: TextFieldProps) => {
  const { textFieldClassName, label, fieldState, size = 'normal', ...inputProps } = props
  const id = React.useId()

  const touchedError = fieldState.meta.touchedErrors

  return (
    <Field textFieldClassName={textFieldClassName} label={label} fieldState={fieldState}>
      <Input id={id} size={size} invalid={touchedError.length > 0} {...inputProps} />
    </Field>
  )
}
