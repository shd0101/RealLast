import React from 'react';
import { Paper } from '@material-ui/core';
import AccountTreeView from './AccountTreeView';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(30),
      height: theme.spacing(100),
    },
  },
}));

const AccountForm = () => {
  const classes = useStyles();

  return (
    <>
    <h1>계정과목</h1>
    <div className={classes.root}>
      <Paper elevation={3}>
        <AccountTreeView/>
      </Paper>
    </div>
    </>
  );
}

export default AccountForm; 
