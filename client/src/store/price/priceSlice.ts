import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { PriceData, PriceState } from './price.types'

const initialState: PriceState = {
  data: [],
  loading: false,
  error: null
}

export const fetchPriceData = createAsyncThunk('price/fetchPriceData', async (assetId: string, { rejectWithValue }) => {
  try {
    const end = Date.now()
    const start = end - 24 * 60 * 60 * 1000
    const url = `https://api.coincap.io/v2/assets/${assetId}/history?interval=m15&start=${start}&end=${end}`

    const response = await fetch(url)

    console.log('response', response)

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    const json = await response.json()

    return json.data.map((d: { time: string; priceUsd: string }) => ({
      time: d.time,
      price: parseFloat(d.priceUsd)
    }))
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('Failed to fetch price data')
  }
})

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPriceData.fulfilled, (state, action: PayloadAction<PriceData[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchPriceData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch price data'
      })
  }
})

export default priceSlice.reducer
