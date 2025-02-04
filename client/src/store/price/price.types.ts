export interface PriceData {
  time: number
  price: number
}

export interface PriceState {
  data: PriceData[]
  loading: boolean
  error: string | null
}
