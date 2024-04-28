import React from 'react'
import { Select, SelectOption as UISelectOption } from '@/components/ui/Select'
import { Field } from '@/components/forms/Field'

import type { FieldProps } from '@/components/forms/Field'
import type { SelectProps } from '@/components/ui/Select'

export type SelectFieldProps = FieldProps & SelectProps

export const SelectField = (props: SelectFieldProps) => {
  const { textFieldClassName, label, fieldState, size = 'normal', children, ...selectProps } = props
  const id = React.useId()

  const touchedError = fieldState.meta.touchedErrors

  return (
    <Field textFieldClassName={textFieldClassName} label={label} fieldState={fieldState}>
      <Select id={id} size={size} invalid={touchedError.length > 0} {...selectProps}>
        {children}
      </Select>
    </Field>
  )
}

export const SelectOption = UISelectOption
