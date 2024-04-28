import { Text } from '@/components/ui/Text'
import { useUserContext } from '@/components/UserContext'
import { Separator } from '@/components/ui/Sepator'

export const ProfileDetails = () => {
  const { user } = useUserContext()

  return (
    <div className={'flex flex-col rounded border border-gray-200 bg-gray-50 px-2.5 py-3'}>
      <div className={'flex gap-x-4'}>
        <div className={'basis-1/3'}>
          <Text size={'body1'} weight={'medium'}>
            Profile name
          </Text>
        </div>
        <div className={'basis-2/3'}>
          <Text size={'body1'}>
            {user?.firstname} {user?.lastname}
          </Text>
        </div>
      </div>
      <Separator className={'my-2 '} />
      <div className={'flex gap-x-4'}>
        <div className={'basis-1/3'}>
          <Text size={'body1'} weight={'medium'}>
            Email
          </Text>
        </div>
        <div className={'basis-2/3'}>
          <Text size={'body1'}>{user?.email}</Text>
        </div>
      </div>
    </div>
  )
}
