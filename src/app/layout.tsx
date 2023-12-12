import './globals.css'
import type { Metadata } from 'next'
import mainLayoutTypes from '@/view/mainLayout/mainLayoutType.d'
import MainLayout from '@/view/mainLayout'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const RootLayout = ({ children }: mainLayoutTypes.ConfigProps) => {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}

export default RootLayout
