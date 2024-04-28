import { Navigate, Outlet } from 'react-router-dom'
import { User, useUserContext } from '@/components/UserContext.tsx'
import * as jose from 'jose'

export const AdminRequired = () => {
  const { user, setUser } = useUserContext()
  const token = localStorage.getItem('contextUserToken')
  const storageUser: { iat: number; role: string; user: User } | null =
    token !== null ? jose.decodeJwt(token) : null

  if (storageUser && storageUser.role !== 'admin') {
    return <Navigate to={'/login'} />
  }

  if (storageUser && storageUser.role === 'not-logged-in') {
    setUser(storageUser.user ?? user)
  }

  return <Outlet />
}
