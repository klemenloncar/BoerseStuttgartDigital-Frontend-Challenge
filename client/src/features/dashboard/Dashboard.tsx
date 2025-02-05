import React from 'react'
import PortfolioSummary from '../../components/PortfolioSummary'
import Header from '../../components/Header'
import AssetSelector from '../../components/AssetSelector'
import TradingInterface from '../../components/TradingInterface'

const Dashboard: React.FC = () => {
  return (
    <div className="row flex-grow-1 m-0">
      <Header />
      <div className="card mb-4">
        <div className="card-body">
          <h1>
            Welcome to <strong>Crypto Dashboard</strong>
          </h1>
        </div>
      </div>

      <div className="col-12">
        <AssetSelector />
      </div>
      <div className="col-6 col-sm-12">
        <TradingInterface />
      </div>
      <div className="col-6 col-sm-12">
        <PortfolioSummary />
      </div>
    </div>
  )
}

export default Dashboard
