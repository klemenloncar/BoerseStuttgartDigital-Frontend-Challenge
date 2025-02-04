import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select, { SingleValue } from 'react-select'
import PriceChart from './PriceChart'
import { fetchAssets, setSelectedAsset } from '../store/assets/assetsSlice'
import { AppDispatch } from '../store/store'
import { RootState } from '../store'
import { CRYPTOCURRENCY } from '../store/assets/assets.types'

type AssetOption = {
  value: string
  label: string
}

const AssetSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { assets, selectedAsset } = useSelector((state: RootState) => state.assets)

  useEffect(() => {
    dispatch(fetchAssets())
  }, [dispatch])

  useEffect(() => {
    if (!selectedAsset && assets.length > 0) {
      const defaultAsset = assets.find((asset) => asset.id === CRYPTOCURRENCY.BITCOIN)
      if (defaultAsset) {
        dispatch(setSelectedAsset(defaultAsset.id))
      }
    }
  }, [dispatch, selectedAsset, assets])

  const handleSelectChange = (newValue: SingleValue<AssetOption>) => {
    if (newValue) {
      dispatch(setSelectedAsset(newValue.value))
    }
  }

  const options: AssetOption[] = assets.map((asset) => ({
    value: asset.id,
    label: asset.name || 'Unknown'
  }))

  return (
    <div className="my-4">
      <Select
        className="basic-single mb-4"
        classNamePrefix="select"
        options={options}
        value={options.find((option) => option.value === selectedAsset) || null}
        onChange={handleSelectChange}
        placeholder="Search and select an asset..."
        isSearchable
      />

      {selectedAsset && <PriceChart assetId={selectedAsset} />}
    </div>
  )
}

export default AssetSelector
