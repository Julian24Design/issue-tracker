import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Theme, ThemePanel } from '@radix-ui/themes'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import Navbar from './components/Navbar'
import { ThemeProvider } from 'next-themes'

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
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} min-h-svh`}>
        {renderToaster()}
        <SessionProvider>
          <ThemeProvider attribute={['class', 'data-theme']}>
            <Theme accentColor='crimson' grayColor='mauve' className='transition-colors'>
              <Navbar />
              {children}
            </Theme>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )

  function renderToaster() {
    return (
      <Toaster
        position='top-center'
        containerStyle={{ top: 100 }}
        toastOptions={{
          style: {
            padding: '14px 20px',
            maxWidth: '600px',
            backgroundColor: 'var(--color-panel-solid)',
            color: 'var(--gray-11)',
          },
          error: { style: { color: '#ff4b4b', fontWeight: 600 } },
        }}
      />
    )
  }
}
