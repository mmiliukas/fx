import React from 'react';
import { Trans } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import { Button, Box } from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import IconButton from '@material-ui/core/IconButton';

import {
  AccountStore,
  ExchangeRateStore,
  ActiveTabStore
} from '../../../stores';
import {
  greaterThanOrEqual,
  formatMoney,
  parse,
  add,
  subtract
} from '../../../domain';
import { ExchangeFormDropDown } from './exchange-form-dropdown';
import { MoneyInput } from '../../money-input';
import { Balance } from '../../balance';
import { ExchangeRate } from '../../exchange-rate';
import { Fee } from '../../fee';

interface PropTypes {
  accounts?: AccountStore;
  exchangeRates?: ExchangeRateStore;
  activeTab?: ActiveTabStore;
}

@inject('accounts', 'exchangeRates', 'activeTab')
@observer
export class ExchangeForm extends React.Component<PropTypes> {
  state = {
    sourceValue: '',
    sourceParsedValue: 0,
    targetValue: '',
    targetParsedValue: 0,
    sourceToTarget: true
  };

  render() {
    const {
      source,
      target,
      accounts,
      changeSourceAccount,
      changeTargetAccount
    } = this.props.accounts!;

    let {
      sourceValue,
      sourceParsedValue,
      targetValue,
      sourceToTarget,
      targetParsedValue
    } = this.state;

    let fee = null;
    let money = null;

    if (sourceToTarget) {
      if (sourceParsedValue === 0) {
        targetValue = '';
      } else {
        money = {
          amount: sourceParsedValue,
          currencyCode: source!.money.currencyCode
        };
        const result = this.props.accounts!.tryExchange(
          money,
          this.props.exchangeRates!.rates!
        );
        fee = result.fee;
        targetValue = formatMoney(result.exchanged);
      }
    } else {
      if (targetParsedValue === 0) {
        sourceValue = '';
      } else {
        const result = this.props.accounts!.tryExchangeToMatchSource(
          {
            amount: targetParsedValue,
            currencyCode: target!.money.currencyCode
          },
          this.props.exchangeRates!.rates!
        );
        fee = result.fee;
        money = result.charged;
        sourceValue = formatMoney(subtract(result.charged, fee));
      }
    }

    const overBudget = !money
      ? false
      : !greaterThanOrEqual(source!.money, fee ? add(money, fee) : money);

    return (
      <Box p={2} mt={2}>
        <Box display='flex' justifyContent='space-between'>
          <Box width={300}>
            <ExchangeFormDropDown
              selectedAccount={source!}
              accounts={accounts}
              onSelectAccount={changeSourceAccount}
            />
          </Box>
          <MoneyInput
            value={sourceValue}
            onChange={this.changeSourceValue}
            onBlur={this.onBlurSource}
            onFocus={this.onFocusSource(sourceValue)}
            autoFocus
          />
        </Box>
        <Box display='flex' justifyContent='space-between' mb={2}>
          <Balance money={source!.money} bad={overBudget} />
          <Fee money={fee!} />
        </Box>
        <Box
          display='flex'
          justifyContent='space-between '
          alignItems='center'
          mb={2}
        >
          <IconButton size='small' onClick={this.swap}>
            <ImportExportIcon />
          </IconButton>
          <ExchangeRate
            from={source!.money.currencyCode}
            to={target!.money.currencyCode}
          />
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Box width={300}>
            <ExchangeFormDropDown
              selectedAccount={target!}
              accounts={accounts}
              onSelectAccount={changeTargetAccount}
            />
          </Box>
          <MoneyInput
            value={targetValue}
            onFocus={this.onFocusTarget(targetValue)}
            onChange={this.changeTargetValue}
            onBlur={this.onBlurTarget}
          />
        </Box>
        <Box mb={2}>
          <Balance money={target!.money} />
        </Box>
        <Box>
          <Button
            variant='contained'
            color='secondary'
            onClick={this.exchange}
            fullWidth
            disabled={overBudget || !money}
          >
            <Trans i18nKey='exchange-exchange' />
          </Button>
        </Box>
      </Box>
    );
  }

  exchange = () => {
    const { exchange, exchangeToSource } = this.props.accounts!;
    const { rates } = this.props.exchangeRates!;
    if (this.state.sourceToTarget) {
      exchange(this.state.sourceParsedValue, rates);
    } else {
      exchangeToSource(this.state.targetParsedValue, rates);
    }
    this.props.activeTab!.goToDashboard();
  };

  onFocusSource = (value: string) => {
    return () => this.changeSourceValue(value);
  };

  onFocusTarget = (value: string) => {
    return () => this.changeTargetValue(value);
  };

  changeTargetValue = (value: string) => {
    const { currencyCode } = this.props.accounts!.target!.money;
    const result = parse(value, currencyCode);
    this.setState({ sourceToTarget: false });
    if (result.success) {
      this.setState({
        targetValue: result.value,
        targetParsedValue: result.parsedValue
      });
    }
  };

  onBlurSource = () => {
    const { source } = this.props.accounts!;
    this.setState({
      sourceValue: formatMoney({
        currencyCode: source!.money.currencyCode,
        amount: this.state.sourceParsedValue
      })
    });
  };

  onBlurTarget = () => {
    const { target } = this.props.accounts!;
    this.setState({
      targetValue: formatMoney({
        currencyCode: target!.money.currencyCode,
        amount: this.state.targetParsedValue
      })
    });
  };

  changeSourceValue = (value: string) => {
    const { currencyCode } = this.props.accounts!.source!.money;
    const result = parse(value, currencyCode);
    this.setState({ sourceToTarget: true });
    if (result.success) {
      this.setState({
        sourceValue: result.value,
        sourceParsedValue: result.parsedValue
      });
    }
  };

  private swap = () => {
    const accounts = this.props.accounts!;
    const sourceAccountId = accounts.sourceAccountId;
    const targetAccountId = accounts.targetAccountId;
    if (this.state.sourceToTarget) {
      this.setState({
        targetValue: this.state.sourceValue,
        targetParsedValue: this.state.sourceParsedValue,
        sourceToTarget: false
      });
    } else {
      this.setState({
        sourceValue: this.state.targetValue,
        sourceParsedValue: this.state.targetParsedValue,
        sourceToTarget: true
      });
    }
    accounts.changeSourceAccount(targetAccountId);
    accounts.changeTargetAccount(sourceAccountId);
  };
}
