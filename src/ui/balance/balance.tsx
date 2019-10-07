import React from 'react';
import { Trans } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import { Money } from '../../domain';
import { FormattedMoney } from '../formatted-money';

interface PropTypes {
  money: Money;
  bad?: boolean;
}

export function Balance({ money, bad }: PropTypes) {
  return (
    <Typography
      color={bad ? 'error' : 'initial'}
      component='span'
      variant='subtitle2'
    >
      <Trans i18nKey='balance' /> <FormattedMoney money={money} />
    </Typography>
  );
}
