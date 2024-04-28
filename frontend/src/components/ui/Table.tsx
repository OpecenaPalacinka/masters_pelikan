import { cx } from '@/lib/cva'
import {
  Table as RACTable,
  TableHeader as RACTableHeader,
  TableBody as RACTableBody,
  Row as RACRow,
  Column as RACColumn,
  Cell as RACCell
} from 'react-aria-components'
import type {
  TableProps as RACTableProps,
  TableHeaderProps as RACTableHeaderProps,
  TableBodyProps as RACTableBodyProps,
  RowProps as RACRowProps,
  ColumnProps as RACColumnProps,
  CellProps as RACCellProps
} from 'react-aria-components'

export const Table = (props: RACTableProps) => {
  const { className, ...tableProps } = props

  return (
    <div className={'h-full max-h-[615px] overflow-y-auto rounded border border-gray-200'}>
      <RACTable className={cx('border-separate border-spacing-0', className)} {...tableProps} />
    </div>
  )
}

export const TableHeader = <T extends object>(props: RACTableHeaderProps<T>) => {
  const { className, ...tableHeader } = props

  return <RACTableHeader className={cx('bg-gray-50', className)} {...tableHeader} />
}

export const TableBody = <T extends object>(props: RACTableBodyProps<T>) => {
  const { ...tableBodyProps } = props

  return <RACTableBody {...tableBodyProps} />
}

export const Row = <T extends object>(props: RACRowProps<T>) => {
  const { className, ...rowProps } = props

  return <RACRow className={cx('[&:last-child>td]:border-none', className)} {...rowProps} />
}

export const Column = (props: RACColumnProps) => {
  const { className, ...columnProps } = props

  return (
    <RACColumn
      className={cx(
        'border-b border-gray-200 p-2.5 py-3 text-left text-sm/snug font-normal text-slate-900',
        className
      )}
      {...columnProps}
    />
  )
}

export const Cell = (props: RACCellProps) => {
  const { className, ...cellProps } = props

  return (
    <RACCell
      className={cx('border-b border-gray-200 p-2.5 py-3 text-sm/snug font-medium', className)}
      {...cellProps}
    />
  )
}
