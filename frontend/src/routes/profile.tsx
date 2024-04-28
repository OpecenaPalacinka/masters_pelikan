import { DashboardLayout } from '@/components/DashboardLayout'
import { Separator } from '@/components/ui/Sepator'
import { Text } from '@/components/ui/Text'
import { ChangePasswordForm } from '@/components/ChangePasswordForm'
import { ProfileDetails } from '@/components/ProfileDetails'
import { ProfileAnalytics } from '@/components/ProfileAnalytics'

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <Text size={'h2'} weight={'semibold'} className={'mb-[14px]'} as={'h1'}>
        Your Profile
      </Text>
      <div className={'flex gap-x-5'}>
        <div className={'flex basis-2/5 flex-col gap-y-5'}>
          <div
            className={
              'w-full  basis-full self-start rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm'
            }
          >
            <Text size={'h4'} weight={'semibold'} as={'h2'} className={'mb-[14px]'}>
              Profile Details
            </Text>
            <Separator className={'my-3'} />
            <ProfileDetails />
          </div>
          <div
            className={
              'w-full basis-full rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm'
            }
          >
            <Text size={'h4'} weight={'semibold'} as={'h2'} className={'mb-2'}>
              Change Password
            </Text>
            <Separator className={'my-3'} />
            <ChangePasswordForm />
          </div>
        </div>
        <div className={'flex h-full basis-3/5 flex-col gap-y-5'}>
          <div
            className={
              'w-full basis-full rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm'
            }
          >
            <Text size={'h4'} weight={'semibold'} as={'h2'} className={'mb-2'}>
              Analytics
            </Text>
            <Separator className={'my-3'} />
            <ProfileAnalytics />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
