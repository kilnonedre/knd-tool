import { toast } from 'sonner'

export const notYetDeveloped = (sentence?: string) =>
  toast.error(sentence ?? '该功能暂未开发')
