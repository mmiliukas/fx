import React from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import AccountsIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import ExchangeIcon from '@material-ui/icons/AutorenewTwoTone';
import SettingsIcon from '@material-ui/icons/SettingsTwoTone';
import RatesIcon from '@material-ui/icons/TrendingUpTwoTone';

import { ExchangeForm } from './tabs/exchange-form';
import { Settings } from './tabs/settings';
import { Dashboard } from './tabs/dashboard';
import { Rates } from './tabs/rates';
import {
  ActiveTabStore,
  Tab as AppTab,
  ExchangeRateStore,
  AccountStore
} from '../stores';

import css from './app-tabs.module.css';

interface TabPanelProps {
  id: number;
  value: number;
  children: JSX.Element;
}

function TabPanel({ id, value, children }: TabPanelProps) {
  return id === value ? children : null;
}

interface PropTypes extends WithTranslation {
  activeTab?: ActiveTabStore;
  exchangeRates?: ExchangeRateStore;
  accounts?: AccountStore;
}

@inject('activeTab', 'exchangeRates', 'accounts')
@observer
class AppTabsComponent extends React.Component<PropTypes> {
  render() {
    const { t } = this.props;
    const { id, change } = this.props.activeTab!;
    const ratesLoaded = this.props.exchangeRates!.loaded;
    const accountsLoaded = this.props.accounts!.loaded;
    return (
      <Paper square className={css.tabs}>
        <AppBar position='static' className={css.bar}>
          <Tabs
            value={id}
            onChange={(_, value) => change(value)}
            centered
            variant='fullWidth'
          >
            <Tab
              value={AppTab.DASHBOARD}
              icon={<AccountsIcon />}
              label={t('tab-dashboard')}
            />
            <Tab
              value={AppTab.EXCHANGE}
              icon={<ExchangeIcon />}
              label={t('tab-exchange')}
              disabled={!(ratesLoaded && accountsLoaded)}
            />
            <Tab
              value={AppTab.RATES}
              icon={<RatesIcon />}
              label={t('tab-rates')}
              disabled={!ratesLoaded}
            />
            <Tab
              value={AppTab.SETTINGS}
              icon={<SettingsIcon />}
              label={t('tab-settings')}
            />
          </Tabs>
        </AppBar>
        <Box className={css.panel}>
          <TabPanel id={AppTab.DASHBOARD} value={id}>
            <Dashboard />
          </TabPanel>
          <TabPanel id={AppTab.EXCHANGE} value={id}>
            <ExchangeForm />
          </TabPanel>
          <TabPanel id={AppTab.RATES} value={id}>
            <Rates />
          </TabPanel>
          <TabPanel id={AppTab.SETTINGS} value={id}>
            <Settings />
          </TabPanel>
        </Box>
      </Paper>
    );
  }
}

export const AppTabs = withTranslation()(AppTabsComponent);
