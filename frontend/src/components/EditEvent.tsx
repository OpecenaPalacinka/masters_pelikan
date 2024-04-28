import { Dialog, DialogTrigger } from 'react-aria-components'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Sepator'
import { Modal, ModalOverlay } from '@/components/ui/Modal'
import { TextField } from '@/components/forms/TextField'
import { TextAreaField } from '@/components/forms/TextAreaField'
import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { SelectField, SelectOption } from '@/components/forms/SelectField'
import { RadioGroupField } from '@/components/forms/RadioGroupField'
import { Radio } from '@/components/ui/RadioGroup'
import { MyDatePicker } from '@/components/forms/DatePickerField'
import { ALL_EVENT_TYPES_QUERY } from '@/graphql/queries/get-all-event-types'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_EVENTS_BY_USER_ID_QUERY } from '@/graphql/queries/all-events-by-user-id'
import { useUserContext } from '@/components/UserContext'
import { ALL_CAUSALITY_TYPES_QUERY } from '@/graphql/queries/get-all-causality-types'
import { EventInput, EventToType } from '@/__generated__/graphql'
import { toast } from 'sonner'
import { parseDate } from '@internationalized/date'
import { UPDATE_EVENT_MUTATION } from '@/graphql/queries/update-event.ts'
import { ALL_CAUSALITIES_BY_EVENT_IDS_QUERY } from '@/graphql/queries/all-causalities-by-event-ids.ts'

