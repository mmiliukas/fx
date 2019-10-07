import React, { useEffect } from 'react';
import { Provider } from 'mobx-react';

import { create } from '../stores';
import { AppTabs } from './app-tabs';
import { AppTheme } from './app-theme';

const stores = create();

export function App() {
  useEffect(() => {
    stores.accounts.load();
    stores.exchangeRates.load();
    return () => stores.exchangeRates.dispose();
  }, []);
  return (
    <Provider {...stores}>
      <AppTheme>
        <AppTabs />
      </AppTheme>
    </Provider>
  );
}
