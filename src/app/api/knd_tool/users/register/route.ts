import { dataNow, response } from '@/util/backend'
import { tryCatch } from '@/util/universal'
import types from './registerType'
import userTypes from '../userType.d'
import { NextRequest } from 'next/server'
import { kndToolQuery } from '@/util/mysql'

const postFun = async ({ nickname, password }: types.ConfigPostParams) => {
  let sql = 'SELECT * FROM users WHERE nickname = ?'
  const userList = (await kndToolQuery(sql, [
    nickname,
  ])) as Array<userTypes.ConfigUser>
  if (userList.length > 0) throw new Error('用户名重复')
  sql =
    'INSERT INTO users (nickname, password, create_time, update_time) VALUES ?'
  const data = dataNow()
  await kndToolQuery(sql, [[[nickname, password, data, data]]])
  return true
}

export const POST = async (request: NextRequest) => {
  const req = await request.json()
  const { isSuccess, error } = await tryCatch(postFun, req)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, false, error.message)
}
