interface Asset {
  id: string
  name: string
}

export interface AssetsState {
  assets: Asset[]
  selectedAsset: string
  loading: boolean
  error: string | null
}

export enum CRYPTOCURRENCY {
  BITCOIN = 'bitcoin'
}

export const API_URL = 'https://api.coincap.io/v2/assets'
