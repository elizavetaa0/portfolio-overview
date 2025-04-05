import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from './store';

interface IWithProvidresStore {
  children: ReactNode;
}

export function WithProviders({ children }: IWithProvidresStore) {
  return <Provider store={store}>{children}</Provider>;
}
