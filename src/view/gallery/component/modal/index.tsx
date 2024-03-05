'use client'

import React, { useState } from 'react'
import styles from './modalStyle.module.scss'
import types from './modalType.d'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { Image, Skeleton } from '@nextui-org/react'
import Icon from '@/component/icon'
import { GetFileById } from '@/api/gallery'
import { ConfigGalleryPaint } from '@/app/api/gallery/paints/fileType.d'
import { toast } from 'sonner'
import { PhotoProvider, PhotoView } from 'react-photo-view'

const Modal = (props: types.ConfigProps) => {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const [paint, setPaint] = useState<ConfigGalleryPaint | null>(null)
  const [isLoaded, setIsLoad] = useState(false)

  useEffect(() => {
    if (modalRef.current) {
      requestAnimationFrame(() => {
        init()
        document.body.style.overflow = 'hidden'
      })
      return () => {
        document.body.style.overflow = 'auto'
      }
    }
  }, [modalRef])

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
      <div ref={modalRef} className={styles['modal__panel']}>
        <div className={styles['modal__close']}>
          <Icon font="" cursor="pointer" onPress={onDismiss} />
        </div>
        <div className={styles['modal__main']}>
          <div className={styles['main']}>
            <div className={styles['main-image']}>
              <Skeleton
                isLoaded={isLoaded}
                className={styles['main-image-skeleton']}
                style={{
                  overflow: isLoaded ? 'initial' : 'hidden',
                  aspectRatio: isLoaded ? 'auto' : '1/1.4',
                }}
              >
                <PhotoProvider>
                  <PhotoView src={paint?.uri}>
                    <Image
                      shadow="sm"
                      alt="NextUI hero Image"
                      src={paint?.uri}
                      onLoad={() => setIsLoad(true)}
                    />
                  </PhotoView>
                </PhotoProvider>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}

export default Modal
