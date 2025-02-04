import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PortfolioState, TransactionType } from './portfolio.types'

const initialState: PortfolioState = {
  holdings: { bitcoin: 1.12345678, EUR: 1234 },
  transactions: []
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    buyAsset: (state, action: PayloadAction<{ asset: string; quantity: number; price: number }>) => {
      const { asset, quantity, price } = action.payload
      const totalCost = quantity * price

      if (state.holdings['EUR'] >= totalCost) {
        state.holdings[asset] = (state.holdings[asset] || 0) + quantity
        state.holdings['EUR'] -= totalCost

        state.transactions.push({
          id: new Date().toISOString(),
          asset,
          type: TransactionType.BUY,
          quantity,
          price,
          timestamp: Date.now()
        })
      }
    },
    sellAsset: (state, action: PayloadAction<{ asset: string; quantity: number; price: number }>) => {
      const { asset, quantity, price } = action.payload
      const currentQty = state.holdings[asset] || 0

      if (currentQty >= quantity) {
        state.holdings[asset] = currentQty - quantity
        state.holdings['EUR'] += quantity * price

        state.transactions.push({
          id: new Date().toISOString(),
          asset,
          type: TransactionType.SELL,
          quantity,
          price,
          timestamp: Date.now()
        })
      }
    }
  }
})

export const { buyAsset, sellAsset } = portfolioSlice.actions
export default portfolioSlice.reducer
