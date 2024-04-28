import { DashboardLayout } from '@/components/DashboardLayout'
import { Text } from '@/components/ui/Text'
import { CreateEventType } from '@/components/CreateEventType'
import { MyEventTypesTable } from '@/components/MyEventTypesTable'

export default function MyEventTypesPage() {
  return (
    <DashboardLayout>
      <div className={'flex h-full max-h-full flex-col'}>
        <Text size={'h2'} weight={'semibold'} className={'mb-[14px]'} as={'h1'}>
          My Event Types
        </Text>
        <div className={'flex grow gap-x-5'}>
          <div
            className={
              'w-full basis-full rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm'
            }
          >
            <div className={'flex h-full flex-col'}>
              <div className={'flex justify-between'}>
                <div>
                  <Text size={'h4'} weight={'semibold'} as={'h2'} className={'mb-2'}>
                    Manage Event Types
                  </Text>
                  <Text size={'body1'} color={'darkGray'} className={'max-w-prose'}>
                    This section enables you to edit, delete, and reassign pending event types for
                    approval, while also displaying previously approved event types.
                  </Text>
                </div>
                <div>
                  <CreateEventType />
                </div>
              </div>
              <div className={'relative mt-4 grow'}>
                <div>
                  <MyEventTypesTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
