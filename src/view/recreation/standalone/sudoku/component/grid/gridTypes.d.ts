export type ConfigMark = 'base' | 'right' | 'error'

export type ConfigCoValueObj = {
  number: number
  mark: ConfigMark
}

export type ConfigCoordinateObj = {
  [key: string]: ConfigCoValueObj
}

export interface ConfigProps {
  borderColor?: string
  slot?: ReactDOM
  gridIndex?: number
  coordinateObj?: ConfigCoordinateObj
  errCoordinateObj?: ConfigCoordinateObj
  onSelect?: Function
  selectGrid?: string | null
  selectNumber?: number | undefined
}
