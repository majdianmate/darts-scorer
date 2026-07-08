import type { AuthState } from '#/features/auth/types/auth-types'

const AUTH_STORAGE_KEY = 'darts-scorer-auth'

export function loadAuthFromStorage(): AuthState | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)

    if (!stored) {
      return null
    }

    return JSON.parse(stored) as AuthState
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function saveAuthToStorage(auth: AuthState): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

export function clearAuthFromStorage(): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}
