import React, { useState } from 'react';
import MpsContractGrid from 'ERP/LOGISTIC/Page/mps/MpsContractGrid';
import MpsSearchContract from 'ERP/LOGISTIC/Page/mps/MpsSearchContract';
import MpsGrid from 'ERP/LOGISTIC/Page/mps/MpsGrid';
import { Button, TextField, makeStyles, Typography, Radio } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import {FormControlLabel,RadioGroup,} from "@material-ui/core";

import "ag-grid-community/dist/styles/ag-grid.css";
import axios from "axios";

//================================================================2020-08-24 진형욱 MPS Page 수정 ================================================================= 
const useStyles = makeStyles(theme => ({
  btnSearch: {
    fontSize: "0.7rem",
    backgroundColor: "rosybrown",
    color: "white",
    fontWeight: "bold",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
  },
  labelStyle: {
    color: "gray",
    padding: theme.spacing(2),
    fontWeight: "bold",
  },
  cal: {
    padding: theme.spacing(2),
  },
  end: {
    padding: theme.spacing(2),
  },
  hrStyle: {
    opacity: "0.4",
  },
  name: {
    color: "dimGray",
    fontWeight: "600",
    fontSize: "20px",
  },
  radio:{
    color: "black",
    fontWeight: "bold",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
  },
  text:{
    color: "black",
    fontWeight: "bold",
    border: "solid",
    width: "250px",
  },
  dialogText:{
    color: "black",
    fontWeight: "bold",
    border: "solid",
    width: "290px",
    fontSize : "14px",
  },
}));

const gridFrameStyle = {
  height: "300px",
  width: "95%",
  backgroundColor: "gainsboro",
};

const gridStyle = {
  width: "95%",
  height: "70vh",
  backgroundColor: "whiteSmoke",
};

const headerName = [
    { headerName: '', checkboxSelection: true, width: 70, headerCheckboxSelection: true },
    { headerName: "주생산계획번호", field: "mpsNo", width: 140},
    { headerName: "계획구분", field: "mpsPlanClassification", width: 140},
    { headerName: "수주상세일련번호", field: "contractDetailNo", width: 140 },
    { headerName: "판매계획일련번호", field: "salesPlanNo", width: 140},
    { headerName: "품목코드", field: "itemCode", width: 140 },
    { headerName: "품목명", field: "itemName", width: 140},
    { headerName: "단위", field: "unitOfMps", minWidth: 70},//hide
    { headerName: "계획일자", field: "mpsPlanDate", minWidth: 90 },//hide
    { headerName: "계획수량", field: "mpsPlanAmount", width: 140},
    { headerName: "납기일", field: "dueDateOfMps",width: 140, hide: true },
    { headerName: "예정마감일자", field: "scheduledEndDate", width: 140 },
    { headerName: "MRP 적용상태", field: "mrpApplyStatus", width: 140, hide: true},
    { headerName: "비고", field: "description", width: 140, hide: true},
];

