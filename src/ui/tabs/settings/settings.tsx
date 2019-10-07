import React from 'react';
import { Trans } from 'react-i18next';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import { SettingsTimer } from './settings-timer';
import { SettingsProvider } from './settings-provider';
import { SettingsNonWorkingHours } from './settings-non-working-hours';

export class Settings extends React.Component {
  render() {
    return (
      <List>
        <ListSubheader disableSticky>
          <Trans i18nKey='settings-title' />
        </ListSubheader>
        <SettingsTimer />
        <Divider />
        <SettingsProvider />
        <Divider />
        <SettingsNonWorkingHours />
      </List>
    );
  }
}
