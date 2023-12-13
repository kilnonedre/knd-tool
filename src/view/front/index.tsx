'use client'

import React, { useState, useEffect } from 'react'
import styles from './frontStyle.module.scss'
import { Input, Button } from '@nextui-org/react'
import { notYetDeveloped } from '@/util/fontend'
import { CheckDatabase, CreateDatabase } from '@/api/universal'
import { Register, Login } from '@/api/kndTool'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Front = () => {
  const [isNeed, setIsNeed] = useState(false)
  const [nickname, setNickname] = useState('')
  const [nicknameErrMsg, setNicknameErrMsg] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErrMsg, setPasswordErrMsg] = useState('')

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
    const response = await CreateDatabase({ database: 'knd_tool' })
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
    const response = await Login(params)
    const { code, data, msg } = await response.json()
    if (code !== 200) return toast.error(msg)
    toast.success('登录成功')
    localStorage.setItem('KND_TOKEN', data)
    goIntroduce()
  }

  const register = async () => {
    if (!check()) return
    const params = { nickname, password }
    const response = await Register(params)
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

  return (
    <div className={styles['login']}>
      <div className={styles['login-panel']}>
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
              <label className={styles['form-tip-checkbox']}>
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => notYetDeveloped()}
                />
                记住账号
              </label>
              <p
                className={styles['form-tip-forget']}
                onClick={() => notYetDeveloped()}
              >
                忘记密码？
              </p>
            </div>
            <div className={styles['form-footer']}>
              {isNeed ? (
                <Button color="danger" size="sm" onPress={createDatabase}>
                  创建数据库
                </Button>
              ) : (
                <>
                  <Button
                    className={styles['form-footer-login']}
                    color="primary"
                    size="sm"
                    onPress={login}
                  >
                    登录
                  </Button>
                  <Button
                    className={styles['form-footer-register']}
                    color="primary"
                    size="sm"
                    variant="bordered"
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
