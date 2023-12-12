'use client'

import React, { useEffect } from 'react'
import types from './mainLayoutType.d'
import { Toaster, toast } from 'sonner'
import { NextUIProvider } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import { setRouter } from '@/util/http/middleware'

const MainLayout = ({ children }: types.ConfigProps) => {
  const pathname = usePathname()

  const router = useRouter()

  setRouter(router)

  const noVerifyPageList = ['/']

  useEffect(() => {
    const index = noVerifyPageList.indexOf(pathname)
    if (index === -1 && !localStorage.getItem('DST_Token')) {
      toast.error('Token 不存在，请重新登录')
      router.push('/')
    }
  }, [pathname])

  return (
    <>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster position="bottom-right" richColors />
    </>
  )
}

export default MainLayout
