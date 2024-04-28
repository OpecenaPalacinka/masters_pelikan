import { cx } from '@/lib/cva'

export const AccordionLoadingSkeleton = () => {
  return (
    <div className={'min-h-52 rounded border border-gray-200'}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          className={cx(
            'flex h-[43px] items-center justify-between border-b border-gray-200 px-2.5',
            idx % 2 ? 'bg-gray-50' : 'bg-gray-100'
          )}
        >
          <div className={'h-3.5 w-36 rounded-full bg-gray-200'} />
          <div className={'h-4 w-4 rounded bg-gray-200'} />
        </div>
      ))}
    </div>
  )
}
