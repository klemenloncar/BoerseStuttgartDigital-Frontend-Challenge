import React, { useState, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchPriceData } from '../store/price/priceSlice'
import { buyAsset, sellAsset } from '../store/portfolio/portfolioSlice'
import { TransactionType } from '../store/portfolio/portfolio.types'
import './TradingInterface.css'

const TradingInterface: React.FC = () => {
  const dispatch = useAppDispatch()

  const selectedAsset = useAppSelector((state) => state.assets.selectedAsset) || 'BTC'

  const priceData = useAppSelector((state) => state.price.data)
  const loadingPrice = useAppSelector((state) => state.price.loading)
  const currentPrice = useMemo(() => (priceData.length > 0 ? priceData[priceData.length - 1].price : 0), [priceData])

  const holdings = useAppSelector((state) => state.portfolio.holdings[selectedAsset] || 0)

  const availableEUR = useAppSelector((state) => state.portfolio.holdings['EUR'] || 0)

  const [quantity, setQuantity] = useState<number | string>(0)
  const [activeTab, setActiveTab] = useState<TransactionType>(TransactionType.BUY)

  useEffect(() => {
    dispatch(fetchPriceData(selectedAsset))
  }, [dispatch, selectedAsset])

  const handleTrade = () => {
    if (typeof quantity === 'string' || quantity <= 0) return

    const tradeData = { asset: selectedAsset, quantity, price: currentPrice }
    if (activeTab === TransactionType.BUY && quantity * currentPrice <= availableEUR) {
      dispatch(buyAsset(tradeData))
    } else if (activeTab === TransactionType.SELL && quantity <= holdings) {
      dispatch(sellAsset(tradeData))
    }
    setQuantity(0)
  }

  const insufficientFunds = () => {
    if (typeof quantity === 'string') return

    return activeTab === TransactionType.BUY ? quantity * currentPrice > availableEUR : quantity > holdings
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value === '') {
      setQuantity(e.target.value)
      return
    }

    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setQuantity(numValue)
    }
  }

  return (
    <div className="card p-4 mb-4">
      <h4 className="card-title">Trade {selectedAsset}</h4>

      {loadingPrice ? (
        <p>Loading price...</p>
      ) : (
        <p className="card-text">
          Current Price: <strong>${currentPrice.toFixed(2)}</strong>
        </p>
      )}
      <p className="card-text">
        Holdings:{' '}
        <strong>
          {holdings} {selectedAsset}
        </strong>
      </p>
      <p className="card-text">
        Available Balance: <strong>€{availableEUR.toFixed(2)}</strong>
      </p>

      <ul className="nav nav-tabs">
        {['buy', 'sell'].map((tab) => (
          <li key={tab} className="nav-item">
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab as TransactionType)}
            >
              {capitalize(tab)}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content mt-3">
        <h5>
          {capitalize(activeTab)} {selectedAsset}
        </h5>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
            step="0.01"
          />
        </div>
        <button
          className={`btn w-100 ${activeTab === TransactionType.BUY ? 'bts-success' : 'bts-danger'}`}
          onClick={handleTrade}
          disabled={insufficientFunds()}
        >
          {capitalize(activeTab)} {selectedAsset}
        </button>
        {insufficientFunds() && (
          <p className="text-danger mt-2">
            Not enough {activeTab === TransactionType.BUY ? 'EUR' : selectedAsset} to {activeTab}.
          </p>
        )}
      </div>
    </div>
  )
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export default TradingInterface
