export interface Asset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  price: number;
  change24h: number;
}

export interface AvailableAsset {
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number;
}

export interface PortfolioState {
  assets: Asset[];
  availableAssets: AvailableAsset[];
  totalValue: number;
  loading: boolean;
  error: string | null;
}
