import { Logo } from '@/components/ui/Logo'
import { buttonStyles } from '@/components/ui/Button'
import { Link } from '@/components/ui/Link'
import { cx } from '@/lib/cva'

export const Header = () => {
  return (
    <header className={'h-14 w-full border-b border-gray-200'}>
      <div className={'mx-auto flex h-full max-w-screen-xl items-center justify-between px-5'}>
        <div className={'flex items-center'}>
          <Link href={'/'} className={'ring-offset-2 '}>
            <Logo />
          </Link>
        </div>
        <div className={'flex gap-x-2.5'}>
          <Link
            href={'/login'}
            className={cx(buttonStyles({ outline: 'primary', size: 'sm' }), 'cursor-pointer')}
          >
            Log In
          </Link>
          <Link
            href={'/signup'}
            className={cx(buttonStyles({ solid: 'primary', size: 'sm' }), 'cursor-pointer')}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}
