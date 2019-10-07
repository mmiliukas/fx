import React from 'react';
import { Trans } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';

import { SettingsStore } from '../../../stores';

const Input = withStyles((theme: Theme) =>
  createStyles({
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      padding: '10px 26px 10px 12px',
      maxWidth: 120,
      minWidth: 120
    }
  })
)(InputBase);

interface PropTypes {
  settings?: SettingsStore;
}

@inject('settings')
@observer
export class SettingsProvider extends React.Component<PropTypes> {
  render() {
    const { providers, selectedProviderId } = this.props.settings!;
    return (
      <ListItem>
        <Box mr={2}>
          <MonetizationOnTwoToneIcon />
        </Box>
        <ListItemText
          primary={<Trans i18nKey='settings-provider-primary' />}
          secondary={<Trans i18nKey='settings-provider-secondary' />}
        />
        <Box ml={2}>
          <Select
            value={selectedProviderId}
            onChange={this.onSelectProvider}
            input={<Input />}
          >
            {providers.map(({ id }) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </ListItem>
    );
  }

  private onSelectProvider = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => {
    const { selectProvider } = this.props.settings!;
    selectProvider(event.target.value as string);
  };
}
