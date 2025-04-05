import styles from './styles.module.scss';
import { AssetList } from './ui/AssetList/AssetList';
import { useWebSocket } from './lib/useWebSocket';
import { AssetForm } from './ui/AssetForm/AssetForm'
import { PortfolioStats } from './ui/PortfolioStats/PortfolioStats';
import { ChartComponent } from './ui/ChartComponent/ChartComponent';

export function PortfolioOverview() {
  useWebSocket();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Обзор портфеля</h1>
      <div className={styles.grid}>
        <div className={styles.stats}>
          <PortfolioStats />
        </div>
        
        <div className={styles.chart}>
          <ChartComponent />
        </div>
        
        <div className={styles.assets}>
          <AssetList />
        </div>
        
        <div className={styles.form}>
          <AssetForm />
        </div>
      </div>
    </div>
  )
}
