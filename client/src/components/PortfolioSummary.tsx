import React from 'react'
import { useAppSelector } from '../store/hooks'
import TransactionItem from './TransactionItem'

const PortfolioSummary: React.FC = () => {
  const { transactions } = useAppSelector((state) => state.portfolio)

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div className="card mb-4 shadow-sm p-3 portfolio-summary">
      <div className="card-body">
        <h5 className="card-title text-dark fw-bold mb-3">Portfolio Summary</h5>

        <div>
          <h6 className="mb-3 text-secondary">Recent Transactions</h6>
          {sortedTransactions.length > 0 ? (
            <ul className="list-group list-group-flush">
              {sortedTransactions.map((tx) => (
                <TransactionItem key={tx.id} transaction={tx} />
              ))}
            </ul>
          ) : (
            <p className="text-muted text-center">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PortfolioSummary
