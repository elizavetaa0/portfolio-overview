import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Asset, PortfolioState } from './type';
import { loadFromLocalStorage, saveToLocalStorage } from '@/shared/lib/storage';


const initialState: PortfolioState = {
  assets: loadFromLocalStorage('portfolioAssets') || [],
  availableAssets: [
    { symbol: 'btcusdt', name: 'Bitcoin', currentPrice: 0, change24h: 0 },
    { symbol: 'ethusdt', name: 'Ethereum', currentPrice: 0, change24h: 0 },
    { symbol: 'bnbusdt', name: 'BNB', currentPrice: 0, change24h: 0 },
    { symbol: 'solusdt', name: 'Solana', currentPrice: 0, change24h: 0 },
    { symbol: 'xrpusdt', name: 'XRP', currentPrice: 0, change24h: 0 },
  ],
  totalValue: 0,
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Omit<Asset, 'id'>>) => {
      const newAsset = {
        ...action.payload,
        id: uuidv4(),
      };
      state.assets.push(newAsset);
      saveToLocalStorage('portfolioAssets', state.assets);
      state.totalValue = calculateTotalValue(state.assets);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter(asset => asset.id !== action.payload);
      saveToLocalStorage('portfolioAssets', state.assets);
      state.totalValue = calculateTotalValue(state.assets);
    },
    updateAssetPrices: (state, action: PayloadAction<{symbol: string; price: number; change24h: number}[]>) => {
      state.availableAssets = state.availableAssets.map(asset => {
        const updatedAsset = action.payload.find(a => a.symbol === asset.symbol.toLowerCase());
        if (updatedAsset) {
          return {
            ...asset,
            currentPrice: updatedAsset.price,
            change24h: updatedAsset.change24h,
          };
        }
        return asset;
      });

      state.assets = state.assets.map(asset => {
        const updatedAsset = action.payload.find(a => a.symbol === asset.symbol.toLowerCase());
        if (updatedAsset) {
          return {
            ...asset,
            price: updatedAsset.price,
            change24h: updatedAsset.change24h,
          };
        }
        return asset;
      });

      state.totalValue = calculateTotalValue(state.assets);
    },
  },
});

function calculateTotalValue(assets: Asset[]): number {
  return assets.reduce((total, asset) => total + (asset.amount * asset.price), 0);
}

export const { addAsset, removeAsset, updateAssetPrices } = portfolioSlice.actions;
export const portfolioReducer = portfolioSlice.reducer;
