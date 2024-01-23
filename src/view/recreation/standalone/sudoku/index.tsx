'use client'

import React, { useEffect, useState } from 'react'
import styles from './sudokuStyle.module.scss'
import Icon from '@/component/icon'
import Grid from './component/grid'
import gridTypes from './component/grid/gridTypes'
import SudokuGenerator from './hook'

const Sudoku = () => {
  useEffect(() => {
    const sudokuGenerator = new SudokuGenerator()
    const sudokuBoard = sudokuGenerator.generateSudoku()
    console.log(sudokuBoard, sudokuGenerator.generateSolution())
    setCoordinateObj(sudokuBoard)
  }, [])

  const numberList = [
    { number: 1, total: 5 },
    { number: 2, total: 5 },
    { number: 3, total: 5 },
    { number: 4, total: 5 },
    { number: 5, total: 5 },
    { number: 6, total: 5 },
    { number: 7, total: 5 },
    { number: 8, total: 5 },
    { number: 9, total: 5 },
  ]

  const [coordinateObj, setCoordinateObj] =
    useState<gridTypes.ConfigCoordinateObj>({
      '0,0': { number: 5, mark: 'base' },
    })
  const [selectGrid, setSelectGrid] = useState<string | null>(null)
  const [selectNumber, setSelectNumber] = useState<number | undefined>(
    undefined
  )
  const [error, setError] = useState<number>(0)
  const [errCoordinateObj, setErrCoordinateObj] =
    useState<gridTypes.ConfigCoordinateObj>({})

  const putNumber = (number: number) => {
    if (!selectGrid) return
    if (coordinateObj[selectGrid]?.mark === 'base') return
    const errorList = getErrorList(number)
    setErrCoordinateObj(Object.fromEntries(errorList))
    let mark: gridTypes.ConfigMark = 'right'
    if (errorList.length > 0) {
      setError(error + 1)
      mark = 'error'
    }
    setCoordinateObj(prevState => {
      return {
        ...prevState,
        [selectGrid]: { number, mark },
      }
    })
    setSelectNumber(number)
  }

  const getErrorList = (number: number, grid?: string) => {
    const filterList = Object.entries(coordinateObj).filter(([key, value]) => {
      const co = key.split(',')
      const coSelect = (grid ?? (selectGrid as string)).split(',')
      if (co[0] === coSelect[0] && co[1] === coSelect[1]) return false
      if (
        (co[0] === coSelect[0] || co[1] === coSelect[1]) &&
        value.number === number
      )
        return true
      if (
        Math.floor(Number(co[0]) / 3) === Math.floor(Number(coSelect[0]) / 3) &&
        Math.floor(Number(co[1]) / 3) === Math.floor(Number(coSelect[1]) / 3) &&
        value.number === number
      )
        return true
    })
    return filterList
  }

  const deleteNumber = () => {
    if (!selectGrid) return
    if (coordinateObj[selectGrid]?.mark === 'base') return
    setCoordinateObj(prevState => {
      const newState = { ...prevState }
      delete newState[selectGrid]
      return newState
    })
    setSelectNumber(undefined)
    setErrCoordinateObj({})
  }

  const funList = [
    { icon: '', label: '撤回' },
    { icon: '', label: '删除', fun: deleteNumber },
    { icon: '', label: '自动笔' },
    { icon: '', label: '铅笔' },
    { icon: '', label: '提示' },
  ]

  const onSelect = (key: string, value: gridTypes.ConfigCoValueObj) => {
    setSelectNumber(value?.number)
    setSelectGrid(key)
    if (!value) return setErrCoordinateObj({})
    const errorList = getErrorList(value.number, key)
    setErrCoordinateObj(Object.fromEntries(errorList))
  }

  return (
    <div className={styles['sudoku']}>
      <div></div>
      <div className={styles['sudoku-misc']}>
        <div className={styles['sudoku-misc-error']}>错误：{error}</div>
        <div className={styles['sudoku-misc-level']}>等级：17数</div>
        <div className={styles['sudoku-misc-time']}>时间：40:05</div>
      </div>
      <div className={styles['sudoku-grid']}>
        <Grid
          slot={
            <Grid
              borderColor="#d2d2d2"
              coordinateObj={coordinateObj}
              selectGrid={selectGrid}
              selectNumber={selectNumber}
              errCoordinateObj={errCoordinateObj}
              onSelect={onSelect}
            />
          }
        />
      </div>
      <div className={styles['sudoku-fun']}>
        {funList.map(fun => {
          return (
            <div className={styles['fun']} key={fun.icon} onClick={fun.fun}>
              <Icon font={fun.icon} size="2rem" />
              <p className={styles['fun-label']}>{fun.label}</p>
            </div>
          )
        })}
      </div>
      <div className={styles['sudoku-statistic']}>
        {numberList.map(number => {
          return (
            <div
              className={styles['statistic']}
              key={number.number}
              onClick={() => putNumber(number.number)}
            >
              <div className={styles['statistic-number']}>{number.number}</div>
              <div className={styles['statistic-total']}>{number.total}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sudoku
