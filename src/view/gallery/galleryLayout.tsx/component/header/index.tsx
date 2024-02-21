'use client'

import React from 'react'
import styles from './headerStyle.module.scss'
import { Avatar } from '@nextui-org/react'

const Header = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['header-main']}>
        <div>L</div>
        <Avatar isBordered src="/avatar.jpg" />
      </div>
    </div>
  )
}

export default Header
