import { CreateEvent } from '@/components/CreateEvent'
import { DashboardLayout } from '@/components/DashboardLayout'
import { TimelineLegend } from '@/components/TimelineLegend'
import { Text } from '@/components/ui/Text'
import { Timeline } from '@/components/Timeline.tsx'

export default function MyTimelinePage() {
  return (
    <DashboardLayout>
      <Text size={'h2'} weight={'semibold'} className={'mb-[14px]'} as={'h1'}>
        My Timeline
      </Text>
      <div className={'flex gap-x-5'}>
        <div
          className={
            'sticky left-0 top-0 h-full w-full max-w-[33.333333%] shrink-0 basis-1/3 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm'
          }
        >
          <Text size={'h4'} weight={'semibold'} as={'h2'} className={'mb-2'}>
            Legend
          </Text>
          <Text size={'body1'} color={'darkGray'} className={'max-w-prose'}>
            Explore your resolved events categorized by type.
          </Text>
          <div className={'mt-4'}>
            <TimelineLegend />
          </div>
        </div>
        <div
          className={
            'relative h-full w-full shrink-0 basis-2/3 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm'
          }
        >
          <div className={'flex justify-between'}>
            <div>
              <Text size={'h4'} weight={'semibold'} as={'h2'} className={'mb-2'}>
                Timeline
              </Text>
              <Text size={'body1'} color={'darkGray'} className={'max-w-prose'}>
                Explore the chronological journey of your activities with our user event timeline,
                capturing every milestone and interaction in a seamless narrative.
              </Text>
            </div>
            <div>
              <CreateEvent />
            </div>
          </div>
          <div className={'mt-6'}>
            <Timeline />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
