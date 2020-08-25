import React, { useState, useEffect } from 'react';

import {useDispatch, useSelector} from "react-redux";
import * as types from 'ERP/ACCOUNT/ActionType/ActionType';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const JournalGrid = ({slipNo , flag }) => {

       // slipNo : SlipGrid 컴포넌트에서 넘어온 slipNo로 journal 조회함.
    // flag : 3개 버튼 활성화.

    const data = useSelector(({AccReducer}) => AccReducer.approvalJournalList , []);
    
    const dispatch = useDispatch();

    //========================== 그리드 객체 준비 ==========================
    const [gridApi, setGridApi] = useState();

    const classes = useStyles();

    const onGridReady = params => {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    };

    useEffect(
        
        () => {
            if(!flag) return;
                initalBtn()
        },[flag]
    )
    //========================== 그리드초기화 ==========================

    const initalBtn = () => {
        gridApi.selectAll();      // 그리드를 모두 선택해라.
        const allData = gridApi.getSelectedRows();   // 선택한 그리드 데이타 들고온나.
        gridApi.updateRowData({ remove: allData });  // 데이터 전부 지아라.
    };

    //========================== 분개조회 ==========================
    useEffect(() => {
      if (slipNo === '' || slipNo === 'NEW') return ;
        dispatch({ type : types.SEARCH_AM_JOURNAL_REQUEST, params : { slipNo: slipNo }});
    }, [slipNo]);   // SlipGrid 컴포넌트에서 보낸 slipNo 가 바뀔 때마다, slipNo 를 파라미터로 분개 List를 가져와라. setData 해라.


    //========================== 그리드내용 ==========================
    const accountColumnDefs = [
        { headerName: '', field: 'check', width: 50, checkboxSelection: true },
        { headerName: "분개일련번호", field: "journalNo", width: 230 },
        { headerName: "계정코드", field: "accountCode", width: 100 },
        { headerName: "계정명", field: "accountName", width: 130 },
        { headerName: "대차구분", field: "balanceDivision", width: 100 },
        { headerName: "적요", field: "summaryComment", width: 230,},
        { headerName: "거래처코드", field: "customerCode", width: 110 },
        { headerName: "거래처명", field: "customerName", width: 110 },
        { headerName: "금액", field: "price", width: 110, valueFormatter: currencyFormatter },
        // valueFormatter : 그리드의 표시형식.
        { headerName: "전표번호", field: "slipNo", width: 110, hide: true },
        { headerName: "차변", field: "leftDebtorPrice", width: 110, hide: true },
        { headerName: "대변", field: "rightCreditsPrice", width: 110, hide: true },
        { headerName: "적요번호", field: "summaryNumber", width: 110, hide: true },
    ];

    //========================== 통화표시 포매터 ==========================
    function currencyFormatter(params) {
        return "￦" + formatNumber(params.value);
    };
    function formatNumber(number) {
        return Math.floor(number)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };   // 몰라. 통화표시 형식임.


    return (
        <>
            <AppBar position="relative" className={classes.subCategory}>
                <Toolbar>
                    <Typography variant="h5">분개</Typography>
                </Toolbar>
            </AppBar>
            <div
                className={"ag-theme-balham"}
                style={{
                    height: "200px",
                    width: "100%",
                    paddingTop: "20px"
                    }}>
                <AgGridReact
                    columnDefs={accountColumnDefs}
                    rowData={data}   // 그리드에 data 뿌림.
                    rowSelection='multiple'  // 여러 줄 선택가능.
                    onGridReady={onGridReady}  // 그리드가 초기화 되면.
                />
            </div>
        </>
    );
};
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        height: 330,
        width: 1190
    },
    subCategory: {
        background: "#232f3e",
        color: "white"
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
export default JournalGrid;