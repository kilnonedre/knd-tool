import React from 'react'
import Link from 'next/link'

const routerList = [{ name: '画廊', href: '/gallery', mark: 'gallery' }]

const Introduce = () => {
  return (
    <div>
      {routerList.map(router => {
        return (
          <Link href={router.href} key={router.mark}>
            {router.name}
          </Link>
        )
      })}
    </div>
  )
}

export default Introduce
