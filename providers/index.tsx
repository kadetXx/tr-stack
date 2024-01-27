'use client'

import React from 'react'
import { AuthProvider } from './auth-provider'
import { TrpcProvider } from './trpc-provider'
import { PropsWithChildren } from 'react'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TrpcProvider>
      <AuthProvider>{children}</AuthProvider>
    </TrpcProvider>
  )
}
