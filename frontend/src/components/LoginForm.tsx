import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/forms/TextField'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { LOGIN_MUTATION_QUERY } from '@/graphql/queries/login-user'
import { useMutation } from '@apollo/client'
import { useUserContext } from '@/components/UserContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const LoginForm = () => {
  const { setToken } = useUserContext()
  const [loginUser] = useMutation(LOGIN_MUTATION_QUERY)
  const navigate = useNavigate()

  const { Subscribe, Field, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => {
      try {
        const { data } = await loginUser({
          variables: {
            email: value.email,
            password: value.password
          }
        })

        if (data) {
          setToken(data.signIn.token)
          navigate('/dashboard')
          toast.success('Login was successful')
        }
      } catch (error) {
        toast.error('Wrong email or password')
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
          name={'email'}
          validators={{
            onChange: z
              .string()
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
          name={'password'}
          validators={{
            onChange: z.string().trim().min(1, 'Please fill out this field.')
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
            Log In
          </Button>
        )}
      />
    </form>
  )
}
