import { Transaction, TransactionType } from '../store/portfolio/portfolio.types'
import { formatTime } from '../utils/dateUtils'

const getTransactionSign = (type: TransactionType) => (type === TransactionType.BUY ? '+' : '-')
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { type, quantity, asset, price, timestamp } = transaction

  const formattedType = capitalize(type)
  const sign = getTransactionSign(type)
  const formattedQuantity = quantity.toFixed(6)
  const formattedPrice = (quantity * price).toFixed(2)
  const formattedTime = formatTime(timestamp)

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center border-0">
      <span className={`fw-bold ${type === TransactionType.BUY ? 'text-success' : 'text-danger'}`}>
        {formattedType}
      </span>
      <span className="text-dark">
        {sign} {formattedQuantity} {asset.toUpperCase()} / {sign === '+' ? '-' : '+'} {formattedPrice} €
      </span>
      <span className="text-muted">{formattedTime}</span>
    </li>
  )
}

export default TransactionItem
