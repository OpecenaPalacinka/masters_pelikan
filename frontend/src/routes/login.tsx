import { Text } from '@/components/ui/Text'
import { Link } from '@/components/ui/Link'
import { Logo } from '@/components/ui/Logo'
import { LoginForm } from '@/components/LoginForm'
import { Separator } from '@/components/ui/Sepator'

export default function LoginPage() {
  return (
    <div className={'relative flex min-h-[100dvh] items-center justify-center bg-gray-50'}>
      <div className={'w-full max-w-[488px] px-5'}>
        <Text size={'h1'} weight={'bold'} className={'mb-2'}>
          Log In
        </Text>
        <Text size={'body1'} color={'gray'} className={'mb-4'}>
          Welcome back! Please log in to continue.
        </Text>
        <div className={'rounded-lg border border-gray-200 bg-slate-50 shadow-sm'}>
          <div className={'rounded-lg border-b border-gray-200 bg-white p-4'}>
            <div className={'mb-3'}>
              <div className={'mb-3'}>
                <Logo className={'h-auto w-20'} />
              </div>
              <Separator />
            </div>
            <LoginForm />
          </div>
          <div className={'p-4'}>
            <Text size={'body1'} color={'gray'}>
              Don't have an account?{' '}
              <Link size={'body1'} href={'/signup'} color={'blue'} underline={'always'}>
                Sign up
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
