'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { Provider as UrqlProvider } from 'urql'

import { AuthProvider, useAuthenticatedSession } from '@/lib/tabby/auth'
import { client } from '@/lib/tabby/gql'
import { LicenseProvider } from '@/lib/tabby/license'
import { TooltipProvider } from '@/components/ui/tooltip'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <UrqlProvider value={client}>
        <TooltipProvider>
          <AuthProvider>
            <LicenseProvider>
              <EnsureSignin />
              {children}
            </LicenseProvider>
          </AuthProvider>
        </TooltipProvider>
      </UrqlProvider>
    </NextThemesProvider>
  )
}

function EnsureSignin() {
  useAuthenticatedSession()
  return <></>
}
