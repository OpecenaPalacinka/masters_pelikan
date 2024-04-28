import { Text } from '@/components/ui/Text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'

export const FetchResolvedWithError = () => {
  return (
    <div
      className={
        'flex min-h-56 w-full flex-col items-center justify-center gap-y-2 rounded border border-red-400 bg-red-50'
      }
    >
      <Text
        size={'body1'}
        weight={'normal'}
        className={'mx-auto max-w-prose text-center text-red-700'}
        as={'span'}
      >
        An error occurred while fetching data!
      </Text>
      <div
        className={
          'flex h-12 w-12 items-center justify-center rounded-full border border-red-700 bg-red-100 text-red-700'
        }
      >
        <FontAwesomeIcon icon={faExclamation} size={'lg'} />
      </div>
    </div>
  )
}
