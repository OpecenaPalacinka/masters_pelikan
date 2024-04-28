import { Dialog, DialogTrigger } from 'react-aria-components'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Sepator'
import { Modal, ModalOverlay } from '@/components/ui/Modal'
import { TextField } from '@/components/forms/TextField'
import { CheckboxField } from '@/components/forms/CheckboxField'
import React from 'react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { useMutation } from '@apollo/client'
import { CREATE_EVENT_TYPE_MUTATION } from '@/graphql/queries/create-event-type.ts'
import { EVENT_TYPES_BY_USER_ID_QUERY } from '@/graphql/queries/event-types-by-user-id.ts'
import { useUserContext } from '@/components/UserContext.tsx'
import { ALL_EVENT_TYPES_FOR_REVIEW_QUERY } from '@/graphql/queries/get-all-event-types-for-review.ts'
import { toast } from 'sonner'

export const CreateEventType = () => {
  const { user } = useUserContext()
  const [open, setOpen] = React.useState<boolean>(false)
  const [createEventType] = useMutation(CREATE_EVENT_TYPE_MUTATION, {
    refetchQueries: [EVENT_TYPES_BY_USER_ID_QUERY, ALL_EVENT_TYPES_FOR_REVIEW_QUERY]
  })

  const { Subscribe, Field, handleSubmit } = useForm({
    defaultValues: {
      eventName: '',
      interval: false
    },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => {
      try {
        const createEventTypeArgs = {
          name: value.eventName,
          duration: value.interval ? 2 : 1,
          user_id: user!.user_id
        }
        const { data } = await createEventType({
          variables: {
            eventType: createEventTypeArgs
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

  return (
    <DialogTrigger>
      <Button solid={'primary'} size={'sm'} onPress={() => setOpen(true)}>
        Create Event Type
      </Button>
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
                          defaultSelected={false}
                          onChange={(e) => handleChange(e)}
                          onBlur={handleBlur}
                          fieldState={state}
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
                        Create
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
