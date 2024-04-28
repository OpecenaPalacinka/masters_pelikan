import React from 'react'
import * as jose from 'jose'

export type User = {
  user_id: number
  email: string
  firstname: string
  lastname: string
  registred: string
  role: string
}

export type UserContextType = {
  user: User | null
  setToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}

export const initialUser: User = {
  user_id: 0,
  email: '',
  firstname: '',
  lastname: '',
  registred: '',
  role: 'not-logged-in'
}

export const UserContext = React.createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User>(initialUser)
  const saveToken = (token: string) => {
    localStorage.setItem('contextUserToken', JSON.stringify(token))
    const decodedToken: { iat: number; role: string; user: User } = jose.decodeJwt(token)
    const user = { ...decodedToken.user, role: decodedToken.role }
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('contextUserToken')
    const loggedOutUser = initialUser
    loggedOutUser.role = 'logged-out'
    setUser(loggedOutUser)
  }

  return (
    <UserContext.Provider value={{ user, setToken: saveToken, setUser: setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const userContext = React.useContext(UserContext)

  if (!userContext) {
    throw new Error('No user context!')
  }
  return userContext
}
