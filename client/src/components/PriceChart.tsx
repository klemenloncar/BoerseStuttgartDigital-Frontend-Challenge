import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts'
import { AppDispatch } from '../store/store'
import { RootState } from '../store'
import { fetchPriceData } from '../store/price/priceSlice'
import { CRYPTOCURRENCY } from '../store/assets/assets.types'

interface PriceChartProps {
  assetId?: string
}

const PriceChart: React.FC<PriceChartProps> = ({ assetId = CRYPTOCURRENCY.BITCOIN }) => {
  const dispatch = useDispatch<AppDispatch>()

  const { data } = useSelector((state: RootState) => state.price)

  useEffect(() => {
    dispatch(fetchPriceData(assetId))
    const interval = setInterval(() => dispatch(fetchPriceData(assetId)), 10000)
    return () => clearInterval(interval)
  }, [dispatch, assetId])

  // TO-DO: Move to separate util
  const formatTime = (time: number) => {
    const date = new Date(time)
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  const tooltipWrapperStyle = {
    backgroundColor: 'var(--bs-white)',
    borderRadius: '5px',
    padding: '5px',
    border: '1px solid var(--bs-gray)'
  }

  return (
    <div className="card mb-4 shadow-sm p-3">
      <div className="card-body">
        <h5 className="card-title text-dark">Price Chart ({assetId.toUpperCase()})</h5>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--bs-gray)" opacity={0.2} />
            <XAxis dataKey="time" tickFormatter={formatTime} tick={{ fill: 'var(--bs-primary)' }} />
            <YAxis domain={['auto', 'auto']} tick={{ fill: 'var(--bs-primary)' }} />

            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--bs-primary)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--bs-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area type="monotone" dataKey="price" stroke="var(--bs-primary)" fill="url(#priceGradient)" />

            <Tooltip
              formatter={(value) => [`${value} €`, 'Price']}
              labelFormatter={(value) => `Time: ${formatTime(value as number)}`}
              wrapperStyle={tooltipWrapperStyle}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--bs-primary)"
              strokeWidth={2.5}
              dot={{ stroke: 'var(--bs-primary)', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PriceChart
