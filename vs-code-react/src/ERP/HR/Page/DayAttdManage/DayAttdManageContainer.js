import React from 'react';
import DayAttdManage from './DayAttdManage';
import { connect } from 'react-redux';
import { SearchDayAttdListRequest, updateDayAttdList, searchMonthAttdMgtList } from 'ERP/HR/Action/Action';
import { withRouter } from "react-router-dom";

const DayAttdManagerContainer = (props) => {
    const { dayAttdMgtList,monthAttdMgtList, SearchDayAttdListRequest, updateDayAttdList, errorCode, errorMsg, searchMonthAttdMgtList }=props;

    const searchDayAttd= (searchDate) => {
        SearchDayAttdListRequest({ cday:searchDate });
    }
    return(
        <div>
        <DayAttdManage 
            searchDayAttd={searchDayAttd}
            searchMonthAttdMgtList={searchMonthAttdMgtList}
            updateDayAttdList={updateDayAttdList}
            dayAttdMgtList={dayAttdMgtList}
            monthAttdMgtList={monthAttdMgtList}      
            errorCode={errorCode}
            errorMsg={errorMsg}
        />
        </div>
    )

}

const mapStateToProps=(state) =>{
    return{
        errorCode: state.HrReducer.errorCode,
        errorMsg: state.HrReducer.errorMsg,
        dayAttdMgtList: state.HrReducer.dayAttdMgtList,
        monthAttdMgtList: state.HrReducer.monthAttdMgtList,
    };
}

export default connect(mapStateToProps,{searchMonthAttdMgtList, SearchDayAttdListRequest, updateDayAttdList })(withRouter(DayAttdManagerContainer));