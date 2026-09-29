import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

const USERS_KEY = 'streamflix_users'
const ACTIVE_USER_KEY = 'streamflix_active_user'

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ACTIVE_USER_KEY) || 'null')
    } catch {
      return null
    }
  })

  const login = ({ email, password }) => {
    const users = readUsers()
    const match = users.find(
      (entry) => entry.email.toLowerCase() === String(email).toLowerCase() && entry.password === password,
    )

    if (!match) {
      return { success: false, message: 'Invalid email or password.' }
    }

    const activeUser = { name: match.name, email: match.email }
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(activeUser))
    setUser(activeUser)
    return { success: true, user: activeUser }
  }

  const signup = ({ name, email, password }) => {
    const users = readUsers()
    const exists = users.some((entry) => entry.email.toLowerCase() === String(email).toLowerCase())

    if (exists) {
      return { success: false, message: 'An account with this email already exists.' }
    }

    const nextUser = { name, email, password }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, nextUser]))

    const activeUser = { name, email }
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(activeUser))
    setUser(activeUser)
    return { success: true, user: activeUser }
  }

  const logout = () => {
    localStorage.removeItem(ACTIVE_USER_KEY)
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

