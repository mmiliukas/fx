import React from 'react';
import { inject, observer } from 'mobx-react';
import Skeleton from '@material-ui/lab/Skeleton';

import { AccountStore, ExchangeRateStore } from '../../../../stores';
import { FormattedMoney } from '../../../formatted-money';
import { total } from '../../../../domain';

interface PropTypes {
  accounts?: AccountStore;
  exchangeRates?: ExchangeRateStore;
}

@inject('accounts', 'exchangeRates')
@observer
export class AccountListTotalAmount extends React.Component<PropTypes> {
  render() {
    const { accounts, exchangeRates } = this.props;

    if (accounts!.loaded && exchangeRates!.loaded) {
      const money = total(accounts!.accounts, exchangeRates!.rates);
      return <FormattedMoney money={money} />;
    }

    return <Skeleton width={100} />;
  }
}
