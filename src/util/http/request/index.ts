const isFormData = (object: object | undefined) => {
  if (Object.prototype.toString.call(object) !== '[object FormData]')
    return false
  return true
}

const getToken = () => {
  const token = localStorage.getItem('KND_TOKEN')
  if (token) return { headers: { Authorization: `Bearer ${token}` } }
  return {}
}

import { fetchWithInterceptor } from '../middleware'

export const Get = (url: string, params?: object, config?: object) => {
  let suffix = ''
  if (params) {
    const values = Object.values(params)
    Object.keys(params).forEach((key, index) => {
      suffix = `${suffix}&${key}=${values[index]}`
    })
    suffix = `?${suffix.slice(1)}`
  }
  return fetchWithInterceptor(`${url}${suffix}`, {
    method: 'GET',
    ...getToken(),
    ...config,
  })
}

export const Post = (url: string, params?: object, config?: object) => {
  const body = (isFormData(params) ? params : JSON.stringify(params)) as
    | FormData
    | string
  return fetchWithInterceptor(url, {
    method: 'POST',
    body,
    ...getToken(),
    ...config,
  })
}

export const Put = (url: string, params?: object, config?: object) => {
  const body = (isFormData(params) ? params : JSON.stringify(params)) as
    | FormData
    | string
  return fetchWithInterceptor(url, {
    method: 'PUT',
    body,
    ...getToken(),
    ...config,
  })
}

export const Delete = (url: string, params?: object, config?: object) => {
  return fetchWithInterceptor(url, {
    method: 'DELETE',
    body: JSON.stringify(params),
    ...getToken(),
    ...config,
  })
}

export const joinPath = (url: string, route?: string | number) => {
  const path = `/${route}` ?? ''
  return `${url}${path}`
}
