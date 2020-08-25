import React from 'react';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import {makeStyles,
        TextField,
} from "@material-ui/core";

const ApprovalManagerHeader = ({headInfo,headChange}) => {
    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        root: {
            '& > *': {
                margin: theme.spacing(2),
            },
        }
    }));

    const { startDate, endDate } = headInfo;
    // 시작날짜, 끝날짜, 유형 값을 headInfo가 가지고 있음. 비구조 할당으로 사용가능.

    const classes = useStyles();

    return (
        <>
            <div align="left" className={classes.root} style={{ height: '1%', float: 'left' }}>
                <TextField
                    name="startDate"
                    type={"date"}
                    defaultValue={startDate}  //defaultValue : 초기값.
                    onChange={headChange}   // onChange : 값이 변경되면 콜백이 발생.
                />
                <TextField
                    name="endDate"
                    type={"date"}
                    defaultValue={endDate}
                    onChange={headChange}
                />
            </div>
        </>
    );
};


export default ApprovalManagerHeader;