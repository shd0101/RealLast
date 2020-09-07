import React from "react";
import AttdAppl from "./AttdAppl";

//************************* 결제승인관리 시작 _재영 *************************
const AttendanceApploval = (props) => {
  console.log("<< AttendanceApploval.js >>");
  console.log(props);
  return (
    <div>
      <AttdAppl 
      searchAttdApplList={props.searchAttdApplList}
      attdApplList={props.attdApplList}
      updateAttdApplList={props.updateAttdApplList}
      flag={props.flag} />
    </div>
  );
};

export default AttendanceApploval;
//************************* 결제승인관리 종료 _재영 *************************
