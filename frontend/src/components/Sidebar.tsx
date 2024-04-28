import { Separator } from '@/components/ui/Sepator'
import { Text } from '@/components/ui/Text'
import { Profile } from '@/components/Profile'
import { NavLink } from 'react-router-dom'
import { cx } from '@/lib/cva'
import { useUserContext } from '@/components/UserContext'

export const Sidebar = () => {
  const { user } = useUserContext()

  const LINKS = [
    {
      categoryTitle: 'Events',
      actions: [
        {
          path: '/dashboard',
          label: 'Overview'
        },
        {
          path: '/dashboard/my-event-types',
          label: 'My Event Types'
        },
        {
          path: '/dashboard/my-timeline',
          label: 'My Timeline'
        },
        {
          path: '/dashboard/my-causality-graph',
          label: 'My Causality Graph'
        }
      ]
    },
    {
      categoryTitle: 'Restricted',
      actions: [
        {
          path: '/dashboard/admin/users',
          label: 'All Users'
        },
        {
          path: '/dashboard/admin/review-event-types',
          label: 'Review Event Types'
        }
      ]
    }
  ]

  return (
    <aside
      className={
        'relative flex h-full w-72 shrink-0 flex-col justify-between overflow-y-auto border-r border-gray-200 bg-gray-50'
      }
    >
      <div>
        <div className={'px-2 py-2'}>
          <Profile />
        </div>
        <Separator />
        <div className={'flex flex-col gap-y-5 px-2 py-5'}>
          <div className={'space-y-6'}>
            {LINKS.map((category) => {
              return (category.categoryTitle === 'Restricted' && user && user.role === 'admin') ||
                category.categoryTitle !== 'Restricted' ? (
                <div className={'space-y-1.5'} key={category.categoryTitle}>
                  <div className={'mx-3'}>
                    <Text size={'body1'} weight={'medium'} color={'gray'} as={'span'}>
                      {category.categoryTitle}
                    </Text>
                  </div>
                  <div className={'flex flex-col gap-y-0.5'}>
                    {category.actions.map((action) => (
                      <NavLink
                        to={action.path}
                        className={({ isActive }) =>
                          cx(
                            'rounded-md px-3 py-2.5 text-sm/none font-[450] text-slate-700 transition-colors',
                            isActive &&
                              'border border-gray-200 bg-white font-medium text-blue-500 shadow-sm',
                            !isActive && 'hover:bg-gray-100'
                          )
                        }
                        end={true}
                        key={action.path}
                      >
                        {action.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : null
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}
