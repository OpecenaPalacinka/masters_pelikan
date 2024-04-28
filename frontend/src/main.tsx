import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import RootPage from './routes/root'
import SignupPage from './routes/signup'
import LoginPage from './routes/login'
import DashboardPage from './routes/dashboard/index'
import MyEventTypesPage from './routes/dashboard/my-event-types'
import MyTimelinePage from './routes/dashboard/my-timeline'
import AdminAllUsersPage from './routes/dashboard/admin/users'
import PrevieEventTypesPage from './routes/dashboard/admin/review-event-types'

import { UserProvider } from '@/components/UserContext'
import { AuthRequired } from '@/components/AuthRequired'

import './index.css'
import { AdminRequired } from '@/components/AdminRequired'
import ProfilePage from './routes/profile'
import MyCausalityGraph from '@/routes/dashboard/my-causality-graph'
import PrivacyPolicy from '@/routes/legal/privacy-policy.tsx'

const router = createBrowserRouter([
  { path: '/', element: <RootPage /> },
  {
    path: '/login',
    element: <LoginPage />
  },
  { path: '/legal/privacy-policy', element: <PrivacyPolicy /> },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/profile',
    element: <AuthRequired />,
    children: [
      {
        index: true,
        element: <ProfilePage />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <AuthRequired />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: '/dashboard/my-event-types',
        element: <MyEventTypesPage />
      },
      {
        path: '/dashboard/my-timeline',
        element: <MyTimelinePage />
      },
      {
        path: '/dashboard/my-causality-graph',
        element: <MyCausalityGraph />
      },
      {
        path: '/dashboard/admin',
        element: <AdminRequired />,
        children: [
          {
            path: '/dashboard/admin/users',
            element: <AdminAllUsersPage />
          },
          {
            path: '/dashboard/admin/review-event-types',
            element: <PrevieEventTypesPage />
          }
        ]
      }
    ]
  }
])

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster
        richColors={true}
        offset={40}
        duration={3500}
        position={'bottom-right'}
        icons={undefined}
        toastOptions={{
          unstyled: false,
          classNames: {
            title: 'text-base/snug font-medium text-slate-900',
            description: 'text-sm/snug text-slate-700',
            toast: 'px-3 py-4 rounded border border-gray-200 shadow w-[356px] flex gap-x-2',
            default: 'bg-white',
            success: '!bg-blue-50 !border-blue-300',
            error: '!bg-red-50 !border-red-300',
            icon: 'hidden'
          }
        }}
      />
    </UserProvider>
  </ApolloProvider>
)
