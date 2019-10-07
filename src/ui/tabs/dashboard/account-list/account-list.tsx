import React from 'react';
import { Trans } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import {
  AccountStore,
  ExchangeRateStore,
  ActiveTabStore
} from '../../../../stores';
import { AccountListItem } from './account-list-item';
import { AccountListItemEmpty } from './account-list-item-empty';
import { AccountListTotalAmount } from './account-list-total-amount';

interface PropTypes {
  accounts?: AccountStore;
  exchangeRates?: ExchangeRateStore;
  activeTab?: ActiveTabStore;
}

@inject('accounts', 'exchangeRates', 'activeTab')
@observer
export class AccountList extends React.Component<PropTypes> {
  render() {
    const accounts = this.props.accounts!;
    const exchangeRates = this.props.exchangeRates!;
    return (
      <List>
        <ListSubheader disableSticky>
          <Box display='flex' justifyContent='space-between'>
            <span>
              <Trans i18nKey='accounts-title' />
            </span>
            <AccountListTotalAmount />
          </Box>
        </ListSubheader>
        {!accounts.loaded && <AccountListItemEmpty />}
        {accounts.all.map(account => {
          return (
            <AccountListItem
              key={account.accountId}
              account={account}
              canTopUp={true}
              onTopUp={this.onTopUp}
              canExchange={exchangeRates.loaded}
              onExchange={this.onExchange}
            />
          );
        })}
      </List>
    );
  }

  private onTopUp = (accountId: string) => {
    const accounts = this.props.accounts!;
    accounts.topUp(accountId, 10000);
  };

  private onExchange = (accountId: string) => {
    const accounts = this.props.accounts!;
    const activeTab = this.props.activeTab!;
    accounts.changeSourceAccount(accountId);
    activeTab.goToExchange();
  };
}
