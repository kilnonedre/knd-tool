import { Get, Post } from '@/util/http/request'
import fileTypes from '@/app/api/gallery/paints/fileType.d'
import fileIdTypes from '@/app/api/gallery/paints/[id]/fileIdType.d'

export const splicePath = (path: string) => '/api/gallery' + path

// 上传图片
export const UploadFile = (params: fileTypes.ConfigPostParams) =>
  Post(splicePath('/paints'), params)

// 获取图片信息
export const GetFile = (params: fileTypes.ConfigGetParams) =>
  Get(splicePath('/paints'), params)

// 根据id获取图片信息
export const GetFileById = (params: fileIdTypes.ConfigParams) =>
  Get(splicePath(`/paints/${params.id}`))
