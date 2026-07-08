import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useServerFn } from '@tanstack/react-start'
import {
  clearAuthFromStorage,
  loadAuthFromStorage,
  saveAuthToStorage,
} from '#/features/auth/hook/auth-storage'
import { signOutServerFn } from '#/features/auth/server/sign-out-server-fn'
import type {
  AuthSignInResult,
  AuthState,
  AuthUser,
} from '#/features/auth/types/auth-types'

interface AuthContextValue {
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isHydrated: boolean
  isSigningOut: boolean
  signIn: (result: AuthSignInResult) => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const signOutRequest = useServerFn(signOutServerFn)
  const [auth, setAuth] = useState<AuthState | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  useEffect(() => {
    setAuth(loadAuthFromStorage())
    setIsHydrated(true)
  }, [])

  const signIn = useCallback((result: AuthSignInResult) => {
    const nextAuth: AuthState = {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    }

    setAuth(nextAuth)
    saveAuthToStorage(nextAuth)
  }, [])

  const signOut = useCallback(async () => {
    if (!auth) {
      return
    }

    setIsSigningOut(true)

    try {
      await signOutRequest({
        data: {
          userId: auth.user.id,
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        },
      })
    } finally {
      setAuth(null)
      clearAuthFromStorage()
      setIsSigningOut(false)
    }
  }, [auth, signOutRequest])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: auth?.user ?? null,
      accessToken: auth?.accessToken ?? null,
      refreshToken: auth?.refreshToken ?? null,
      isAuthenticated: auth !== null,
      isHydrated,
      isSigningOut,
      signIn,
      signOut,
    }),
    [auth, isHydrated, isSigningOut, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
