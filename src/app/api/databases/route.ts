import { response } from '@/util/backend'
import { tryCatch } from '@/util/universal'
import databaseList from '@/config/mysql/index.json'
import types from './databaseType'
import { kndToolQuery } from '@/util/mysql'

const getFun = async () => {
  const sql = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = "knd_tool"`
  const data = (await kndToolQuery(sql)) as Array<types.ConfigTable>
  const format = data.map(item => item.TABLE_NAME)
  const isSame = databaseList.length === format.length
  return isSame
}

export const GET = async () => {
  const { isSuccess, data, error } = await tryCatch(getFun)
  if (isSuccess)
    return response(200, 200, data, `${data ? '不' : ''}需要对表进行修改`)
  return response(200, 400, false, error.message)
}

const postFun = async () => {
  await Promise.all(
    databaseList.map(table => {
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

export const POST = async () => {
  const { isSuccess, error } = await tryCatch(postFun)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, false, error.message)
}

const putFun = async () => {
  throw new Error('暂无待运行脚本')
}

export const PUT = async () => {
  const { isSuccess, error } = await tryCatch(putFun)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, false, error.message)
}
