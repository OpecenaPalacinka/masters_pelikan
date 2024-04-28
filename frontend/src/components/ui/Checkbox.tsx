import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Checkbox as RACCheckbox } from 'react-aria-components'

import type { CheckboxProps as RACCheckboxProps } from 'react-aria-components'
import { cx, cva } from '@/lib/cva'
import { VariantProps } from 'cva'

const checkboxStyles = cva({
  base: [
    'flex h-5 w-5 items-center justify-center rounded-sm ring-1 ring-gray-200 ring-offset-0',
    'group-rac-focus:ring-2 group-rac-focus:ring-blue-300 group-rac-selected:bg-blue-100'
  ],
  variants: {
    invalid: {
      true: 'ring-red-500 group-rac-focus:ring-red-300 group-rac-focus:ring-2'
    }
  }
})

export type CheckboxProps = RACCheckboxProps &
  VariantProps<typeof checkboxStyles> & {
    boxClassname?: string
  }

export function Checkbox(props: CheckboxProps) {
  const { invalid, className, boxClassname, children, ...checkboxProps } = props

  return (
    <RACCheckbox
      className={cx('group flex items-center gap-x-2 text-sm font-medium transition', className)}
      isInvalid={invalid}
      {...checkboxProps}
    >
      {({ isSelected }) => (
        <>
          <div className={checkboxStyles({ invalid, className: boxClassname })}>
            {isSelected ? (
              <FontAwesomeIcon
                icon={faCheck}
                size={'sm'}
                aria-hidden={true}
                className={'text-blue-500'}
              />
            ) : null}
          </div>
          {children}
        </>
      )}
    </RACCheckbox>
  )
}
