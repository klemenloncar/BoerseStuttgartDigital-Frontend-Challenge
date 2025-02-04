import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AuthEndpoints, AuthState } from './auth.types'

const getInitialAuthState = (): AuthState => {
  try {
    const token = localStorage.getItem('authToken')

    return { token, isAuthenticated: !!token }
  } catch {
    return { token: null, isAuthenticated: false }
  }
}

const initialState: AuthState = getInitialAuthState()

export const login = createAsyncThunk<string, { email: string; password: string }, { rejectValue: string }>(
  AuthEndpoints.LOGIN,
  async (credentials, { rejectWithValue }) => {
    const { email } = credentials

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!email.includes('simon@bsdigital.com')) {
      return rejectWithValue('Invalid credentials!')
    }

    const fakeToken = `fake-token-${Date.now()}`
    try {
      localStorage.setItem('authToken', fakeToken)
    } catch (error) {
      console.error('Error:', error)
      return rejectWithValue('Failed to save token')
    }
    return fakeToken
  }
)

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  AuthEndpoints.LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('authToken')
    } catch (error) {
      console.error('Error:', error)
      return rejectWithValue('Logout failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true
    })

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = null
      state.isAuthenticated = false
    })
  }
})

export default authSlice.reducer
