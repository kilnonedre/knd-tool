'use client'

import React, { useEffect, useState } from 'react'
import styles from './gridStyle.module.scss'
import types from './gridTypes'

const Grid = (props: types.ConfigProps) => {
  const gridItemList = [{}, {}, {}, {}, {}, {}, {}, {}, {}]

  const fontColorObj = {
    error: '#e03165',
    right: '#245ccb',
    base: '#3c3c3c',
  }

  const [coordinateObj, setCoordinateObj] = useState<types.ConfigCoordinateObj>(
    {}
  )
  const [selectGrid, setSelectGrid] = useState<string | null>(null)
  const [selectNumber, setSelectNumber] = useState<number | undefined>(
    undefined
  )
  const [errCoordinateObj, setErrCoordinateObj] = useState<
    types.ConfigCoordinateObj | undefined
  >({})

  useEffect(() => {
    props.coordinateObj && setCoordinateObj(props.coordinateObj)
  }, [props.coordinateObj])

  useEffect(() => {
    props.selectGrid && setSelectGrid(props.selectGrid)
  }, [props.selectGrid])

  useEffect(() => {
    setSelectNumber(props.selectNumber)
  }, [props.selectNumber])

  useEffect(() => {
    setErrCoordinateObj(props.errCoordinateObj)
  }, [props.errCoordinateObj])

  const onSelectGrid = (e: any, index: number) => {
    e.stopPropagation()
    const coordinate = toCoordinate(index)
    props.onSelect &&
      props.onSelect(coordinate, coordinateObj[toCoordinate(index)])

    console.log(coordinate)
  }

  const toBinaryArray = (number: number) => [number % 3, Math.floor(number / 3)]

  const toCoordinate = (number: number) =>
    toBinaryArray(number)
      .map(
        (item, index) =>
          item + toBinaryArray(props.gridIndex as number)[index] * 3
      )
      .join(',')

  const isAdjacent = (index: number) => {
    if (!selectGrid) return
    const co = toCoordinate(index)
    const coArray = co.split(',')
    const selectCoArray = selectGrid.split(',')
    if (errCoordinateObj && errCoordinateObj[co])
      return styles['grid-item--error']
    if (selectGrid === co) return styles['grid-item--active']
    if (selectNumber && selectNumber === coordinateObj[co]?.number)
      return styles['grid-item--same']
    if (coArray[0] === selectCoArray[0] || coArray[1] === selectCoArray[1])
      return styles['grid-item--adjacent']
  }

  return (
    <div
      className={styles['grid']}
      style={
        {
          '--grid-border-color': props.borderColor ?? '#000000',
        } as React.CSSProperties
      }
    >
      {gridItemList.map((_, index) => {
        return (
          <div
            key={index}
            className={`${styles['grid-item']} ${isAdjacent(index)}`}
            style={
              {
                '--grid-color':
                  fontColorObj[coordinateObj[toCoordinate(index)]?.mark],
              } as React.CSSProperties
            }
            onClick={e => onSelectGrid(e, index)}
          >
            {React.isValidElement(props.slot)
              ? React.cloneElement(props.slot as React.ReactElement, {
                  gridIndex: index,
                })
              : coordinateObj[toCoordinate(index)]?.number}
          </div>
        )
      })}
    </div>
  )
}

export default Grid
