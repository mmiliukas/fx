import React from 'react';
import { Trans } from 'react-i18next';

import { Typography } from '@material-ui/core';

import { Money, isZero } from '../../domain';
import { FormattedMoney } from '../formatted-money';

interface PropTypes {
  money: Money;
}

export function Fee({ money }: PropTypes) {
  if (money && !isZero(money)) {
    return (
      <Typography variant='subtitle2'>
        <Trans i18nKey='fee' /> <FormattedMoney money={money} />
      </Typography>
    );
  }
  return null;
}
