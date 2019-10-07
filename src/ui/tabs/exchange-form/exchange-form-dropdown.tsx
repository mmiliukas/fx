import React from 'react';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Account, Accounts } from '../../../domain';

interface PropTypes {
  selectedAccount: Account;
  accounts: Accounts;
  onSelectAccount: (accountId: string) => void;
}

export class ExchangeFormDropDown extends React.Component<PropTypes> {
  state = {
    anchor: null
  };

  render() {
    const { selectedAccount, accounts } = this.props;
    return (
      <>
        <Box display='flex' alignItems='center' onClick={this.showMenu}>
          <Typography variant='h3' style={{ verticalAlign: 'middle' }}>
            {selectedAccount.money.currencyCode}
          </Typography>
          <ArrowDropDownIcon />
        </Box>
        <Menu
          anchorEl={this.state.anchor}
          keepMounted
          open={Boolean(this.state.anchor)}
          onClose={this.hideMenu}
        >
          {accounts.map(_ => {
            return (
              <MenuItem
                key={_.money.currencyCode}
                selected={_.accountId === selectedAccount.accountId}
                onClick={() => this.selectAccount(_.accountId)}
              >
                {_.money.currencyCode}
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  }

  private showMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchor: event.currentTarget });
  };

  private selectAccount = (accountId: string) => {
    this.hideMenu();
    this.props.onSelectAccount(accountId);
  };

  private hideMenu = () => {
    this.setState({ anchor: null });
  };
}
