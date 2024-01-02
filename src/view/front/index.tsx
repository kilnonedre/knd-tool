'use client'

import React, { useState, useEffect } from 'react'
import styles from './frontStyle.module.scss'
import { Input, Button } from '@nextui-org/react'
import { notYetDeveloped } from '@/util/fontend'
import { CheckDatabase, CreateDatabase } from '@/api/universal'
import { Register, Login } from '@/api/kndTool'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { asyncHandle, getRandomInt } from '@/util/universal'
import Checkbox from '@/component/checkbox'

const bkList = [
  {
    mark: 'fir',
    styles: {
      '--front-background-image': `url('/image/login/login-fir.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-fir-clip.jpg')`,
      '--front-color': '#000000',
    },
  },
  {
    mark: 'sec',
    styles: {
      '--front-background-image': `url('/image/login/login-sec.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-sec-clip.jpg')`,
      '--front-color': '#573C8F',
    },
  },
  {
    mark: 'thi',
    styles: {
      '--front-background-image': `url('/image/login/login-thi.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-thi-clip.jpg')`,
      '--front-color': '#361c31',
    },
  },
  {
    mark: 'fou',
    styles: {
      '--front-background-image': `url('/image/login/login-fou.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-fou-clip.jpg')`,
      '--front-color': '#d9badc',
    },
  },
  {
    mark: 'fif',
    styles: {
      '--front-background-image': `url('/image/login/login-fif.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-fif-clip.jpg')`,
      '--front-color': '#b8b6c3',
    },
  },
]

const Front = () => {
  const [isNeed, setIsNeed] = useState(false)
  const [nickname, setNickname] = useState('')
  const [nicknameErrMsg, setNicknameErrMsg] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErrMsg, setPasswordErrMsg] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [theme, setTheme] = useState({
    mark: 'fir',
    styles: {
      '--front-background-image': `url('/image/login/login-fir.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-fir-clip.jpg')`,
      '--front-color': '#000000',
    },
  })

  const router = useRouter()

  useEffect(() => {
    checkDatabase()
  }, [])

  const checkDatabase = async () => {
    const response = await CheckDatabase({ database: 'knd_tool' })
    const { code, data, msg } = await response.json()
    if (code !== 200) return toast.error(msg)
    setIsNeed(!data)
  }

  const createDatabase = async () => {
    setCreateLoading(true)
    const [response, err] = await asyncHandle(CreateDatabase, {
      database: 'knd_tool',
    })
    setCreateLoading(false)
    if (err) return
    const { code, msg } = await response.json()
    if (code !== 200) return toast.error(msg)
    toast.success('数据库创建成功')
    setIsNeed(false)
  }

  const check = () => {
    if (!nickname.trim()) {
      setNicknameErrMsg('请输入符合规范的昵称')
      return false
    }
    if (!password.trim()) {
      setPasswordErrMsg('请输入符合规范的密码')
      return false
    }
    return true
  }

  const goIntroduce = () => {
    router.push('/introduce')
  }

  const login = async () => {
    if (!check()) return
    const params = { nickname, password }
    setLoginLoading(true)
    const [response, err] = await asyncHandle(Login, params)
    setLoginLoading(false)
    if (err) return
    const { code, data, msg } = await response.json()
    if (code !== 200) return toast.error(msg)
    toast.success('登录成功')
    localStorage.setItem('KND_TOKEN', data)
    goIntroduce()
  }

  const register = async () => {
    if (!check()) return
    const params = { nickname, password }
    setRegisterLoading(true)
    const [response, err] = await asyncHandle(Register, params)
    setRegisterLoading(false)
    if (err) return
    const { code, msg } = await response.json()
    if (code !== 200) return toast.error(msg)
    toast.success('注册成功')
    login()
  }

  const changeNickname = (e: string) => {
    nicknameErrMsg && setNicknameErrMsg('')
    setNickname(e)
  }

  const changePassword = (e: string) => {
    passwordErrMsg && setPasswordErrMsg('')
    setPassword(e)
  }

  const changeTheme = () => {
    const bkListFilter = bkList.filter(bk => bk.mark !== theme.mark)
    const index = getRandomInt(0, bkListFilter.length - 1)
    setTheme(bkListFilter[index])
  }

  return (
    <div
      className={styles['login']}
      style={theme.styles as React.CSSProperties}
    >
      <div className={styles['login-panel']}>
        <div className={styles['login-panel-bk']}></div>
        <div className={styles['login-panel-main']}>
          <div className={styles['form']}>
            <div className={styles['form-header']}>Welcome To Yume</div>
            <div className={styles['form-body']}>
              <Input
                className={styles['form-body-input']}
                type="text"
                size="sm"
                radius="md"
                placeholder="请输入昵称"
                isClearable
                isInvalid={!!nicknameErrMsg}
                errorMessage={nicknameErrMsg}
                value={nickname}
                onValueChange={changeNickname}
              />
              <Input
                className={styles['form-body-input']}
                type="password"
                size="sm"
                radius="md"
                placeholder="请输入密码"
                isClearable
                isInvalid={!!passwordErrMsg}
                errorMessage={passwordErrMsg}
                value={password}
                onValueChange={changePassword}
              />
            </div>
            <div className={styles['form-tip']}>
              <Checkbox
                text="记住账号"
                color={theme.styles['--front-color']}
                onChange={() => {
                  notYetDeveloped()
                }}
              />
              <p className={styles['form-tip-forget']} onClick={changeTheme}>
                忘记密码？
              </p>
            </div>
            <div className={styles['form-footer']}>
              {isNeed ? (
                <Button
                  color="danger"
                  size="sm"
                  isLoading={createLoading}
                  onPress={createDatabase}
                >
                  创建数据库
                </Button>
              ) : (
                <>
                  <Button
                    className={styles['form-footer-login']}
                    color="primary"
                    size="sm"
                    isLoading={loginLoading}
                    onPress={login}
                  >
                    登录
                  </Button>
                  <Button
                    className={styles['form-footer-register']}
                    color="primary"
                    size="sm"
                    variant="bordered"
                    isLoading={registerLoading}
                    onPress={register}
                  >
                    注册
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Front
