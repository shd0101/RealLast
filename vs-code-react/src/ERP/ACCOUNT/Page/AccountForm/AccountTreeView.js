import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {useDispatch, useSelector} from "react-redux";

import * as types from 'ERP/ACCOUNT/ActionType/ActionType';
import SearchButton from './SearchButton';

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 100,
  },
});


const AccountTreeview = () => {

  const dispatch = useDispatch();

  const getData = async e => {
    dispatch( { type : types.SEARCH_ACCOUNT_REQUEST, 
    });
  };

  const data = useSelector(({AccReducer}) => AccReducer.accountList , []);
  const classes = useStyles();
  //console.log(data);

  /*const initData = {
    accountLevel : '',
    accountName : '',
    accountCode : '',
    accountInnerCode : '',
    parentAccountInnerCode : '',
    leaf : '',
  };
  
  const [treeData, setTreeData] = React.useState(initData);

  const makeTree = data.map((e,i) => {
    setTreeData([
      {
        accountLevel : e.accountLevel,
        accountName : e.accountName,
        accountCode : e.accountCode,
        accountInnerCode : e.accountInnerCode,
        parentAccountInnerCode : e.parentAccountInnerCode,
        leaf : e.leaf,
      }
    ])
  });*/

  const betaData = {
    accountLevel : '',
    accountName : '',
    accountCode : '',
    accountInnerCode : '',
    parentAccountInnerCode : '',
    leaf : '',
  };

  let treeData=[];

  data.forEach((element,index) => {
    let innerData = {...betaData};
    
    innerData.accountLevel = element.accountLevel;
    innerData.accountName = element.accountName;
    innerData.accountCode = element.accountCode;
    innerData.accountInnerCode = element.accountInnerCode;
    innerData.parentAccountInnerCode = element.parentAccountInnerCode;
    innerData.leaf = element.leaf;
    if(element.leaf!=="1"){
      innerData.children = [];
    }
    if(index!=="0"){
      if(element.accountInnerCode===treeData.parentAccountInnerCode){
        treeData.children.push(innerData);
        return;
      }
    }
    treeData.push(innerData);
  });

  console.log(treeData[0]);

  /*treeData.forEach(element => {
    console.log(element.accountInnerCode);
  });*/


  return (
    <>
      <SearchButton getData={getData} />
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
      </TreeView>
    </>
  );
}

export default AccountTreeview; 
