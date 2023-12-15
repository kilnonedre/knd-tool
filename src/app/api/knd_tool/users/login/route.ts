import { response } from '@/util/backend'
import { tryCatch } from '@/util/universal'
import types from './loginType.d'
import userTypes from '../userType.d'
import { NextRequest } from 'next/server'
import { kndToolQuery } from '@/util/mysql'
import { createToken } from '@/util/backend/token'

const postFun = async ({ nickname, password }: types.ConfigPostParams) => {
  const sql = 'SELECT * FROM users WHERE nickname = ?'
  const userList = (await kndToolQuery(sql, [
    nickname,
  ])) as Array<userTypes.ConfigUser>
  if (userList.length === 0) throw new Error('用户不存在')
  else if (userList[0].password !== password) throw new Error('密码错误')
  const token = await createToken({ nickname, user_id: userList[0].id })
  return token
}

export const POST = async (request: NextRequest) => {
  const req = await request.json()
  const { isSuccess, data, error } = await tryCatch(postFun, req)
  if (isSuccess) return response(200, 200, data)
  return response(200, 400, false, error.message)
}
