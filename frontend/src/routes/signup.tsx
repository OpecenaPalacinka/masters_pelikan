import { Text } from '@/components/ui/Text'
import { Link } from '@/components/ui/Link'
import { Logo } from '@/components/ui/Logo'
import { Separator } from '@/components/ui/Sepator'
import { SignupForm } from '@/components/SignupForm'

export default function SignupPage() {
  return (
    <div className={'relative flex min-h-[100dvh] items-center justify-center bg-gray-50'}>
      <div className={'w-full max-w-[488px] px-5'}>
        <Text size={'h1'} weight={'bold'} className={'mb-2'}>
          Sign Up
        </Text>
        <Text size={'body1'} color={'gray'} className={'mb-4'}>
          Welcome! Please fill in the details to get started.
        </Text>
        <div className={'rounded-lg border border-gray-200 bg-slate-50 shadow-sm'}>
          <div className={'rounded-lg border-b border-gray-200 bg-white p-4'}>
            <div className={'mb-3'}>
              <div className={'mb-3'}>
                <Logo className={'h-auto w-20'} />
              </div>
              <Separator />
            </div>
            <SignupForm />
          </div>
          <div className={'p-4'}>
            <Text size={'body1'} color={'gray'}>
              Already have an account?{' '}
              <Link size={'body1'} href={'/login'} color={'blue'} underline={'always'}>
                Log In
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
