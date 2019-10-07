import React from 'react';
import { Trans } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TimerTwoToneIcon from '@material-ui/icons/TimerTwoTone';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';

import { SettingsStore } from '../../../stores';

interface PropTypes {
  settings?: SettingsStore;
}

@inject('settings')
@observer
export class SettingsTimer extends React.Component<PropTypes> {
  render() {
    const { timers, selectedTimer, selectTimer } = this.props.settings!;
    return (
      <ListItem>
        <Box mr={2}>
          <TimerTwoToneIcon />
        </Box>
        <ListItemText
          primary={<Trans i18nKey='settings-timer-primary' />}
          secondary={<Trans i18nKey='settings-timer-secondary' />}
        />
        <Box ml={2}>
          <ButtonGroup>
            {timers.map(timer => (
              <Button
                key={timer}
                disabled={timer === selectedTimer}
                onClick={() => selectTimer(timer)}
              >
                {timer}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </ListItem>
    );
  }
}
