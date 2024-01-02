export const sleep = (second: number) =>
  new Promise(resolve => setTimeout(resolve, second))

export const deepClone = (data: Array<any> | Object) =>
  JSON.parse(JSON.stringify(data))

export const tryCatch = async (fun: Function, ...args: any) => {
  try {
    const result = await fun(...args)
    return { isSuccess: true, data: result }
  } catch (error: any) {
    return { isSuccess: false, error: error }
  }
}

export const asyncHandle = (fun: Function, ...args: any) => {
  return fun(...args)
    .then((result: Response) => [result, null])
    .catch((err: Error) => [null, err])
}

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
