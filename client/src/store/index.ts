import { combineReducers } from '@reduxjs/toolkit'

import portfolioReducer from './portfolio/portfolioSlice'
import authReducer from './auth/authSlice'
import assetsReducer from './assets/assetsSlice'
import priceReducer from './price/priceSlice'

export const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  auth: authReducer,
  assets: assetsReducer,
  price: priceReducer
})

export type RootState = ReturnType<typeof rootReducer>

import type { Action, ThunkAction } from '@reduxjs/toolkit'
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>
