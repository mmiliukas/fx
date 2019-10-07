import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { inject, observer } from 'mobx-react';
import Chip from '@material-ui/core/Chip';

import { ExchangeRateStore } from '../../stores';
import { KnownCurrencies } from '../../domain';

interface PropTypes {
  from: string;
  to: string;
  exchangeRates?: ExchangeRateStore;
}

@inject('exchangeRates')
@observer
export class ExchangeRate extends React.Component<PropTypes> {
  render() {
    const { rates, loaded } = this.props.exchangeRates!;
    if (!loaded) {
      return <Skeleton width={100} />;
    }

    const { from, to } = this.props;

    const label = (
      <>
        <span>{KnownCurrencies[from].symbol} 1</span>
        <span>&nbsp;=&nbsp;</span>
        <span>
          {KnownCurrencies[to].symbol} {rates[from][to].toFixed(4)}
        </span>
      </>
    );
    return <Chip variant='outlined' size='small' label={label} />;
  }
}
