import React from 'react';
import { Trans } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import List from '@material-ui/core/List';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Box from '@material-ui/core/Box';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

import { ExchangeRateStore } from '../../../stores';

interface PropTypes {
  exchangeRates?: ExchangeRateStore;
}

@inject('exchangeRates')
@observer
export class Rates extends React.Component<PropTypes> {
  render() {
    const { rates } = this.props.exchangeRates!;
    const data: any = [];

    Object.keys(rates).forEach(base => {
      Object.keys(rates[base]).forEach(target => {
        if (base !== target) {
          data.push([base, target, rates[base][target]]);
        }
      });
    });

    return (
      <List>
        <ListSubheader>
          <Trans i18nKey='rates-title' />
        </ListSubheader>
        <ListItem>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Trans i18nKey='rates-currencies' />
                </TableCell>
                <TableCell align='right'>
                  <Trans i18nKey='rates-rate' />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any) => (
                <TableRow key={`${row[0]}-${row[1]}`}>
                  <TableCell>
                    <Box display='flex' alignItems='center'>
                      {row[0]}
                      <ArrowRightAltIcon />
                      {row[1]}
                    </Box>
                  </TableCell>
                  <TableCell align='right'>{row[2].toFixed(4)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ListItem>
      </List>
    );
  }
}
