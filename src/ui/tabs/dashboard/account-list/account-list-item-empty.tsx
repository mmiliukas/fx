import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

export class AccountListItemEmpty extends React.Component {
  render() {
    return (
      <ListItem>
        <Box mr={2}>
          <Skeleton variant='circle' width={24} height={24} />
        </Box>
        <ListItemText
          primary={<Skeleton width={100} component='span' />}
          secondary={<Skeleton width={50} component='span' />}
        />
        <Box display='flex' alignItems='center'>
          <Skeleton width={100} />
        </Box>
      </ListItem>
    );
  }
}
