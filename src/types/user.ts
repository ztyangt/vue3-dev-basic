import type { CommDatum } from './comm'

export namespace UserType {
  // 用户性别枚举
  export enum Gender {
    BOY = 1, // 男
    GIRL = 2, // 女
    UNKNOW = 3, // 保密
  }

  export enum Status {
    NORMAL = 1, // 正常
    BANNED = 2, // 封禁
  }

  export interface Datum extends CommDatum {
    account: string
    nickname: string
    avatar: string
    description?: string
    email: string
    login_at: number
    last_ip: string
    login_count: number
    status: Status
    gender: Gender
    login_ip: string
    password: string
  }

  export type UserInfo = {
    id: number
    nickname: string
    email: string
    avatar: string
    account: string
    description: string
    gender: Gender
  }

  export type UserLoginInfo = {
    token: string
    user: UserInfo
  }

  export type JwtData = {
    exp: number
    iat: number
    iss: string
    sub: string
    data: {
      role: number
      uid: string
    }
  }
}
