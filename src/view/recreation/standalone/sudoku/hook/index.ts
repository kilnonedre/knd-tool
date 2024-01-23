import gridTypes from '../component/grid/gridTypes'
import { deepClone } from '@/util/universal'

class SudokuGenerator {
  private sudoku: number[][]
  private solution: number[][]

  constructor() {
    this.sudoku = this.initializeSudoku()
    this.solution = []
  }

  private initializeSudoku(): number[][] {
    return Array.from({ length: 9 }, () => Array(9).fill(0))
  }

  private isSafe(row: number, col: number, num: number): boolean {
    return (
      !this.usedInRow(row, num) &&
      !this.usedInCol(col, num) &&
      !this.usedInBox(row - (row % 3), col - (col % 3), num)
    )
  }

  private usedInRow(row: number, num: number): boolean {
    return this.sudoku[row].includes(num)
  }

  private usedInCol(col: number, num: number): boolean {
    for (let i = 0; i < 9; i++) {
      if (this.sudoku[i][col] === num) {
        return true
      }
    }
    return false
  }

  private usedInBox(startRow: number, startCol: number, num: number): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.sudoku[startRow + i][startCol + j] === num) {
          return true
        }
      }
    }
    return false
  }

  private solve(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.sudoku[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isSafe(row, col, num)) {
              this.sudoku[row][col] = num

              if (this.solve()) {
                return true
              }

              this.sudoku[row][col] = 0 // Backtrack if the current configuration doesn't lead to a solution
            }
          }

          return false // No valid number found for this cell
        }
      }
    }

    return true // Board is filled
  }

  private removeNumbers(count: number): void {
    let cellsToRemove = 81 - count
    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9)
      const col = Math.floor(Math.random() * 9)
      if (this.sudoku[row][col] !== 0) {
        this.sudoku[row][col] = 0
        cellsToRemove--
      }
    }
  }

  public generateSudoku(): gridTypes.ConfigCoordinateObj {
    this.solve() // Generate a solved Sudoku grid
    this.solution = deepClone(this.sudoku)
    this.removeNumbers(80) // Remove numbers to achieve 17 filled cells
    console.log(this.sudoku)
    const coordinateObj = formatSudoku(this.sudoku)
    return coordinateObj
  }

  public generateSolution(): gridTypes.ConfigCoordinateObj {
    const coordinateObj = formatSudoku(this.solution)
    return coordinateObj
  }
}

const formatSudoku = (sudoku: Array<Array<number>>) => {
  const coordinateObj = {} as gridTypes.ConfigCoordinateObj
  sudoku.map((row, rowIndex) => {
    row.map((col, colIndex) => {
      if (col !== 0)
        coordinateObj[`${colIndex},${rowIndex}`] = { number: col, mark: 'base' }
    })
  })
  return coordinateObj
}

// "easy":         62
// "medium":       53
// "hard":         44
// "very-hard":    35
// "insane":       26
// "inhuman":      17

export default SudokuGenerator
