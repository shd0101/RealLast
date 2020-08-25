import React from "react";
import UseStyles from "./UseStyles";
import {Paper,TextField,Button,Grid,AppBar,InputLabel,Box,Typography,Toolbar,
  MenuItem,Select,FormControl,OutlinedInput} from "@material-ui/core"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import useAxios from "util/useAxios";
import useInput from "util/useInput";
import RestAttdInput from "./RestAttdInput";

import { useDispatch } from "react-redux";
import { REST_ATTD_REQUEST } from "ERP/HR/ActionType/ActionType"

//*************************외출 및 조퇴 시작 _준서 _20.08.24 *************************
const RestAttdComp = props => {
    const columnDefs = RestAttdInput;
    const classes = UseStyles();

  const fromDate = useInput("2020-01-01");
  const toDate = useInput("2020-12-31");
  const selectedInput = document.getElementsByName("attdRestTypeCode")[0];
  console.log(selectedInput);
  
  const codeDivision = element => {
    if(typeof element == "undefined") return "";
    else {
      console.log("%%%%%%%%%%%%");
      // console.log(element.value); 
      return element.value; 
    }
  }
  
  const fetchAttdRestList_axiosOptions = {
    url: "http://localhost:8282/hr/attendance/findRestAttdList.do",
    //headers : {"Context-Type": "application/json"},
    fetchOnStart: false,
    method: "get",
    params: {
      startDate: fromDate.value,
      endDate: toDate.value,
      empCode: sessionStorage.getItem("empCodeInfo_token"),
      code: codeDivision(selectedInput)
    }
  };
  
  const { data, fetch } = useAxios(fetchAttdRestList_axiosOptions);
    
  const fetchAttdRestList = () => {
    fetch();
    //console.log(`DATA: ${JSON.stringify(data)}`);
  };

  // togle
  const [costOpen, setCostOpen] = React.useState(false);
  const [attdRestOpen, setAttdRestOpen] = React.useState(false);

  function costHandleClose() {
    setCostOpen(false);
  }

  function costHandleOpen() {
    setCostOpen(true);
  }

  function attdRestHandleClose() {
    console.log("LOLOLOLOL");
    // console.log(data);
    setAttdRestOpen(false);
  }

  function attdRestHandleOpen() {
    setAttdRestOpen(true);
  }

  const requestDate = useInput();
  const attdRestStartDate = useInput();
  const attdRestEndDate = useInput();
  const attdRestTypeCode = useInput();
  const cause = useInput();
  const cost = useInput();

  const dispatch = useDispatch();

  const BatchDailyAttdRest = () => {
    console.log("+++++++++++++++");

    const numberOfDays = (
      (new Date(attdRestEndDate.value).getTime() -
        new Date(attdRestStartDate.value).getTime()) /
      (1000 * 60 * 60 * 24)
    ).toString()
    
    const restAttdApplyData = {
      empCode: sessionStorage.getItem("empCodeInfo_token"),
      restTypeCode: attdRestTypeCode.value,
      restTypeName: "",
      requestDate: new Date().toISOString().substring(0, 10),
      startDate: attdRestStartDate.value,
      endDate: attdRestEndDate.value,
      cause: cause.value,
      approvalStatus: "N",
      rejectCause: "",
      cost: "",
      startTime:  "",
      endTime:  "",
      numberOfDays: numberOfDays
    };
    console.log(restAttdApplyData);
    dispatch({ type: REST_ATTD_REQUEST, data: restAttdApplyData });
    
  };

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.topPaper}>
            <FormControl variant="outlined" className={classes.topFormControl}>
              <InputLabel
                ref={inputLabel}
                htmlFor="outlined-attdRestTypeCode-simple"
              >
              ATTD TYPE
              </InputLabel>
              <Select
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="attdRestTypeCode"
                    id="outlined-attdRestTypeCode-simple"
                  />
                }
                open={attdRestOpen}
                onClose={attdRestHandleClose}
                onOpen={attdRestHandleOpen}
                value={attdRestTypeCode.value}
                onChange={attdRestTypeCode.onChange}
              >
                <option value="">ALL</option>
                <option value="ADC003">공외출</option>
                <option value="ADC005">사외출</option>
                <option value="DAC004">조퇴</option>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      <Grid item xs={4}>
        <Paper className={classes.leftPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">근태외 신청</Typography>
            </Toolbar>
          </AppBar>
          <br/><br/><br/>
          <form>
            <TextField
              id="requestDate"
              label="신청날짜"
              type="date"
              defaultValue={requestDate.value}
              onChange={requestDate.onChange}
              className={classes.textField}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
            <br/>
            <TextField
              id="attdRestStartDate"
              label="근태외 시작일"
              type="date"
              variant="outlined"
              defaultValue={attdRestStartDate.value}
              onChange={attdRestStartDate.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br/>
            <TextField
              id="attdRestEndDate"
              label="근태외 종료일"
              type="date"
              variant="outlined"
              defaultValue={attdRestEndDate.value}
              onChange={attdRestEndDate.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br/>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={inputLabel}
                htmlFor="outlined-cost-simple"
              >
                COST
              </InputLabel>
              <Select
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="cost"
                    id="outlined-cost-simple"
                  />
                }
                open={costOpen}
                onClose={costHandleClose}
                onOpen={costHandleOpen}
                value={cost.value}
                onChange={cost.onChange}
              >
                <MenuItem value="ETS001">출장수당</MenuItem>
                <MenuItem value="ETS002">유류비</MenuItem>
                <MenuItem value="ETS003">자기계발지원금</MenuItem>
                <MenuItem value="ETS004">식비</MenuItem>
              </Select>
            </FormControl>
            <br/>
            <TextField
              id="cause"
              label="근태외 사유"
              variant="outlined"
              defaultValue={cause.value}
              onChange={cause.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <Box textAlign="right">
            <Button
              variant={"outlined"}
              color={"primary"}
              onClick={BatchDailyAttdRest}
              className={classes.button}
            >
              신청
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper className={classes.rightPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">근태외 현황조회</Typography>
            </Toolbar>
          </AppBar>
          <br/><br/><br/>
          <div>
            <TextField
              id={"fromDate"}
              label={"검색날짜"}
              type={"date"}
              defaultValue={fromDate.value}
              onChange={fromDate.onChange}
              className={classes.textField}
              variant="outlined"
            />
            <TextField
              id={"toDate"}
              label={"검색날짜"}
              type={"date"}
              defaultValue={toDate.value}
              onChange={toDate.onChange}
              className={classes.textField}
              variant="outlined"
            />
            <Button
              variant={"outlined"}
              color={"primary"}
              onClick={fetchAttdRestList}
              className={classes.button}
            >
              조회
            </Button>
          </div>
          <div
            className={"ag-theme-material"}
            style={{
              height: "400px",
              width: "100%"
            }}
          >
            <AgGridReact columnDefs={columnDefs} rowData={data ? data : []} />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RestAttdComp;

//*************************외출 및 조퇴 종료 _준서 _20.08.24 *************************