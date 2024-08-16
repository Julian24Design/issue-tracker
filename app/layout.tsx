import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Theme, ThemePanel } from '@radix-ui/themes'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    template: '%s - Issue Tracker',
    default: 'Issue Tracker',
  },
  description: 'The best issue tracker you ever dreamed of.',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} min-h-svh`}>
        {renderToaster()}
        <Theme accentColor='crimson' grayColor='mauve'>
          <ThemePanel />
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </Theme>
      </body>
    </html>
  )

  function renderToaster() {
    return (
      <Toaster
        position='top-center'
        containerStyle={{ top: 100 }}
        toastOptions={{
          style: { padding: '14px 20px', maxWidth: '600px' },
          error: { style: { color: '#ff4b4b', fontWeight: 600 } },
        }}
      />
    )
  }
}
