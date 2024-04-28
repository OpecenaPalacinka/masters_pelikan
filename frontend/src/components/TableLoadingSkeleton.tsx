export const TableLoadingSkeleton = () => {
  return (
    <div className={'max-h-56 overflow-hidden rounded border border-gray-200'}>
      {/* Header */}
      <div
        className={
          'flex h-11 items-center justify-between border border-b border-gray-200 bg-gray-100 px-2.5'
        }
      >
        <div className={'mx-2.5 h-3.5 w-40 rounded-full bg-gray-300'}></div>
        <div className={'mx-2.5 h-3.5 w-28 rounded-full bg-gray-300'}></div>
        <div className={'mx-2.5 h-3.5 w-24 rounded-full bg-gray-300'}></div>
      </div>
      {/* Body */}
      {Array.from({ length: 9 }).map(() => (
        <div
          className={
            'flex h-11 items-center justify-between border-b border-gray-200 bg-gray-50 px-2.5 last:border-none'
          }
          key={crypto.randomUUID()}
        >
          <div className={'mx-2.5 h-3.5 w-40 rounded-full bg-gray-200'}></div>
          <div className={'mx-2.5 h-3.5 w-28 rounded-full bg-gray-200'}></div>
          <div className={'mx-2.5 h-3.5 w-24 rounded-full bg-gray-200'}></div>
        </div>
      ))}
    </div>
  )
}
