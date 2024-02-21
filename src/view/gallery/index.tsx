'use client'

import React, { useState } from 'react'
import styles from './galleryStyle.module.scss'
import Waterfall from './component/waterfall'
import Upload from '@/component/upload'
import { UploadFile } from '@/api/gallery'
import { toast } from 'sonner'

const Gallery = () => {
  const [reload, setReload] = useState<boolean>(false)

  const getFile = async (file: File) => {
    const formData = new FormData()
    formData.set('file', file)
    const response = await UploadFile(formData)
    const { code, msg } = await response.json()
    if (code !== 200) return toast.error(msg)
    toast.success('图片上传成功')
    setReload(!reload)
  }

  return (
    <div className={styles['gallery']}>
      <Upload onFile={getFile} slot={<h1>Upload</h1>} />
      <Waterfall reload={reload} />
    </div>
  )
}

export default Gallery
