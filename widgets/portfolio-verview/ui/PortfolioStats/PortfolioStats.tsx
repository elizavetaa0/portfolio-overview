import { useAppSelector } from '@/shared/lib/hooks'
import styles from './PortfolioStats.module.scss'

export function PortfolioStats() {
  const { totalValue, assets } = useAppSelector(state => state.portfolio)
  
  const totalChange = assets.reduce((sum, asset) => {
    return sum + (asset.change24h * (asset.amount * asset.price)) / totalValue
  }, 0)

  return (
    <div className={styles.stats}>
      <h3>Статистика портфеля</h3>
      
      <div className={styles.totalValue}>
        <span>Общая стоимость: </span>
        <span>${totalValue.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</span>
      </div>
      
      <div className={styles.change24h}>
        <span>Изменение за 24ч: </span>
        <span className={totalChange >= 0 ? styles.positive : styles.negative}>
          {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}%
        </span>
      </div>
      
      <div className={styles.assetsCount}>
        <span>Количество активов: </span>
        <span>{assets.length}</span>
      </div>
    </div>
  )
}
