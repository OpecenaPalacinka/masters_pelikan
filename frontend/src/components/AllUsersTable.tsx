import { Table, TableHeader, TableBody, Row, Column, Cell } from '@/components/ui/Table'
import { Text } from '@/components/ui/Text'
import { Link } from '@/components/ui/Link'
import { Button, buttonStyles } from '@/components/ui/Button'
import { cx } from '@/lib/cva'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_USERS_QUERY } from '@/graphql/queries/all-users'
import { DELETE_USER_MUTATION } from '@/graphql/queries/delete-user'
import { ALL_EVENTS_BY_USER_ID_QUERY } from '@/graphql/queries/all-events-by-user-id.ts'
import { GET_NUMBER_OF_EVENTS_BY_USER_IDS_QUERY } from '@/graphql/queries/get-number-of-events-by-user-ids.ts'
import { IdsToNumbers } from '@/__generated__/graphql.ts'
import { toast } from 'sonner'
import { TableLoadingSkeleton } from '@/components/TableLoadingSkeleton.tsx'
import { FetchResolvedWithError } from '@/components/FetchResolvedWithError.tsx'

export const AllUsersTable = () => {
  const {
    data,
    loading: loadingAllUsers,
    error: errorAllUsers
  } = useQuery(ALL_USERS_QUERY, {
    fetchPolicy: 'cache-and-network'
  })
  const ids = data?.getAllUsers.map((user) => user.user_id) ?? []
  const {
    loading: loadingAllEvents,
    data: dataEvents,
    error: errorAllEvents
  } = useQuery(GET_NUMBER_OF_EVENTS_BY_USER_IDS_QUERY, {
    variables: { userIds: ids }
  })

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: [ALL_USERS_QUERY, ALL_EVENTS_BY_USER_ID_QUERY]
  })

  const getNumberOfEvents = (userId: number, responseArray: IdsToNumbers[]) => {
    // Find the object with user_id equal to the specified userId
    const userObject = responseArray.find((user) => user.user_id === userId)
    // If userObject is found, return its number_of_events property, otherwise return 0
    return userObject ? userObject.number_of_events : 0
  }

  if (loadingAllUsers || loadingAllEvents) {
    return <TableLoadingSkeleton />
  }

  if (errorAllUsers || errorAllEvents) {
    return <FetchResolvedWithError />
  }

  return (
    <Table className={'w-full max-w-full table-fixed'}>
      <TableHeader className={'sticky left-0 top-0'}>
        <Column isRowHeader>User</Column>
        <Column className={'w-48'}>Number of Answers</Column>
        <Column className={'w-64'}>Actions</Column>
      </TableHeader>
      <TableBody
        renderEmptyState={() => (
          <div className={'flex min-h-48 flex-col items-center justify-center gap-y-4 px-2.5 py-3'}>
            <div className={'flex flex-col items-center justify-center gap-y-2'}>
              <Text size={'h4'} weight={'semibold'} as={'span'}>
                No users created
              </Text>
              <Text
                size={'body1'}
                weight={'normal'}
                color={'gray'}
                className={'mx-auto max-w-prose text-center'}
                as={'span'}
              >
                Awaiting the first registration. Once users join, you can manage their events.
              </Text>
            </div>
          </div>
        )}
      >
        {data?.getAllUsers && data?.getAllUsers.length > 0
          ? data?.getAllUsers.map(
              (user) =>
                user && (
                  <Row key={user.user_id}>
                    <Cell>
                      {user.firstname} {user.lastname}
                    </Cell>
                    <Cell>
                      {!loadingAllEvents
                        ? getNumberOfEvents(user.user_id, dataEvents!.getNumberOfEventsByUserIds)
                        : 0}
                    </Cell>
                    <Cell>
                      <div className={'flex gap-x-2'}>
                        <Link
                          href={'/dashboard?userId=' + user.user_id}
                          className={cx(
                            buttonStyles({ solid: 'primary', size: 'sm' }),
                            'cursor-pointer'
                          )}
                        >
                          Overview
                        </Link>
                        <Button size={'sm'}>Export</Button>
                        <Button
                          size={'sm'}
                          solid={'destructive'}
                          onPress={async () => {
                            try {
                              const { data } = await deleteUser({
                                variables: {
                                  userId: user.user_id
                                }
                              })
                              if (data) {
                                toast.success('User was successfully deleted!')
                              }
                            } catch (error) {
                              toast.error('Something went wrong, try again.')
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </Cell>
                  </Row>
                )
            )
          : null}
      </TableBody>
    </Table>
  )
}
