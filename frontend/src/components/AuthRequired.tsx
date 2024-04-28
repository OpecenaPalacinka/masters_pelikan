import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext, User } from '@/components/UserContext.tsx'
import * as jose from 'jose'

export const AuthRequired = () => {
  const { user, setUser } = useUserContext()
  const token = localStorage.getItem('contextUserToken')
  const storageUser: { iat: number; role: string; user: User } | null =
    token !== null ? jose.decodeJwt(token) : null

  if (!storageUser && user && user.role === 'logged-out') {
    return <Navigate to={'/'} />
  }

  if (!storageUser && user && user.role === 'not-logged-in') {
    return <Navigate to={'/login'} />
  }

  if (user && user.role === 'not-logged-in' && storageUser) {
    setUser(storageUser.user ?? user)
  }

  return <Outlet />
}
