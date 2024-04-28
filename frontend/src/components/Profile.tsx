import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { MenuTrigger, Menu, MenuItem } from '@/components/ui/Menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '@/components/UserContext'
import { Separator } from '@/components/ui/Sepator'

export const Profile = () => {
  const { user, logout } = useUserContext()

  return (
    <div>
      <div className={'px-2 py-2'}>
        <div className={'flex items-center justify-between gap-x-6'}>
          <div className={'flex items-center gap-x-3'}>
            <div
              className={
                'flex h-8 w-8 items-center justify-center rounded border border-blue-200 bg-blue-100'
              }
            >
              <FontAwesomeIcon icon={faUser} width={20} height={20} />
            </div>
            <Text size={'body1'} weight={'medium'}>
              {user?.firstname} {user?.lastname}
            </Text>
          </div>
          <div>
            <MenuTrigger>
              <Button
                ghost={true}
                size={'icon'}
                className={'flex h-8 w-8 items-center justify-center text-slate-900 ring-offset-0'}
              >
                <FontAwesomeIcon icon={faChevronDown} size={'1x'} />
              </Button>
              <Menu
                placement={'bottom right'}
                onAction={(e) => {
                  switch (e) {
                    case 'sign-out':
                      logout()
                      break
                  }
                }}
              >
                <MenuItem href={'/profile'} className={'flex items-center gap-x-2'}>
                  Manage Account
                </MenuItem>
                <Separator className={'my-1'} />
                <MenuItem id={'sign-out'}>Sign Out</MenuItem>
              </Menu>
            </MenuTrigger>
          </div>
        </div>
      </div>
    </div>
  )
}
