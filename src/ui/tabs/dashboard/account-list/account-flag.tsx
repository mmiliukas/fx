import React from 'react';

import { Account } from '../../../../domain/account';

import css from './account-flag.module.css';

interface PropTypes {
  account: Account;
}

export class AccountFlag extends React.Component<PropTypes> {
  render() {
    const { account } = this.props;
    const className = [
      css[account.money.currencyCode.toLowerCase()],
      css.flag
    ].join(' ');
    return <div className={className} />;
  }
}
