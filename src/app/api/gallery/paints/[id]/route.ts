import { response } from '@/util/backend'
import { kndToolQuery } from '@/util/mysql'
import { tryCatch } from '@/util/universal'
import { NextRequest } from 'next/server'
import types from './fileIdType.d'
import { ConfigGalleryPaint } from '../fileType.d'

const getFun = async ({ id }: types.ConfigParams) => {
  const sql = 'SELECT * FROM gallery_paints WHERE id = ?'
  const data = (await kndToolQuery(sql, [id])) as Array<ConfigGalleryPaint>
  if (data.length === 0) throw new Error('没有查询到相关数据')
  return data[0]
}

export const GET = async (
  _: NextRequest,
  { params }: { params: types.ConfigParams }
) => {
  const { isSuccess, data, error } = await tryCatch(getFun, params)
  if (isSuccess) return response(200, 200, data)
  return response(200, 400, false, error.message)
}
