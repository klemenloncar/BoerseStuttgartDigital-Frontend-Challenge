export interface AuthState {
  token: string | null
  isAuthenticated: boolean
}

export enum AuthEndpoints {
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout'
}
