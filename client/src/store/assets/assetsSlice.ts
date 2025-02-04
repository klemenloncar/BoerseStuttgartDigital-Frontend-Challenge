import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AssetsState, CRYPTOCURRENCY } from './assets.types'

const initialState: AssetsState = {
  assets: [],
  selectedAsset: CRYPTOCURRENCY.BITCOIN,
  loading: false,
  error: null
}

export const fetchAssets = createAsyncThunk('assets/fetchAssets', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://api.coincap.io/v2/assets')

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.data.map((asset: any) => ({
      id: asset.id,
      name: asset.name
    }))
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch assets')
  }
})

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setSelectedAsset: (state, action: PayloadAction<string>) => {
      state.selectedAsset = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false
        state.assets = action.payload
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch assets'
      })
  }
})

export const { setSelectedAsset } = assetsSlice.actions

export default assetsSlice.reducer
