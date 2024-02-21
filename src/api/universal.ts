import { Get, Post, Put } from '@/util/http/request'

export const splicePath = (path: string) => '/api' + path

/**数据库 */

// 检查数据库是否创建
export const CheckDatabase = () => Get(splicePath('/databases'))

// 创建数据库
export const CreateDatabase = () => Post(splicePath('/databases'))

// 运行数据库相关脚本
export const RunScript = () => Put(splicePath('/databases'))
