import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/forms/TextField'
import { Text } from '@/components/ui/Text'
import { Link } from '@/components/ui/Link'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { useMutation } from '@apollo/client'
import { SIGNUP_MUTATION_QUERY } from '@/graphql/queries/sign-up-user.ts'
import { useUserContext } from '@/components/UserContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const SignupForm = () => {
  const { setToken } = useUserContext()
  const [signUpUser] = useMutation(SIGNUP_MUTATION_QUERY)
  const navigate = useNavigate()

  const { Subscribe, Field, handleSubmit, getFieldValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: ''
    },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => {
      try {
        const signUp = {
          email: value.email,
          password: value.password,
          firstName: value.firstName,
          lastName: value.lastName
        }
        const { data } = await signUpUser({
          variables: {
            signUp: signUp
          }
        })

        if (data) {
          setToken(data.signUp.token)
          navigate('/dashboard')
          toast.success('Signup was successfull!')
        }
      } catch (error) {
        toast.error('Signup failed!')
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
      <div className={'flex flex-col gap-y-4'}>
        <Field
          name={'firstName'}
          validators={{
            onChange: z.string().trim().min(1, 'Please fill out this field.')
          }}
          children={({ state, handleChange, handleBlur }) => (
            <TextField
              defaultValue={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              label={'First Name'}
              type={'text'}
              fieldState={state}
              placeholder={'Enter your first name'}
            />
          )}
        />
        <Field
          name={'lastName'}
          validators={{
            onChange: z.string().trim().min(1, 'Please fill out this field.')
          }}
          children={({ state, handleChange, handleBlur }) => (
            <TextField
              defaultValue={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              label={'Last Name'}
              type={'text'}
              fieldState={state}
              placeholder={'Enter your last name'}
            />
          )}
        />
        <Field
          name={'email'}
          validators={{
            onChange: z
              .string()
              .trim()
              .min(1, 'Please fill out this field.')
              .email('Please enter valid email address.')
          }}
          children={({ state, handleChange, handleBlur }) => (
            <TextField
              defaultValue={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              label={'Email'}
              type={'email'}
              fieldState={state}
              placeholder={'Your email address'}
            />
          )}
        />
        <Field
          name={'confirmEmail'}
          validators={{
            onChangeListenTo: ['email'],
            onChange: z
              .string()
              .trim()
              .min(1, 'Please fill out this field.')
              .email('Please enter valid email address.')
              .refine((value) => value === getFieldValue('email'), {
                message: 'The provided email does not match.'
              })
          }}
          children={({ state, handleChange, handleBlur }) => (
            <TextField
              defaultValue={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              label={'Repeat Email'}
              type={'email'}
              fieldState={state}
              placeholder={'Confirm your email'}
            />
          )}
        />
        <Field
          name={'password'}
          validators={{
            onChange: z.string().trim().min(6, 'The password must be at least 6 characters long')
          }}
          children={({ state, handleChange, handleBlur }) => (
            <TextField
              defaultValue={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              label={'Password'}
              type={'password'}
              fieldState={state}
              placeholder={'Enter your password'}
            />
          )}
        />
      </div>
      <Text size={'body0'} color={'gray'} className={'mb-6 mt-3'}>
        By creating an account you agree with our{' '}
        <Link size={'body0'} color={'blue'} underline={'hover'} href={'/legal/privacy-policy'}>
          Privacy Policy
        </Link>
        .
      </Text>
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
            Sign Up
          </Button>
        )}
      />
    </form>
  )
}
