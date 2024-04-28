import { DashboardLayout } from '@/components/DashboardLayout'
import { Text } from '@/components/ui/Text'
import { ReviewEventTypesTable } from '@/components/ReviewEventTypesTable'

export default function PreviewEventTypesPage() {
  return (
    <DashboardLayout>
      <Text size={'h2'} weight={'semibold'} className={'mb-[14px]'} as={'h1'}>
        Review Event Types
      </Text>
      <div className={'flex gap-x-5'}>
        <div
          className={
            'w-full basis-full rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm'
          }
        >
          <div className={'flex justify-between'}>
            <div>
              <Text size={'h4'} weight={'semibold'} as={'h2'} className={'mb-2'}>
                Review Event Types
              </Text>
              <Text size={'body1'} color={'darkGray'} className={'max-w-prose'}>
                Review and manage user-created event types. Admins can approve or discard
                submissions for consistency.
              </Text>
            </div>
          </div>
          <div className={'mt-4'}>
            <ReviewEventTypesTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
