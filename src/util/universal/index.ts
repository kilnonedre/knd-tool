export const sleep = (second: number) =>
  new Promise(resolve => setTimeout(resolve, second))

export const deepClone = (data: Array<any> | Object) =>
  JSON.parse(JSON.stringify(data))