const dialogHeaderName = [//수주상세 dialog창
    { headerName: "MPS 등록", field: "contractDetailNo", width: 140},
    { headerName: "수주상세일련번호", field: "contractType", width: 140},
    { headerName: "수주유형", field: "planClassification", width: 140},
    { headerName: "수주일자", field: "contractDate", width: 140},
    { headerName: "견적수량", field: "estimateAmount", width: 140},
    { headerName: "초기납품내역", field: "stockAmountUse", width: 140},
    { headerName: "제작수량", field: "productionRequirement", width: 140},
    { headerName: "계획일자", field: "mpsPlanDate", width: 140 ,editable: true,
                  cellEditor: 'datePicker',
    },
    { headerName: "출하예정일", field: "scheduledEndDate", width: 140},
    { headerName: "납기일", field: "dueDateOfContract", width: 140},
    { headerName: "거래처코드", field: "customerCode", width: 140},
    { headerName: "품목코드", field: "itemCode", width: 140},
    { headerName: "품목명", field: "itemName", width: 140},
    { headerName: "단위", field: "unitOfContract", width: 140},
    { headerName: "비고", field: "description", width: 140},
];
// var gridOpt = useStyles.getDefaultGridOpt(dialogHeaderName);
//             gridOpt.components = {
//                 datePicker: getDatePicker() // util에서 확인 
//             };
const MpsRegister = ({ estimateNo, setEstimateNo }) => {
  const classes = useStyles();
  const single = "single";

  const [estimateGridApi, setEstimateGridApi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [DstartDate, setDstartDate] = useState("");
  const [DendDate, setDendDate] = useState("");
  const [rowData, setRowData] = useState("");
  const [DrowData, setDrowData] = useState("");
  const [radioCheck, setRadioCheck] = useState("");
  const [DradioCheck, setDradioCheck] = useState("");
  const { title }= "기간조회";

  function gridReady(params) {
    console.log("----- gridReady() 호출 -----");

    setEstimateGridApi(params.api);
    console.log("estimateGridApi >>>", estimateGridApi);
    return estimateGridApi;
  }

  const startDateChange = e => {
    //  console.log("startDateChange() 호출 - e.target.value -->", e.target.value);

    setStartDate(e.target.value);
  };
  console.log("시작날짜>>", startDate);

  const endDateChange = e => {
    // console.log("endDateChange()호출 - e.target.value -->", e.target.value);

    setEndDate(e.target.value);
  };
  console.log("종료날짜>>", endDate);

  const DstartDateChange = e => {

    setDstartDate(e.target.value);
  };

  const DendDateChange = e => {

    setDendDate(e.target.value);
  };

  
  const searchContract = e => {// MPS조회버튼
    console.log("=========MPS검색======");
    let startd = startDate;
    let endd = endDate;
    if (startd && endd === "") {
      alert("날짜를 입력해 주세요");
      return;
    }
    let url = "http://localhost:8282/logi/production/searchMpsInfo.do";

    const getData = async () => 
        await axios({
            method: "POST",
            url: url,
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            params: {
                startDate: startd,
                endDate: endd,
                includeMrpApply: title
            },
          });

          getData()
          .then(response => {
            console.log(
              "axios동작해서 나온 response.data ---> ",
              response.data.gridRowJson,
            );
            setRowData(response.data.gridRowJson);
          })
          .catch(e => {
            console.log("MPS조회하다 발생한 에러 >> ", e);
          });
  };

  const DsearchContract = e => {// 다이알로그에있는 검색
    console.log("===============수주상세 MPS등록 Dialog 검색버튼==============");
    let startd = DstartDate;
    let endd = DendDate;
    if (startd && endd === "") {
      alert("날짜를 입력해 주세요");
      return;
    }
    let url = "http://localhost:8282/logi/production/searchContractDetailInMpsAvailable.do";
    console.log("다얄로그 라디오에 찍힌 값::::::::::",DradioCheck);
    const getData = async () => 
        await axios({
            method: "POST",
            url: url,
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            params: {
                searchCondition: DradioCheck,
                startDate: startd,
                endDate: endd,
            },
          });

          getData()
          .then(response => {
            console.log(
              "axios동작해서 나온 response.data ---> ",
              response.data.gridRowJson,
            );
            setDrowData(response.data.gridRowJson);
          })
          .catch(e => {
            console.log("MPS조회하다 발생한 에러 >> ", e);
          });
  };




const [contractDetailOpen, setContractDetailOpen] =useState(false);


const insertOnclick = () => {
    console.log("넘어온 라디오 value값::::::",radioCheck);
    switch(radioCheck){
        case "contractDetail" : setContractDetailOpen(true);
                                break;
        case "salesPlan" : alert("판매계획쪽");
                           break;
        default : alert("계획구분을 선택한 후 MPS를 등록해주세요.");
    } 
};
const closeEsDialog =() =>{
    
    if(radioCheck==="contractDetail"){
        setContractDetailOpen(false);
    }else{

    }   
};
const radioOnClick =(e) =>{
    console.log("라디오에 찍힌 값은 무엇일까>!>!?!?!?!?",e.currentTarget.value);
    setRadioCheck(e.currentTarget.value);
    if(e.currentTarget.value==="contractDetail"){
        console.log("수주상세라디오 접근@@@@@@@@");    
    }else{
        console.log("판매계획라디오 접근@@@@@@@@");
    }
};
const dialogRadioOnClick =(e) =>{
    console.log("다얄로그 라디오에 찍힌 값은 무엇일까>!>!?!?!?!?",e.currentTarget.value);
    setDradioCheck(e.currentTarget.value);
};    

  return (
    <>
      <div className="contract_header">
        <div className={classes.cal}>
          <Typography className={classes.labelStyle} onClick={radioOnClick}>시작일&nbsp;&nbsp;&nbsp;
          <TextField
            id={"startDate"}
            type="date"
            value={startDate}
            onChange={startDateChange}
          ></TextField>
          </Typography>

          <Typography className={classes.labelStyle}>종료일&nbsp;&nbsp;&nbsp;
          <TextField
            id={"endDate"}
            type="date"
            value={endDate}
            onChange={endDateChange}
          ></TextField>
          </Typography>
        </div>
        &nbsp;&nbsp;
        <Button className={classes.btnSearch} onClick={searchContract}>
          MPS 조회
        </Button>

      </div>
      <br />
      <hr className={classes.hrStyle} />
      <RadioGroup
            row
            aria-label="position"
            onChange={radioOnClick}
          >
        <fieldset className={classes.text}>
              <legend>
                <strong>MPS 로 등록할 계획 구분</strong>
              </legend>
              <FormControlLabel
                value="contractDetail"
                control={<Radio />}
                label="수주상세"
              />
              <FormControlLabel
                value="salesPlan"
                control={<Radio />}
                label="판매계획"
              />
        </fieldset>
      </RadioGroup>
        <br />
        <Button className={classes.btnSearch} onClick={insertOnclick}>
          새로운 MPS 등록
        </Button>
        <hr className={classes.hrStyle} />
        <br />
      <div className="contract_body">
        <div className={"ag-theme-material"} style={gridFrameStyle}>
          <AgGridReact
            onGridReady={gridReady}
            columnDefs={headerName}
            style={gridStyle}
            rowSelection={single}
            rowData={rowData}
          />
        </div>
        <hr className={classes.hrStyle} />
        <br />
      </div>
        <div> 
                <Dialog open={contractDetailOpen} onClose={closeEsDialog} fullWidth={true} maxWidth={'2300px'}>
                    <DialogTitle id="simple-dialog-title">수주 상세에서 MPS등록</DialogTitle>
                    <DialogContent>
                        <RadioGroup
                            row
                            aria-label="position"
                            onChange={dialogRadioOnClick}
                        >
                        <fieldset className={classes.dialogText}>
                            <legend>
                                <strong>수주상세 검색조건</strong>
                            </legend>
                            <FormControlLabel
                                value="contractDate"
                                control={<Radio />}
                                label="수주일자"
                            />
                            <FormControlLabel
                                value="dueDateOfContract"
                                control={<Radio />}
                                label="납기일"
                            />
                        </fieldset>
                        <fieldset className={classes.dialogText}>
                            <legend>
                                <strong>수주상세 검색 날짜</strong>
                            </legend>
                            <TextField
                                id={"DstartDate"}
                                type="date"
                                value={DstartDate}
                                onChange={DstartDateChange}
                            ></TextField>&nbsp;시작날짜
                            <TextField
                                id={"DendDate"}
                                type="date"
                                value={DendDate}
                                onChange={DendDateChange}
                            ></TextField>&nbsp;종료날짜
                            <br />
                            <br />
                            <Button className={classes.btnSearch} onClick={DsearchContract}>
                             검색
                            </Button>
                            <br />
                        </fieldset>
                        </RadioGroup>
                        <div className={"ag-theme-material"} style={gridFrameStyle}>
                            <AgGridReact
                                onGridReady={gridReady}
                                columnDefs={dialogHeaderName}
                                style={gridStyle}
                                rowSelection={single}
                                rowData={DrowData}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={closeEsDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>
        </div>
    </>

  );
};

export default MpsRegister;
//================================================================2020-08-24 진형욱 MPS Page 수정 =================================================================