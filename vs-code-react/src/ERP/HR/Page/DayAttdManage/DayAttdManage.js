import React, { useCallback, useState } from "react";
import Grid from "ERP/HR/Page/DayAttdManage/Grid";
import "./DayAttdManage.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, AppBar, Toolbar } from "@material-ui/core"

const DayAttdManage = ({ searchDayAttd, monthAttdMgtList, searchMonthAttdMgtList, dayAttdMgtList, updateDayAttdList, errorCode, errorMsg }) => {

  const [date, setDate] = useState('');

  const [monthCheck, setMonthCheck] = useState(false);
  
  const onChange = useCallback((e) => {
    setDate((e.target.value).toString());
  }, []);

  const search = () => {
    console.log("zzzzzzzzzzzzz"+date);
    searchDayAttd(date);
  };

  //마지막 문자열 찾아서 교체하는 함수
 const replaceLast = (str, regex, replacement) => {
		var regexIndexOf = str.lastIndexOf(regex);
		if (regexIndexOf === -1) {
			return str;
		} else {
			/* 넘어오는 regex가 number타입이기 때문에 length가 안먹힘 그래서 toString으로 문자열로 변경후 사용 */
			return str.substring(0, regexIndexOf) + replacement
					+ str.substring(regexIndexOf + regex.toString().length);
		}
  }
  
  const monthList = useCallback((dayAttdMonthData) => {
    searchMonthAttdMgtList({cday:dayAttdMonthData});   
    setMonthCheck(true);
    console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddd"+monthCheck);
  },[monthAttdMgtList]);

  //마감이벤트
  const finalize = (e) => {
  //일근태 마감 전 월근태 마감 여부 검사
  //월근태 조회 조건을 맞추기 위한 작업 ex)2020-08-20 => 2020-8 
    let dayAttdMonthData = date.substring(0, date.lastIndexOf("-"));
    if (date.substring(5, 6) === '0'){
    dayAttdMonthData = replaceLast(dayAttdMonthData, 0, "");
    }

    //월근태조회 디스패치
    
    monthList(dayAttdMonthData);

    console.log("ddddddddddddddddddddd"+JSON.stringify(monthAttdMgtList))

    const dayAttd = dayAttdMgtList;
    
    for(let i=0; i<dayAttd.length; i++){ 
     delete dayAttd[i].errorCode
     delete dayAttd[i].errorMsg
     delete dayAttd[i].chk    
     //전체마감
     if(e.currentTarget.id === 'update'){
      if(dayAttd[i].finalizeStatus === 'Y'){
        alert('이미 마감처리 되었습니다.');
        return;
      } 
      dayAttd[i].status='update'
    }else{ //마감취소
      if(dayAttd[i].finalizeStatus === 'N'){
        alert('마감처리를 확인해주세요.');
        return;
      } 
      dayAttd[i].status='cancel'
    }
  }
  
    console.log("update-view"+JSON.stringify(dayAttd));

    if(monthCheck){
    updateDayAttdList({dayAttdMgtList:dayAttd, cday:dayAttdMonthData})
    if(!!errorMsg){
      alert(errorMsg);
    }
    if(!!dayAttdMgtList){
      alert('요청하신 처리가 완료 되었습니다.');
    }
    setMonthCheck(false);
  }
  };

    return (
     
      <div>
        <React.Fragment>
        <div className="ui primary segment">      
        <AppBar position="static" color="primary">
        <Toolbar>
          <Typography component="h2" variant="h4">
          일근태관리         
          </Typography>
        </Toolbar>
      </AppBar>     
      </div>
      <br />
      <div align='center'>
      <fieldset>
        <legend> [ 검색조건 ] </legend>
       < TextField
        name="searchDate"
        type={"date"}
        onChange={onChange}  
        defaultValue=""
       />
       <br />
       <div className="box">
       <Button variant="contained" color="primary" onClick={search}>
          조회하기
        </Button> 
        <Button id="update" variant="contained" color="primary" onClick={finalize}>
         전체마감하기
        </Button>
        <Button id="cancel" variant="contained" color="primary" onClick={finalize}>
         전체마감취소
        </Button>
        </div>
      </fieldset>
      </div>
       </React.Fragment>
       
        <div className="box" >        
        <Grid data={dayAttdMgtList} />
        </div>
      </div>
    );
  }

export default DayAttdManage;