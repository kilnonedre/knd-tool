export type ConfigPostParams = FormData

export interface ConfigCompressAndSaveImage {
  inputBuffer: Uint8Array
  outputPath: string
  targetWidth: number
}

export interface ConfigGalleryPaint {
  id: number
  uri: string
  width: number
  height: number
  thumbnail: string
  thumbnail_width: number
  thumbnail_height: number
  create_time: number
  update_time: number
}
