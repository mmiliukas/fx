import React from 'react';
import { Trans } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TodayTwoToneIcon from '@material-ui/icons/TodayTwoTone';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';

import { SettingsStore } from '../../../stores';

interface PropTypes {
  settings?: SettingsStore;
}

@inject('settings')
@observer
export class SettingsNonWorkingHours extends React.Component<PropTypes> {
  render() {
    const {
      nonWorkingHoursEnabled,
      toggleNonWorkingHours
    } = this.props.settings!;
    return (
      <ListItem>
        <Box mr={2}>
          <TodayTwoToneIcon />
        </Box>
        <ListItemText
          primary={<Trans i18nKey='settings-weekend-primary' />}
          secondary={<Trans i18nKey='settings-weekend-secondary' />}
        />
        <Box ml={2}>
          <Switch
            checked={nonWorkingHoursEnabled}
            onChange={toggleNonWorkingHours}
          />
        </Box>
      </ListItem>
    );
  }
}
