import { response } from '@/util/backend'
import { tryCatch } from '@/util/universal'
import databaseList from '@/config/mysql/index.json'
import { NextRequest } from 'next/server'
import types from './databaseType'
import { kndToolQuery } from '@/util/mysql'

const getFun = async ({ database }: types.ConfigParams) => {
  const sql = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = "${database}"`
  const data = (await kndToolQuery(sql)) as Array<types.ConfigTable>
  const format = data.map(item => item.TABLE_NAME)
  const isSame = databaseList[database].length === format.length
  return isSame
}

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams
  const database = query.get('database')
  const params = { database }
  const { isSuccess, data, error } = await tryCatch(getFun, params)
  if (isSuccess)
    return response(200, 200, data, `${data ? '不' : ''}需要对表进行修改`)
  return response(200, 400, false, error.message)
}

const postFun = async ({ database }: types.ConfigParams) => {
  await Promise.all(
    databaseList[database].map(table => {
      const declare: Array<string> = []
      for (const key in table.data) {
        const isPrimaryKey = key === table.primaryKey
        declare.push(
          `${key} ${table.data[key as keyof typeof table.data]} ${
            isPrimaryKey ? 'PRIMARY KEY AUTO_INCREMENT' : ''
          }`
        )
      }
      const sql = `CREATE TABLE IF NOT EXISTS ${table.name} (${declare.join(
        ','
      )})`
      return kndToolQuery(sql)
    })
  )
  return true
}

export const POST = async (request: NextRequest) => {
  const req = await request.json()
  const { isSuccess, error } = await tryCatch(postFun, req)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, false, error.message)
}

const putFun = async () => {
  throw new Error('暂无待运行脚本')
  return true
}

export const PUT = async () => {
  const { isSuccess, error } = await tryCatch(putFun)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, false, error.message)
}
