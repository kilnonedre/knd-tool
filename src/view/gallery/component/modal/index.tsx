'use client'

import React, { useState } from 'react'
import styles from './modalStyle.module.scss'
import types from './modalType.d'
import { type ElementRef, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { Image } from '@nextui-org/react'
import Icon from '@/component/icon'
import { GetFileById } from '@/api/gallery'
import { ConfigGalleryPaint } from '@/app/api/gallery/paints/fileType.d'
import { toast } from 'sonner'

const Modal = (props: types.ConfigProps) => {
  const router = useRouter()
  const dialogRef = useRef<ElementRef<'dialog'>>(null)
  const [paint, setPaint] = useState<ConfigGalleryPaint | null>(null)

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      requestAnimationFrame(() => {
        init()
        dialogRef.current?.showModal()
        document.body.style.overflowY = 'hidden'
      })
      return () => {
        dialogRef.current?.close()
        document.body.style.overflowY = 'auto'
      }
    }
  }, [dialogRef])

  const init = async () => {
    const response = await GetFileById({ id: props.id })
    const { code, data, msg } = await response.json()
    if (code !== 200) return toast.error(msg)
    setPaint(data)
  }

  const onDismiss = () => {
    router.back()
    document.body.style.overflow = 'auto'
  }

  return createPortal(
    <div className={styles['modal__mask']}>
      <dialog
        ref={dialogRef}
        className={styles['modal__panel']}
        onClose={onDismiss}
      >
        <div className={styles['modal__close']}>
          <Icon font="" cursor="pointer" onPress={onDismiss} />
        </div>
        <div className={styles['modal__main']}>
          <div className={styles['main']}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            praesentium amet corrupti quos, debitis consectetur. Quidem, saepe
            ut? Veritatis, labore?
            <div className={styles['modal-image']}>
              <Image shadow="sm" alt="NextUI hero Image" src={paint?.uri} />
            </div>
          </div>
        </div>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  )
}

export default Modal
