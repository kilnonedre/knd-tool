'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './waterfallStyle.module.scss'
import types from './waterfallType.d'
import { Image } from '@nextui-org/react'
import { GetFile } from '@/api/gallery'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import fileTypes from '@/app/api/gallery/paints/fileType.d'

const Waterfall = (props: types.ConfigProps) => {
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const [waterfallList, setWaterfallList] = useState<
    Array<Array<types.ConfigImage>>
  >([])
  const [columnWidth, setColumnWidth] = useState<number>(0)
  const [imageList, setImageList] = useState<Array<types.ConfigImage>>([])
  const [imageGetParams, setImageGetParams] =
    useState<fileTypes.ConfigGetParams>({
      page: 1,
      size: 10,
    })
  const [loadImage, setLoadImage] = useState<boolean>(true)

  const router = useRouter()

  useEffect(() => {
    renderImageList()
    const gridContainer = gridContainerRef.current
    if (!gridContainer) return
    const handleResize = () => {
      getColumnCount()
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    const footer = document.getElementById('galleryFooter')
    const intersectionObserver = new IntersectionObserver(entries => {
      const isInView = entries.some(entry => entry.isIntersecting)
      isInView &&
        setImageGetParams(prevParams => ({
          ...prevParams,
          page: prevParams.page + 1,
        }))
    })
    footer && intersectionObserver.observe(footer)
    return () => {
      window.removeEventListener('resize', handleResize)
      footer && intersectionObserver.unobserve(footer)
    }
  }, [])

  useEffect(() => {
    loadImage && renderImageList()
  }, [imageGetParams.page])

  const renderImageList = async () => {
    const response = await GetFile(imageGetParams)
    const { code, data, msg } = await response.json()
    if (code !== 200) return toast.error(msg)
    if (data.length === 0) {
      setImageGetParams(prevParams => ({
        ...prevParams,
        page: imageGetParams.page,
      }))
      setLoadImage(false)
      return
    }
    setLoadImage(true)
    const imgList = data.map((item: types.ConfigImage) => {
      return {
        id: item.id,
        uri: item.uri,
        height: item.height,
        width: item.width,
        thumbnail: item.thumbnail,
        thumbnail_width: item.thumbnail_width,
        thumbnail_height: item.thumbnail_height,
      }
    })
    setImageList(prevParams =>
      imageGetParams.page >= 2 ? [...prevParams, ...imgList] : imgList
    )
    console.log('setIsInfiniteLoad', imageGetParams.page)
  }

  const getColumnCount = async () => {
    const gridContainer = gridContainerRef.current

    if (!gridContainer) return null

    const computedStyle = window.getComputedStyle(gridContainer)
    const gridColumnWidth = parseFloat(
      computedStyle.gridTemplateColumns.split(' ')[0]
    )
    const columnCount = Math.floor(gridContainer.clientWidth / gridColumnWidth)
    setWaterfallList(Array.from({ length: columnCount }, () => []))
    setColumnWidth(gridColumnWidth)
  }

  useEffect(() => {
    waterfallLayout()
  }, [columnWidth, imageList])

  useEffect(() => {
    // renderImageList()
  }, [props.reload])

  const waterfallLayout = () => {
    if (!columnWidth || waterfallList.length === 0) return
    const heightList: Array<number> = Array.from(
      { length: waterfallList.length },
      () => 0
    )
    const imgList: Array<Array<types.ConfigImage>> = Array.from(
      { length: waterfallList.length },
      () => []
    )
    imageList.map(image => {
      const { index } = getMin(heightList)
      imgList[index].push(image)
      heightList[index] =
        heightList[index] +
        (image.thumbnail_height * columnWidth) / image.thumbnail_width
    })
    setWaterfallList(imgList)
  }

  const getMin = (list: Array<number>) => {
    const { minValue, minIndex } = list.reduce(
      (acc, current, index) => {
        if (current < acc.minValue)
          return { minValue: current, minIndex: index }
        else return acc
      },
      { minValue: Infinity, minIndex: -1 }
    )
    return { value: minValue, index: minIndex }
  }

  return (
    <div ref={gridContainerRef} className={styles['waterfall']}>
      {waterfallList.map((waterfall, index) => {
        return (
          <div className={styles['waterfall-column']} key={index}>
            {waterfall.map(water => {
              return (
                <Image
                  className={styles['waterfall-column-cell']}
                  shadow="sm"
                  isZoomed
                  src={water.thumbnail}
                  key={water.id}
                  loading="lazy"
                  alt="demo"
                  onClick={() => {
                    router.push(`/gallery/paint/${water.id}`)
                  }}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Waterfall
