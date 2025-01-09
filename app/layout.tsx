// app/layout.tsx

import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from '@tanstack/react-query';
import {TanstackProvider}   from '../lib/queryClient'

export const metadata = {
  title: 'Total Recall',
  description: 'Voyages interspacial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </SessionProvider>
      </body>
    </html>
  )
}