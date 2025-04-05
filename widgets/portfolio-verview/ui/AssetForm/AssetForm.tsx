import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { addAsset } from '../../model/slice'
import styles from './AssetForm.module.scss'

export function AssetForm() {
  const dispatch = useAppDispatch()
  const { availableAssets } = useAppSelector(state => state.portfolio)
  const [selectedAsset, setSelectedAsset] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedAsset || !amount) return
    
    const asset = availableAssets.find(a => a.symbol === selectedAsset)
    if (!asset) return
    
    dispatch(addAsset({
      symbol: asset.symbol,
      name: asset.name,
      amount: parseFloat(amount),
      price: asset.currentPrice,
      change24h: asset.change24h,
    }))
    
    setAmount('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Добавить актив</h3>
      
      <div className={styles.formGroup}>
        <label>Актив:</label>
        <select
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
          required
        >
          <option value="">Выберите актив</option>
          {availableAssets.map(asset => (
            <option key={asset.symbol} value={asset.symbol}>
              {asset.name} ({asset.symbol.toUpperCase()})
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label>Количество:</label>
        <input
          type="number"
          step="any"
          min="0.0001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" className={styles.submitButton}>
        Добавить
      </button>
    </form>
  )
}