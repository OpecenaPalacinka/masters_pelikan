import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  type DatePickerProps,
  DateSegment,
  type DateValue,
  Dialog,
  Group,
  Heading,
  Popover,
  type ValidationResult
} from 'react-aria-components'
import type { ButtonProps, PopoverProps } from 'react-aria-components'
import { faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field } from '@/components/forms/Field.tsx'
import { FieldState } from '@tanstack/react-form'
import { cva } from '@/lib/cva.ts'

const inputStyles = cva({
  base: [
    'rounded-sm w-full text-sm/snug outline-none ring-1 ring-gray-200 ring-offset-0 text-slate-900 placeholder:text-gray-400',
    'rac-focus:ring-blue-300 rac-focus:ring-2'
  ],
  variants: {
    invalid: {
      true: 'ring-red-500 rac-focus:ring-red-300 placeholder:text-red-400'
    }
  }
})

interface MyDatePickerProps<T extends DateValue> extends DatePickerProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  textFieldClassName?: string | undefined
  fieldState: FieldState<string>
}

export function MyDatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  textFieldClassName,
  fieldState,
  ...props
}: MyDatePickerProps<T>) {
  const touchedError = fieldState.meta.touchedErrors

  return (
    <Field textFieldClassName={textFieldClassName} label={label} fieldState={fieldState}>
      <DatePicker className={inputStyles({ invalid: touchedError.length > 0 })} {...props}>
        <Group className="flex rounded-lg bg-white/90 pl-3 text-gray-700 shadow-md ring-black transition focus-within:bg-white focus-visible:ring-2 group-open:bg-white">
          <DateInput className="flex flex-1 py-2">
            {(segment) => (
              <DateSegment
                segment={segment}
                className={`rounded-sm px-0.5 tabular-nums caret-transparent outline-none placeholder-shown:italic ${touchedError.length > 0 ? 'text-red-500' : ''} focus:bg-purple-400 focus:text-white`}
              />
            )}
          </DateInput>
          <Button className="pressed:bg-purple-100 flex items-center rounded-r-lg border-0 border-l border-solid border-l-purple-200 bg-transparent px-3 text-gray-700 outline-none ring-black transition focus-visible:ring-2">
            <FontAwesomeIcon icon={faChevronUp} />
          </Button>
        </Group>
        <MyPopover>
          <Dialog className="p-6 text-gray-600">
            <Calendar>
              <header className="flex w-full items-center gap-1 px-1 pb-4 font-serif">
                <Heading className="ml-2 flex-1 text-2xl font-semibold" />
                <RoundButton slot="previous">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </RoundButton>
                <RoundButton slot="next">
                  <FontAwesomeIcon icon={faChevronRight} />
                </RoundButton>
              </header>
              <CalendarGrid className="border-separate border-spacing-1">
                <CalendarGridHeader>
                  {(day) => (
                    <CalendarHeaderCell className="text-xs font-semibold text-gray-500">
                      {day}
                    </CalendarHeaderCell>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className="outside-month:text-gray-300 pressed:bg-gray-200 selected:bg-violet-700 selected:text-white flex h-9 w-9 cursor-default items-center justify-center rounded-full outline-none ring-violet-600/70 ring-offset-2 hover:bg-gray-100 focus-visible:ring"
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </MyPopover>
      </DatePicker>
    </Field>
  )
}

function RoundButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="pressed:bg-gray-200 flex h-9 w-9 cursor-default items-center justify-center rounded-full border-0 bg-transparent text-gray-600 outline-none ring-violet-600/70 ring-offset-2 hover:bg-gray-100 focus-visible:ring"
    />
  )
}

function MyPopover(props: PopoverProps) {
  return (
    <Popover
      {...props}
      className={({ isEntering, isExiting }) => `
        overflow-auto rounded-lg bg-white ring-1 ring-black/10 drop-shadow-lg
        ${
          isEntering
            ? 'animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 duration-200 ease-out'
            : ''
        }
        ${
          isExiting
            ? 'animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 duration-150 ease-in'
            : ''
        }
      `}
    />
  )
}
