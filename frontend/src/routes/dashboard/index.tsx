import { DashboardLayout } from '@/components/DashboardLayout'
import { DashboardEventsResolved } from '@/components/DashboardEventsResolved'
import { Text } from '@/components/ui/Text'
import { DashboardEventsPotentialAdditions } from '@/components/DashboardEventsPotentialAdditions.tsx'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Text size={'h2'} weight={'semibold'} className={'mb-[14px]'} as={'h1'}>
        Events Overview
      </Text>
      <div className={'flex gap-x-5'}>
        <div
          className={
            'h-full w-full basis-1/2 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm'
          }
        >
          <Text size={'h4'} weight={'semibold'} as={'h2'} className={'mb-2'}>
            Resolved
          </Text>
          <Text size={'body1'} color={'darkGray'} className={'max-w-prose'}>
            Explore your already resolved events. This section allows you to view all your events
            based on their type.
          </Text>
          <div className={'mt-4'}>
            <DashboardEventsResolved />
          </div>
        </div>
        <div
          className={
            'h-full w-full basis-1/2 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm'
          }
        >
          <Text size={'h4'} weight={'semibold'} as={'h2'} className={'mb-2'}>
            Potential Additions
          </Text>
          <Text size={'body1'} color={'darkGray'} className={'max-w-prose'}>
            Update your study story. Here you can find types of events that have not yet been
            investigated.
          </Text>
          <div className={'mt-4'}>
            <DashboardEventsPotentialAdditions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
