import { useAppSelector } from '@/shared/lib/hooks';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styles from './ChartComponent.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend)

export function ChartComponent() {
  const { assets } = useAppSelector(state => state.portfolio)

  const data = {
    labels: assets.map(asset => asset.name),
    datasets: [
      {
        data: assets.map(asset => asset.amount * asset.price),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  }

  return (
    <div className={styles.chartContainer}>
      <h3>Распределение активов</h3>
      <div className={styles.chartWrapper}>
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}
