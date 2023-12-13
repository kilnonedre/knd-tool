import { Get, Post, Put } from '@/util/http/request'
import databaseTypes from '@/app/api/databases/databaseType.d'

export const splicePath = (path: string) => '/api' + path

/**数据库 */

// 检查数据库是否创建
export const CheckDatabase = (params: databaseTypes.ConfigParams) =>
  Get(splicePath('/databases'), params)

// 创建数据库
export const CreateDatabase = (params: databaseTypes.ConfigParams) =>
  Post(splicePath('/databases'), params)

// 运行数据库相关脚本
export const RunScript = () => Put(splicePath('/databases'))
