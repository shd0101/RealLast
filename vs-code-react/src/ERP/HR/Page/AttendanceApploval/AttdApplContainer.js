import React from "react";
import AttendanceApploval from "./AttendanceApploval";
import { connect } from "react-redux";
import { searchAttdApplList, updateAttdApplList } from "ERP/HR/Action/Action";
import { withRouter } from "react-router-dom";

// *********************** 결제승인관리 시작 _재영 ***********************
const AttdApplContainer = props => {
  const { flag,attdApplList, searchAttdApplList, errorCode, errorMsg, updateAttdApplList } = props;

  return (
    <div>
      <AttendanceApploval
      searchAttdApplList={searchAttdApplList}
      attdApplList={attdApplList}        //
      errorCode={errorCode}
      errorMsg={errorMsg}
      updateAttdApplList={updateAttdApplList}
      flag={flag}
      />
    </div>
  );
};

const mapStateToProps = state => {
  console.log("gggggggggggggggggg");
  console.log(state);
  return {
    errorCode: state.HrReducer.errorCode,
    errorMsg: state.HrReducer.errorMsg,
    attdApplList: state.HrReducer.searchAttdApplList,    
    flag: state.HrReducer.flag
  };
};

export default connect(mapStateToProps, { searchAttdApplList,updateAttdApplList })(
  withRouter(AttdApplContainer)
);

// *********************** 결제승인관리 종료 _재영 ***********************