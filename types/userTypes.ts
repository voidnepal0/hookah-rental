export interface User {

  id: string

  email: string

  password?: string // Only in login/register responses

  name: string

  role: "CUSTOMER" | "ADMIN" | "VENDOR" | string

  isActive: boolean

  createdAt: string

  updatedAt: string

  isVerified: boolean

  gender: "MALE" | "FEMALE" | "OTHER" | null

  phone?: string

  address?: string

}



export interface LoginResponse {

  user: User

  access_token: string

  refresh_token?: string

}



export interface RegisterResponse {

  user: User

  access_token: string

  refresh_token?: string

}



export interface UpdateUserRequest {

  name?: string

  phone?: string

  address?: string

  gender?: "MALE" | "FEMALE" | "OTHER" | null

}



export interface UserApiResponse {

  id: string

  email: string

  name: string

  role: string

  isActive: boolean

  createdAt: string

  updatedAt: string

  isVerified: boolean

  gender: string | null

  phone?: string

  address?: string

}

