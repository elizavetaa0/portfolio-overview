import { portfolioReducer } from '@/widgets/portfolio-verview/model/slice';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
