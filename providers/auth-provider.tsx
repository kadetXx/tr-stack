'use client'

import React, { createContext, PropsWithChildren, useContext } from 'react'

type AuthContextType = {
  session: object | null
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: PropsWithChildren) {
  /**
   * perform all auth logic here
   * e.g for supabase, you would want to subscribe
   * to auth events.
   */

  return (
    <AuthContext.Provider value={{ session: {} }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
