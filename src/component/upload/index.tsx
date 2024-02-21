'use client'

import React, { useRef, useEffect } from 'react'
import styles from './uploadStyle.module.scss'
import types from './uploadType.d'

const Upload = (props: types.ConfigProps) => {
  const fileFakeEle = useRef<HTMLDivElement>(null)
  const fileRealEle = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let ele: HTMLDivElement | null = null
    if (fileFakeEle.current) {
      fileFakeEle.current.addEventListener('drop', handleDrop)
      ele = fileFakeEle.current
    }
    return () => {
      ele && ele.removeEventListener('drop', handleDrop)
    }
  })

  const handleClearDragDefault = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: any) => {
    handleClearDragDefault(e)
    const files = [...e.dataTransfer.files]
    if (files && files.length) props.onFile(files[0])
  }

  const handleClick = () => {
    if (!fileRealEle.current) return
    fileRealEle.current.click()
  }

  const getFile = () => {
    if (!fileRealEle.current || !fileRealEle.current.files) return
    props.onFile(fileRealEle.current.files[0])
  }

  return (
    <div className={styles['upload']}>
      <div
        ref={fileFakeEle}
        className={`${styles['upload-main']} ${props.className}`}
        onClick={handleClick}
        onDragEnter={handleClearDragDefault}
        onDragLeave={handleClearDragDefault}
        onDragOver={handleClearDragDefault}
      >
        {props.slot ?? (
          <>
            <p className={styles['upload-main-icon']}></p>
            <p className={styles['upload-main-title']}>
              将文件拖到此处，或<span>点击上传</span>
            </p>
          </>
        )}
      </div>
      <input
        className={styles['upload-input']}
        type="file"
        ref={fileRealEle}
        onClick={e => {
          ;(e.target as any).value = null
        }}
        onChange={getFile}
      />
    </div>
  )
}

export default Upload
