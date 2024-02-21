import { response, formatFormData, dataNow } from '@/util/backend'
import { tryCatch } from '@/util/universal'
import types from './fileType.d'
import { NextRequest } from 'next/server'
import { kndToolQuery } from '@/util/mysql'
import { join, extname, basename } from 'path'
import { writeFile } from 'fs/promises'
import { FILE_PATH_ALL } from '@/config/env'
import sharp from 'sharp'

const compressAndSaveImage = async (
  params: types.ConfigCompressAndSaveImage
) => {
  const { inputBuffer, outputPath, targetWidth } = params
  const compressedImageBuffer = await sharp(inputBuffer)
    .resize({ fit: 'inside', width: targetWidth })
    .toBuffer()
  const image = sharp(compressedImageBuffer)
  const metadata = await image.metadata()
  const { width, height } = metadata
  await sharp(compressedImageBuffer).toFile(outputPath)
  return { targetWidth: width, targetHeight: height }
}

const renameFileWithSuffix = (filePath: string, newSuffix: string): string => {
  const ext = extname(filePath)
  const baseName = basename(filePath, ext)
  const newPath = join(baseName + newSuffix + ext)
  return newPath
}

const postFun = async (request: NextRequest) => {
  const formData = await request.formData()
  const keyList = ['file']
  const { file } = formatFormData(keyList, formData)
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filePath = join(FILE_PATH_ALL, 'gallery', 'image', file.name)
  await writeFile(filePath, buffer)
  const { width, height } = await sharp(buffer).metadata()
  const thumbnailPath = join(
    FILE_PATH_ALL,
    'gallery',
    'image',
    renameFileWithSuffix(file.name, '_thumbnail')
  )
  const params = {
    inputBuffer: buffer,
    outputPath: thumbnailPath,
    targetWidth: 800,
  }
  const { targetWidth, targetHeight } = await compressAndSaveImage(params)
  const sql =
    'INSERT INTO gallery_paints (uri, width, height, thumbnail, thumbnail_width, thumbnail_height, create_time, update_time) VALUES ?'
  const data = dataNow()
  await kndToolQuery(sql, [
    [
      [
        filePath.replace(FILE_PATH_ALL, ''),
        width,
        height,
        thumbnailPath.replace(FILE_PATH_ALL, ''),
        targetWidth,
        targetHeight,
        data,
        data,
      ],
    ],
  ])
  return file
}

export const POST = async (request: NextRequest) => {
  const { isSuccess, data, error } = await tryCatch(postFun, request)
  if (isSuccess) return response(200, 200, data)
  return response(200, 400, false, error.message)
}

const getFun = async () => {
  const sql = 'SELECT * FROM gallery_paints'
  const data = await kndToolQuery(sql)
  return data
}

export const GET = async () => {
  const { isSuccess, data, error } = await tryCatch(getFun)
  if (isSuccess) return response(200, 200, data)
  return response(200, 400, false, error.message)
}
