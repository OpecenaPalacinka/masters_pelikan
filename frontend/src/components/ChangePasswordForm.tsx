import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/forms/TextField'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { useMutation } from '@apollo/client'
import { RESET_USER_PASSWORD_MUTATION } from '@/graphql/queries/reset-user-password.ts'
import { useUserContext } from '@/components/UserContext.tsx'
import { toast } from 'sonner'

export const ChangePasswordForm = () => {
  const { user } = useUserContext()
  const [resetPassword] = useMutation(RESET_USER_PASSWORD_MUTATION)
  const { Subscribe, Field, handleSubmit, getFieldValue } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => {
      try {
        const { data } = await resetPassword({
          variables: {
            userId: user!.user_id,
            newPassword1: value.password,
            newPassword2: value.confirmPassword
          }
        })
        if (data) {
          toast.success('Password was successfully changed!')
        }
      } catch (e) {
        toast.error('Password failed to update!')
      }
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <div className={'mb-6 flex flex-col gap-y-4'}>
        <Field
          name={'password'}
          validators={{
            onChange: z.string().trim().min(1, 'Please fill out this field.')
          }}
          children={({ state, handleChange, handleBlur }) => (
            <TextField
              defaultValue={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              label={'New Password'}
              type={'password'}
              fieldState={state}
              placeholder={'Enter new password'}
            />
          )}
        />
        <Field
          name={'confirmPassword'}
          validators={{
            onChangeListenTo: ['password'],
            onChange: z
              .string()
              .trim()
              .min(1, 'Please fill out this field.')
              .refine((value) => value === getFieldValue('password'), {
                message: 'The provided password does not match.'
              })
          }}
          children={({ state, handleChange, handleBlur }) => (
            <TextField
              defaultValue={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              label={'Confirm Password'}
              type={'password'}
              fieldState={state}
              placeholder={'Confirm your new password'}
            />
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
            Change Password
          </Button>
        )}
      />
    </form>
  )
}
