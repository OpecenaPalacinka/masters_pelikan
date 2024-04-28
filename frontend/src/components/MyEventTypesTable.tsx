import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Table, TableHeader, TableBody, Row, Column, Cell } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'
import { useUserContext } from '@/components/UserContext'
import { MenuTrigger, Menu, MenuItem } from '@/components/ui/Menu'
import { Separator } from '@/components/ui/Sepator'
import { TableLoadingSkeleton } from '@/components/TableLoadingSkeleton'
import { FetchResolvedWithError } from '@/components/FetchResolvedWithError'
import { useMutation, useQuery } from '@apollo/client'
import { EVENT_TYPES_BY_USER_ID_QUERY } from '@/graphql/queries/event-types-by-user-id'
import { DELETE_EVENT_TYPE_MUTATION } from '@/graphql/queries/delete-event-type'
import { RESEND_EVENT_TYPE_MUTATION } from '@/graphql/queries/resend-event-type'
import { EventType } from '@/__generated__/graphql'
import { ALL_EVENT_TYPES_FOR_REVIEW_QUERY } from '@/graphql/queries/get-all-event-types-for-review.ts'
import { toast } from 'sonner'
import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { Modal, ModalOverlay } from '@/components/ui/Modal.tsx'
import { Dialog, DialogTrigger } from 'react-aria-components'
import { z } from 'zod'
import { TextField } from '@/components/forms/TextField.tsx'
import { CheckboxField } from '@/components/forms/CheckboxField.tsx'
import { UPDATE_EVENT_TYPE_MUTATION } from '@/graphql/queries/update-event-type.ts'

type CustomEventType = EventType & {
  status: string
  statusColor: string
}

