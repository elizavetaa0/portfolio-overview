import { useAppDispatch } from '@/shared/lib/hooks';
import { removeAsset } from '../../model/slice';
import { Asset } from '../../model/type';
import styles from './AssetRow.module.scss';

interface IAssetRowProps {
  asset: Asset;
  totalValue: number;
}

export function AssetRow({ asset, totalValue }: IAssetRowProps) {
  const dispatch = useAppDispatch();
  const value = asset.amount * asset.price;
  const percentage = (value / totalValue) * 100;

  return (
    <div 
      className={styles.row}
      onClick={() => dispatch(removeAsset(asset.id))}
    >
      <div className={styles.name}>
        {asset.name} ({asset.symbol.toUpperCase()})
      </div>
      <div>{asset.amount.toFixed(4)}</div>
      <div>${asset.price.toFixed(2)}</div>
      <div>${value.toFixed(2)}</div>
      <div className={asset.change24h >= 0 ? styles.up : styles.down}>
        {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
      </div>
      <div>{percentage.toFixed(2)}%</div>
    </div>
  )
}