import { DashboardLayout } from '@/components/DashboardLayout'
import { Text } from '@/components/ui/Text'
import { AllUsersTable } from '@/components/AllUsersTable'

export default function MyEventTypesPage() {
  return (
    <DashboardLayout>
      <Text size={'h2'} weight={'semibold'} className={'mb-[14px]'} as={'h1'}>
        All Users
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
                User Management
              </Text>
              <Text size={'body1'} color={'darkGray'} className={'max-w-prose'}>
                Streamline user management effortlessly. Access their events directly from this
                page, ensuring efficient oversight and coordination without unnecessary steps.
              </Text>
            </div>
          </div>
          <div className={'mt-4'}>
            <AllUsersTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