export const MyEventTypesTable = () => {
  const { user } = useUserContext()
  const [open, setOpen] = React.useState<boolean>(false)
  const [updateEventType] = useMutation(UPDATE_EVENT_TYPE_MUTATION, {
    refetchQueries: [EVENT_TYPES_BY_USER_ID_QUERY, ALL_EVENT_TYPES_FOR_REVIEW_QUERY]
  })
  const [editEventType, setEditEventType] = useState<EventType>({
    event_type_id: 0,
    name: '',
    duration: 1
  })

  const {
    data: customEventTypes,
    loading,
    error
  } = useQuery(EVENT_TYPES_BY_USER_ID_QUERY, {
    variables: {
      userId: user!.user_id
    },
    fetchPolicy: 'cache-and-network'
  })

  const queriedCustomEventTypes: CustomEventType[] = (
    customEventTypes?.getCustomEventTypesByUserId ?? []
  ).map((event) => ({
    ...event,
    status: '',
    statusColor: ''
  })) as CustomEventType[]
  queriedCustomEventTypes.forEach((customEventType) => {
    if (customEventType) {
      if (customEventType.accepted === null) {
        customEventType.status = 'pending'
        customEventType.statusColor = 'orange'
      } else if (customEventType.accepted) {
        customEventType.status = 'accepted'
        customEventType.statusColor = 'green'
      } else {
        customEventType.status = 'declined'
        customEventType.statusColor = 'red'
      }
    }
  })

  const [deleteEventType] = useMutation(DELETE_EVENT_TYPE_MUTATION, {
    refetchQueries: [EVENT_TYPES_BY_USER_ID_QUERY, ALL_EVENT_TYPES_FOR_REVIEW_QUERY]
  })
  const [reassignEventType] = useMutation(RESEND_EVENT_TYPE_MUTATION, {
    refetchQueries: [EVENT_TYPES_BY_USER_ID_QUERY, ALL_EVENT_TYPES_FOR_REVIEW_QUERY]
  })

  const { Subscribe, Field, handleSubmit } = useForm({
    defaultValues: {
      eventName: editEventType?.name ?? '',
      interval: editEventType?.duration ? editEventType?.duration === 2 : false
    },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => {
      try {
        const updateEventTypeArgs = {
          name: value.eventName,
          duration: value.interval ? 2 : 1,
          user_id: user!.user_id
        }
        const { data } = await updateEventType({
          variables: {
            eventTypeId: editEventType.event_type_id,
            eventType: updateEventTypeArgs
          }
        })

        if (data) {
          toast.success('Successfully created event type!')
        }
      } catch (error) {
        toast.error('Failed to create event type!')
      }
      setOpen(false)
    }
  })

  if (error) {
    return <FetchResolvedWithError />
  }

  if (loading) {
    return <TableLoadingSkeleton />
  }

  return (
    <>
      <Table className={'w-full max-w-full table-fixed'}>
        <TableHeader>
          <Column isRowHeader>Events</Column>
          <Column className={'w-60'}>Status</Column>
          <Column className={'w-16'} />
        </TableHeader>
        <TableBody
          renderEmptyState={() => (
            <div
              className={'flex min-h-56 flex-col items-center justify-center gap-y-4 px-2.5 py-3'}
            >
              <div className={'flex flex-col items-center justify-center gap-y-2'}>
                <Text size={'h4'} weight={'semibold'} as={'span'}>
                  No event types found
                </Text>
                <Text
                  size={'body1'}
                  weight={'normal'}
                  color={'gray'}
                  className={'mx-auto max-w-prose text-center'}
                  as={'span'}
                >
                  Event types help categorize your events for better organization and planning. You
                  can create new event types to get started.
                </Text>
              </div>
            </div>
          )}
        >
          <>
            {queriedCustomEventTypes.length > 0
              ? queriedCustomEventTypes.map(
                  (eventType, i) =>
                    eventType && (
                      <Row key={`${eventType.name}_${i}`}>
                        <Cell>{eventType.name}</Cell>
                        <Cell>
                          <Badge
                            label={eventType.status}
                            variant={eventType.statusColor as never}
                          />
                        </Cell>
                        <Cell>
                          {eventType.accepted !== true && (
                            <MenuTrigger>
                              <Button
                                ghost={true}
                                size={'icon'}
                                className={
                                  'flex h-8 w-8 items-center justify-center text-slate-900'
                                }
                              >
                                <FontAwesomeIcon icon={faEllipsis} size={'1x'} />
                              </Button>
                              <Menu
                                placement={'bottom right'}
                                onAction={async (e) => {
                                  switch (e) {
                                    case 'edit':
                                      setEditEventType({
                                        event_type_id: eventType.event_type_id,
                                        name: eventType.name,
                                        duration: eventType.duration
                                      })
                                      setOpen(true)
                                      break
                                    case 'reassign':
                                      try {
                                        const { data } = await reassignEventType({
                                          variables: {
                                            eventTypeId: eventType.event_type_id
                                          }
                                        })
                                        if (data) {
                                          toast.success(
                                            'Event type was successfully resent to admins!'
                                          )
                                        }
                                      } catch (error) {
                                        toast.error('Failed to resent event type!')
                                      }
                                      break
                                    case 'delete':
                                      try {
                                        const { data } = await deleteEventType({
                                          variables: {
                                            eventTypeId: eventType.event_type_id
                                          }
                                        })
                                        if (data) {
                                          toast.success('Event type was successfully deleted!')
                                        }
                                      } catch (error) {
                                        toast.success('Failed to deleted event type!')
                                      }
                                      break
                                  }
                                }}
                              >
                                <MenuItem id={'edit'}>Edit</MenuItem>
                                {eventType.accepted === false && (
                                  <MenuItem id={'reassign'}>Reassign</MenuItem>
                                )}
                                {!eventType.accepted && <Separator className={'my-2'} />}

                                <MenuItem id={'delete'}>Delete</MenuItem>
                              </Menu>
                            </MenuTrigger>
                          )}
                        </Cell>
                      </Row>
                    )
                )
              : null}
          </>
        </TableBody>
      </Table>

      <DialogTrigger>
        <ModalOverlay isDismissable={false} isOpen={open} onOpenChange={setOpen}>
          <Modal>
            <Dialog className={'outline-none'}>
              {() => (
                <div>
                  <Text size={'h3'} weight={'semibold'} as={'h2'}>
                    New Event Type
                  </Text>
                  <Separator className={'my-3'} />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmit()
                    }}
                  >
                    <div className={'mb-6 flex flex-col gap-y-4'}>
                      <Field
                        name={'eventName'}
                        validators={{
                          onChange: z.string().trim().min(1, 'Please fill out this field.')
                        }}
                        children={({ state, handleChange, handleBlur }) => (
                          <TextField
                            defaultValue={state.value}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={handleBlur}
                            label={'Event Type'}
                            type={'text'}
                            fieldState={state}
                            placeholder={'Enter event type name'}
                          />
                        )}
                      />
                      <Field
                        name={'interval'}
                        validators={{
                          onChange: z.boolean()
                        }}
                        children={({ state, handleChange, handleBlur }) => (
                          <CheckboxField
                            defaultSelected={state.value}
                            onChange={(e) => handleChange(e)}
                            onBlur={handleBlur}
                            fieldState={state}
                            isSelected={state.value}
                          >
                            Event with date range
                          </CheckboxField>
                        )}
                      />
                    </div>
                    <Subscribe
                      selector={(state) => [state.canSubmit, state.isSubmitting]}
                      children={([canSubmit, isSubmitting]) => (
                        <Button
                          size={'normal'}
                          className={'w-full'}
                          type={'submit'}
                          isDisabled={!canSubmit}
                          isLoading={isSubmitting}
                        >
                          Update
                        </Button>
                      )}
                    />
                  </form>
                </div>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </>
  )
}