export const EditEvent = (event: EventToType) => {
  const { user } = useUserContext()
  const [open, setOpen] = React.useState<boolean>(false)
  const [isIntervalEventType, setIsIntervalEventType] = React.useState<boolean>(false)
  const [resetForm, setResetForm] = React.useState<boolean>(true)
  const updateSetOpen = () => {
    setOpen(false)
    setResetForm(true)
  }

  useEffect(() => {
    if (event.event_id.ended) {
      setIsIntervalEventType(true)
    } else {
      setIsIntervalEventType(false)
    }
  }, [event.event_id.ended])

  const { data: eventTypes, loading: eventTypesLoading } = useQuery(ALL_EVENT_TYPES_QUERY)
  const { data: events, loading: eventsLoading } = useQuery(ALL_EVENTS_BY_USER_ID_QUERY, {
    variables: { userId: user!.user_id }
  })
  const { data: causalityTypes, loading: causalityTypesLoading } =
    useQuery(ALL_CAUSALITY_TYPES_QUERY)

  const { data: causality } = useQuery(ALL_CAUSALITIES_BY_EVENT_IDS_QUERY, {
    variables: { eventIds: [event.event_id.event_id] }
  })

  const [updateEvent] = useMutation(UPDATE_EVENT_MUTATION, {
    refetchQueries: 'active'
  })

  const { Subscribe, Field, handleSubmit, setFieldValue } = useForm({
    defaultValues: {
      eventType: event.event_type_id.event_type_id.toString() ?? '',
      title: event.event_id.label ?? '',
      description: event.event_id.description ?? '',
      date: event.event_id.happened ?? '',
      dateEnded: event.event_id.ended ?? '',
      antecedent: causality?.getAllCausalitiesByEventIds[0]?.antecedent?.toString() ?? '',
      succedent: causality?.getAllCausalitiesByEventIds[0]?.succedent?.toString() ?? '',
      causality:
        causality?.getAllCausalitiesByEventIds[0]?.causality_type_id.causality_types_id.toString() ??
        '',
      feeling: event.event_id.sentiment_id?.sentiment_id.toString() ?? ''
    },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => {
      if (value.dateEnded && value.date > value.dateEnded) {
        toast.error('The end date cannot be before the start date')
        return
      }

      if (
        value.antecedent &&
        value.antecedent !== 'null' &&
        (!value.causality || value.causality === 'null')
      ) {
        toast.error('Please select a causality type')
        return
      }
      if (
        value.succedent &&
        value.succedent !== 'null' &&
        (!value.causality || value.causality === 'null')
      ) {
        toast.error('Please select a causality type')
        return
      }
      const updateEventData: EventInput = {
        user_id: user!.user_id,
        happened: value.date,
        ended: value.dateEnded,
        description: value.description,
        label: value.title,
        sentiment_id: parseInt(value.feeling),
        event_type_id: parseInt(value.eventType),
        antecedent:
          value.antecedent !== 'null' && value.antecedent ? parseInt(value.antecedent) : null,
        succedent: value.succedent !== 'null' && value.succedent ? parseInt(value.succedent) : null,
        causality_id:
          value.causality !== 'null' && value.causality ? parseInt(value.causality) : null
      }
      try {
        console.log(updateEventData)
        console.log(event.event_id.event_id)
        const { data } = await updateEvent({
          variables: {
            updateEventId: event.event_id.event_id,
            event: updateEventData
          }
        })

        if (data) {
          toast.success('Successfully updated event!')
        }
      } catch (error) {
        toast.error('Failed to update event!')
      }
      setOpen(false)
    }
  })

  useEffect(() => {
    if (resetForm) {
      setFieldValue('eventType', event.event_type_id.event_type_id.toString() ?? '')
      setFieldValue('title', event.event_id.label ?? '')
      setFieldValue('description', event.event_id.description ?? '')
      setFieldValue('date', event.event_id.happened ?? '')
      setFieldValue('dateEnded', event.event_id.ended ?? '')
      setFieldValue(
        'antecedent',
        causality?.getAllCausalitiesByEventIds[0]?.antecedent?.toString() ?? ''
      )
      setFieldValue(
        'succedent',
        causality?.getAllCausalitiesByEventIds[0]?.succedent?.toString() ?? ''
      )
      setFieldValue(
        'causality',
        causality?.getAllCausalitiesByEventIds[0]?.causality_type_id.causality_types_id.toString() ??
          ''
      )
      setFieldValue('feeling', event.event_id.sentiment_id?.sentiment_id.toString() ?? '')
      setResetForm(false) // Reset the resetForm state variable
    }
  }, [resetForm, event, causality])

  return (
    <DialogTrigger>
      <Button outline={'primary'} size={'sm'} onPress={() => setOpen(true)}>
        Edit
      </Button>
      <ModalOverlay isDismissable={false} isOpen={open} onOpenChange={updateSetOpen}>
        <Modal>
          <Dialog className={'outline-none'}>
            {() => (
              <div>
                <Text size={'h3'} weight={'semibold'} as={'h2'}>
                  Update Event
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
                      name={'eventType'}
                      validators={{
                        onChange: z.string().min(1, 'Please select an event type')
                      }}
                      children={({ state, handleChange }) => (
                        <SelectField
                          required={true}
                          defaultValue={state.value ? state.value.toString() : ''}
                          onValueChange={(e) => {
                            handleChange(e)
                            const eventType = eventTypes?.getAllEventTypes.find(
                              (toFind) => toFind.event_type_id === parseInt(e)
                            )
                            if (eventType) {
                              setIsIntervalEventType(eventType.duration === 2)
                            }
                          }}
                          fieldState={state}
                          label={'Event Type'}
                          className={'w-full'}
                          placeholder={'Choose event type'}
                        >
                          {!eventTypesLoading && eventTypes && eventTypes.getAllEventTypes ? (
                            eventTypes.getAllEventTypes.map((evenType) => (
                              <SelectOption
                                key={evenType.event_type_id}
                                value={evenType.event_type_id.toString()}
                              >
                                {evenType.name}
                              </SelectOption>
                            ))
                          ) : (
                            <SelectOption value={'Loading'}>Loading</SelectOption>
                          )}
                        </SelectField>
                      )}
                    />
                    <Field
                      name={'title'}
                      validators={{
                        onChange: z.string().trim().min(1, 'Please fill out the title.')
                      }}
                      children={({ state, handleChange, handleBlur }) => (
                        <TextField
                          defaultValue={state.value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                          label={'Title'}
                          type={'text'}
                          fieldState={state}
                          placeholder={'Enter event title'}
                        />
                      )}
                    />
                    <Field
                      name={'date'}
                      validators={{
                        onChange: z.string().trim().min(1, 'Please fill out the date of event.')
                      }}
                      children={({ state, handleChange, handleBlur }) => (
                        <MyDatePicker
                          defaultValue={state.value ? parseDate(state.value) : null}
                          label={'Event date'}
                          onChange={(e) => handleChange(e.toString())}
                          onBlur={handleBlur}
                          fieldState={state}
                        />
                      )}
                    ></Field>
                    {isIntervalEventType && (
                      <Field
                        name={'dateEnded'}
                        validators={{
                          onChange: z
                            .string()
                            .trim()
                            .min(1, 'Please fill out the end date of event.')
                        }}
                        children={({ state, handleChange, handleBlur }) => (
                          <MyDatePicker
                            defaultValue={state.value ? parseDate(state.value) : null}
                            label={'Event ended'}
                            onChange={(e) => handleChange(e.toString())}
                            onBlur={handleBlur}
                            fieldState={state}
                          />
                        )}
                      ></Field>
                    )}
                    <Field
                      name={'description'}
                      validators={{
                        onChange: z.string().trim().min(1, 'Please fill out the description.')
                      }}
                      children={({ state, handleChange, handleBlur }) => (
                        <TextAreaField
                          defaultValue={state.value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                          label={'Description'}
                          fieldState={state}
                          placeholder={'Enter short description'}
                        />
                      )}
                    />
                    <div className={'flex gap-x-4'}>
                      <Field
                        name={'antecedent'}
                        children={({ state, handleChange }) => (
                          <SelectField
                            defaultValue={state.value ? state.value.toString() : ''}
                            onValueChange={(e) => handleChange(e)}
                            fieldState={state}
                            label={'Antecedent'}
                            className={'w-full'}
                            placeholder={'Choose antecedent'}
                          >
                            {!eventsLoading && events && events.getAllEventsByUserId ? (
                              events.getAllEventsByUserId.map((eventMapped) =>
                                eventMapped && eventMapped.event_id !== event.event_id.event_id ? (
                                  <SelectOption
                                    key={eventMapped?.event_id}
                                    value={eventMapped?.event_id.toString()}
                                  >
                                    {eventMapped.label}
                                  </SelectOption>
                                ) : null
                              )
                            ) : (
                              <SelectOption value={'Loading'}>Loading</SelectOption>
                            )}
                            <SelectOption value={'null'}>No Antecedent</SelectOption>
                          </SelectField>
                        )}
                      />
                      <Field
                        name={'succedent'}
                        children={({ state, handleChange }) => (
                          <SelectField
                            defaultValue={state.value ? state.value.toString() : ''}
                            onValueChange={(e) => handleChange(e)}
                            fieldState={state}
                            label={'Succedent'}
                            className={'w-full'}
                            placeholder={'Choose succedent'}
                          >
                            {!eventsLoading && events && events.getAllEventsByUserId ? (
                              events.getAllEventsByUserId.map((eventMapped) =>
                                eventMapped && eventMapped.event_id !== event.event_id.event_id ? (
                                  <SelectOption
                                    key={eventMapped?.event_id}
                                    value={eventMapped?.event_id.toString()}
                                  >
                                    {eventMapped.label}
                                  </SelectOption>
                                ) : null
                              )
                            ) : (
                              <SelectOption value={'Loading'}>Loading</SelectOption>
                            )}
                            <SelectOption value={'null'}>No Succedent</SelectOption>
                          </SelectField>
                        )}
                      />
                    </div>
                    <Field
                      name={'causality'}
                      children={({ state, handleChange }) => (
                        <SelectField
                          defaultValue={state.value ? state.value.toString() : ''}
                          onValueChange={(e) => handleChange(e)}
                          fieldState={state}
                          label={'Causality'}
                          className={'w-full'}
                          placeholder={'Choose causality'}
                        >
                          {!causalityTypesLoading && causalityTypes ? (
                            causalityTypes.getAllCausalityTypes.map((causality) => (
                              <SelectOption
                                key={causality.causality_types_id}
                                value={causality.causality_types_id.toString()}
                              >
                                {causality.name}
                              </SelectOption>
                            ))
                          ) : (
                            <SelectOption value={'Loading'}>Loading</SelectOption>
                          )}
                          <SelectOption value={'null'}>No Causality</SelectOption>
                        </SelectField>
                      )}
                    />
                    <Field
                      name={'feeling'}
                      children={({ state, handleChange }) => (
                        <RadioGroupField
                          defaultValue={state.value}
                          label={'Feeling'}
                          onChange={(e) => handleChange(e)}
                          fieldState={state}
                        >
                          <Radio value={'1'}>Positive</Radio>
                          <Radio value={'2'}>Neutral</Radio>
                          <Radio value={'3'}>Negative</Radio>
                        </RadioGroupField>
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
  )
}
