export interface ParamsUser {
  password: string
  username: string
  invite: string
}

export interface CheckUser {
  username?: string
  invite?: string
}

export interface PageInfo {
  page: number
  limit: number
}
