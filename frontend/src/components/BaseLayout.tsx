import { RouterProvider as RACRouterProvider } from 'react-aria-components'
import { useNavigate } from 'react-router-dom'

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  return <RACRouterProvider navigate={navigate}>{children}</RACRouterProvider>
}
