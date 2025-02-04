import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { API_URL, AssetsState, CRYPTOCURRENCY } from './assets.types'

const initialState: AssetsState = {
  assets: [],
  selectedAsset: CRYPTOCURRENCY.BITCOIN,
  loading: false,
  error: null
}

export const fetchAssets = createAsyncThunk('assets/fetchAssets', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.data.map((asset: { id: string; name: string }) => ({
      id: asset.id,
      name: asset.name
    }))
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('Failed to fetch assets')
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
