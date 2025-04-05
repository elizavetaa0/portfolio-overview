import { useAppSelector } from '@/shared/lib/hooks';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './AssetList.module.scss';

export function AssetList() {
  const { assets, totalValue } = useAppSelector(state => state.portfolio);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const asset = assets[index];
    const value = asset.amount * asset.price;
    const percentage = (value / totalValue) * 100;

    return (
      <div style={style} className={styles.row}>
        <div className={styles.cell}>{asset.name} ({asset.symbol.toUpperCase()})</div>
        <div className={styles.cell}>{asset.amount.toFixed(4)}</div>
        <div className={styles.cell}>${asset.price.toFixed(2)}</div>
        <div className={styles.cell}>${value.toFixed(2)}</div>
        <div className={`${styles.cell} ${asset.change24h >= 0 ? styles.positive : styles.negative}`}>
          {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
        </div>
        <div className={styles.cell}>{percentage.toFixed(2)}%</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {/* Заголовок таблицы */}
        <div className={styles.headerRow}>
          <div className={styles.headerCell}>Актив</div>
          <div className={styles.headerCell}>Кол-во</div>
          <div className={styles.headerCell}>Цена</div>
          <div className={styles.headerCell}>Стоимость</div>
          <div className={styles.headerCell}>24ч</div>
          <div className={styles.headerCell}>Доля</div>
        </div>
        
        {/* Тело таблицы */}
        {assets.length > 0 ? (
          <div className={styles.tableBody}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  itemCount={assets.length}
                  itemSize={60}
                  width={width}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          </div>
        ) : (
          <div className={styles.emptyMessage}>
            Портфель пуст. Добавьте активы для начала.
          </div>
        )}
      </div>
    </div>
  );
}