'use client'

import React, { useState } from 'react'
import styles from './checkboxStyle.module.scss'
import types from './checkboxType.d'

const Checkbox = (props: types.ConfigProps) => {
  const [isCheck, setIsCheck] = useState(false)

  const styleList = [
    {
      '--checkbox-display': 'none',
      '--checkbox-background-color': '#ffffff',
      '--checkbox-border-color': props.color,
    },
    {
      '--checkbox-display': 'block',
      '--checkbox-background-color': props.color,
      '--checkbox-border-color': props.color,
    },
  ]

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked)
    props.onChange && props.onChange(e.target.checked)
  }

  return (
    <div className={styles['checkbox']}>
      <label className={styles['checkbox-panel']}>
        <input
          className={styles['checkbox__input']}
          type="checkbox"
          checked={isCheck}
          onChange={change}
        />
        <div
          className={styles['checkbox__fake']}
          style={styleList[Number(isCheck)] as React.CSSProperties}
        ></div>
        <p>{props.text}</p>
      </label>
    </div>
  )
}

export default Checkbox
