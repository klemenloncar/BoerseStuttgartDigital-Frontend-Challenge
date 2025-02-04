export enum TransactionType {
  BUY = 'buy',
  SELL = 'sell'
}

export interface Transaction {
  id: string
  asset: string
  type: TransactionType
  quantity: number
  price: number
  timestamp: number
}

export interface PortfolioState {
  holdings: Record<string, number>
  transactions: Transaction[]
}
