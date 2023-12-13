import { Post } from '@/util/http/request'
import registerTypes from '@/app/api/knd_tool/users/register/registerType.d'
import loginTypes from '@/app/api/knd_tool/users/login/loginType.d'

export const splicePath = (path: string) => '/api/knd_tool' + path

/**用户 */

// 创建用户
export const Register = (params: registerTypes.ConfigPostParams) =>
  Post(splicePath('/users/register'), params)

// 登录
export const Login = (params: loginTypes.ConfigPostParams) =>
  Post(splicePath('/users/login'), params)
