import React from 'react'
import { TextArea } from '@/components/ui/TextArea'
import { Field } from '@/components/forms/Field'

import type { FieldProps } from '@/components/forms/Field'
import type { TextAreaProps } from '@/components/ui/TextArea'

export type TextAreaFieldProps = Omit<FieldProps, 'children'> & Omit<TextAreaProps, 'invalid'>

export const TextAreaField = (props: TextAreaFieldProps) => {
  const { textFieldClassName, label, fieldState, size = 'normal', ...textareaProps } = props
  const id = React.useId()

  const touchedError = fieldState.meta.touchedErrors

  return (
    <Field textFieldClassName={textFieldClassName} label={label} fieldState={fieldState}>
      <TextArea id={id} size={size} invalid={touchedError.length > 0} {...textareaProps} />
    </Field>
  )
}
