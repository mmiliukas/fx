import React from 'react';
import { Trans } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ExchangeIcon from '@material-ui/icons/AutorenewTwoTone';
import ControlPointRoundedIcon from '@material-ui/icons/ControlPointRounded';

import { FormattedMoney } from '../../../formatted-money';
import { Account } from '../../../../domain';
import { AccountFlag } from './account-flag';

interface PropTypes {
  account: Account;
  canTopUp: boolean;
  onTopUp: (accountId: string) => void;
  canExchange: boolean;
  onExchange: (accountId: string) => void;
}

export class AccountListItem extends React.Component<PropTypes> {
  render() {
    const { account, canTopUp, canExchange } = this.props;
    const { money } = account;
    return (
      <ListItem divider>
        <Box mr={2}>
          <AccountFlag account={account} />
        </Box>
        <ListItemText
          primary={<Trans i18nKey={money.currencyCode} />}
          secondary={money.currencyCode}
        />
        <Box>
          <Typography variant='subtitle2'>
            <FormattedMoney money={money} />
          </Typography>
        </Box>
        <Box ml={2}>
          <Tooltip title={<Trans i18nKey='accounts-top-up' />}>
            <span>
              <IconButton
                size='small'
                onClick={this.onTopUp}
                disabled={!canTopUp}
              >
                <ControlPointRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={<Trans i18nKey='accounts-exchange' />}>
            <span>
              <IconButton
                size='small'
                onClick={this.onExchange}
                disabled={!canExchange}
              >
                <ExchangeIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </ListItem>
    );
  }

  private onTopUp = () => {
    this.props.onTopUp(this.props.account.accountId);
  };

  private onExchange = () => {
    this.props.onExchange(this.props.account.accountId);
  };
}
