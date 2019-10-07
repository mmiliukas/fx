import React from 'react';

import { Money, formatMoneyWithCurrency } from '../../domain';

interface PropTypes {
  money: Money;
}

export class FormattedMoney extends React.Component<PropTypes> {
  render() {
    const { money } = this.props;
    return formatMoneyWithCurrency(money);
  }
}
