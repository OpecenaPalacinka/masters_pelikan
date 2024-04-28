import { DashboardLayout } from '@/components/DashboardLayout'
import { Text } from '@/components/ui/Text'
import { MyCausalityGraphGraph } from '@/components/MyCausalityGraph.tsx'

export default function MyCausalityGraph() {
  return (
    <DashboardLayout>
      <div className={'flex h-full max-h-full flex-col'}>
        <Text size={'h2'} weight={'semibold'} className={'mb-[14px]'} as={'h1'}>
          My Causality Graph
        </Text>
        <div className={'flex grow gap-x-5'}>
          <div
            className={
              'w-full basis-full rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm'
            }
          >
            <div className={'flex h-full flex-col'}>
              <Text size={'h4'} weight={'semibold'} as={'h2'} className={'mb-2'}>
                Timeline
              </Text>
              <Text size={'body1'} color={'darkGray'} className={'max-w-prose'}>
                Explore the chronological journey of your activities with our user event timeline,
                capturing every milestone and interaction in a seamless narrative.
              </Text>
              <div className={'mt-4 grow'}>
                <MyCausalityGraphGraph />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
