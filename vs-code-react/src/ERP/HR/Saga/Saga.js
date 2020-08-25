import { put, takeEvery, takeLatest, all, call, fork } from "redux-saga/effects";
import axios from "axios";
import hrApi from 'Api/hrApi'
import * as types from "ERP/HR/ActionType/ActionType";
import * as actions from "ERP/HR/Action/Action";
import useAxios from "util/useAxios";
import {
  salaryListFailure,
  salaryListSuccess,
  closeSalaryWithSlipSuccess,
  closeSalaryWithSlipFailure,
  PositionListSuccess,
  PositionListFailure,
  EmpDetailedInfoSuccess,
  EmpDetailedInfoFailure,
  EmpUpdateSuccess,
  EmpUpdateFailure,
} from "../Action/Action";

function* codeSaga(action) {
  try {
    if (action.payload.type === "companyCode") {
      const { data } = yield axios.get(
        "http://localhost:8282/hr/basicInfo/searchCompany.do",
      );
      yield put(actions.searchCompanyCode(data.gridRowJson));
    } else if (action.payload.type === "workplaceCode") {
      const { data } = yield axios.get(
        "http://localhost:8282/hr/basicInfo/searchWorkplace.do",
        {
          params: {
            companyCode: action.payload.companyCode,
          },
        },
      );
      yield put(actions.searchWorkPlaceCode(data.gridRowJson));
    }
  } catch (error) {
    console.log("에러", error.response);
    action.payload.history.put("/error");
  }
}
/////////////////////// 유주 사가 시작 //////////////////////////////////////////////
function* positionListSaga(action) {
  try {
    const { data } = yield axios.get(
      "http://localhost:8282/hr/basicInfo/searchPosition.do",
    );
    yield put(PositionListSuccess(data.gridRowJson));
  } catch (e) {
    yield put(PositionListFailure(e.message));
  }
}

function* empDetailedSaga(action) {
  try {
    const { data } = yield axios.get(
      "http://localhost:8282/app/hr/emp/empDetail.do",
      {
        params: {
          company: action.payload.company,
          workPlace: action.payload.workPlace,
          position: action.payload.position,
          empName: action.payload.empName,
        },
      },
    );
    yield put(EmpDetailedInfoSuccess(data.gridRowJson));
  } catch (e) {
    yield put(EmpDetailedInfoFailure(e.message));
  }
}

function* empUpdateSaga(action) {
  try {
    const { data } = yield axios.get(
      "http://localhost:8282/app/hr/emp/empUpdate.do",
      {
        params: {
          empArray: action.payload.empArray,
        },
      },
    );
    yield put(EmpUpdateSuccess(data.gridRowJson));
  } catch (e) {
    yield put(EmpUpdateFailure(e.message));
  }
}
/////////////////////////////// 유주 사가 종료 /////////////////////////////////////////

////////////////////          지원 사가 시작 /////////////////////////////////////////////
function* salaryListSaga(action) {
  try {
    const { data } = yield axios({
      method: "get",
      url: "http://localhost:8282/hr/salary/findCloseSalary.do",
      params: {
        deptCode: action.payload.dept,
        applyYearMonth: action.payload.date,
      },
    });
    yield put(salaryListSuccess(data));
  } catch (e) {
    yield put(salaryListFailure(e.message));
  }
}

function* closeSalary(action) {
  try {
    yield axios({
      headers: { "Content-Type": "application/json" },
      method: "post",
      url: "http://localhost:8282/hr/salary/modifyMonthSalary",
      data: {
        empcode1: action.payload,
      },
    });
    yield put(closeSalaryWithSlipSuccess());
  } catch (e) {
    yield put(closeSalaryWithSlipFailure(e));
  }
}
////////////////////          지원 사가 종료                 /////////////////////////////////////////////

//===========================재영 월근태관리=======================//
function* monthAttd(action){
  try{
    if (action.type === types.SEARCH_MONTH_ATTD_LIST_REQUEST) {
      console.log("........................");
      console.log('dddddddd'+action.payload.cday);
      const { data } = yield call(() =>
       axios.get(
        "http://localhost:8282/hr/insa/attendance/monthAttendanceManage.do",{         
          params:{ 
            applyYearMonth: action.payload.cday,
          }
        }),
        );
      console.log(data);     
      yield put({ type: types.SEARCH_MONTH_ATTD_LIST_SUCCESS, data});
  }else if (action.type === types.MONTH_ATTD_LIST_UPDATE){
    console.log("update"+action.payload.monthAttdMgtList);
    yield axios.post(
      "http://localhost:8282/hr/insa/attendance/monthAttendanceClose.do",         
        { 
          monthAttdMgt: action.payload.monthAttdMgtList,          
        },
        { headers: { "Content-Type": "application/json" } },
      );
      yield put(actions.updateMonthAttdSuccess());
  } 
}catch(e) {
  yield put({ type: types.MONTH_ATTD_LIST_FAILURE, e });
}
}
//====================일근태관리 재영=============================//
function* dayAttd(action) {
  try {
    if (action.type === types.SEARCH_DAY_ATTD_LIST_REQUEST) {
      console.log("........................");
      console.log('dddddddd'+action.payload.cday);
      const { data } = yield call(() => 
      axios.get(
        "http://localhost:8282/hr/attendance/dayAttendanceManage",{         
          params:{ 
            applyDay: action.payload.cday,
          }
        }),
        );
      console.log(data);     
      yield put({ type: types.SEARCH_DAY_ATTD_LIST_SUCCESS, data});
    } else if (action.type === types.DAY_ATTD_LIST_UPDATE){
      console.log("update"+action.payload.dayAttdMgtList);
      yield call(() =>
       axios.post(
        "http://localhost:8282/hr/attendance/dayAttendanceManageUpdate",        
          { 
            dayAttdMgt: action.payload.dayAttdMgtList,  
          },
          { headers: { "Content-Type": "application/json" } },
        ),
        );
        yield put(actions.updateDayAttdListSuccess());
    } else if (action.type === types.SEARCH_DAY_ATTD_LIST_All) {
      const { data } = yield call(() =>
        axios.get(
          "http://localhost:8282/hr/attendance/dayAttendanceManageAll",
          {
            params: {
              startDate: action.data.startDate,
              endDate: action.data.endDate,
            },
          },
        ),
      );
      yield put({ type: types.SEARCH_DAY_ATTD_LIST_All_SUCCESS, data: data });
    } else if (action.type === types.DAY_ATTD_DEADLINE_REGISTER) {
      const { data } = yield call(() =>
        axios.put("http://localhost:8282/hr/attendance/dayDeadlineRegister", {
          DayAttdMgtToList: action.data.empData,
        }),
      );
      yield put({ type: types.DAY_ATTD_DEADLINE_REGISTER_SUCCESS, data: data });
    } else if (action.type === types.DAY_ATTD_DEADLINE_CANCEL) {
      const { data } = yield call(() =>
        axios.put("http://localhost:8282/hr/attendance/dayDeadlineCancel", {
          DayAttdMgtToList: action.data.empData,
        }),
      );
    } else if (action.type === types.SEARCH_RESTATTENDANCE_TYPE) {
      const { data } = yield call(() =>
        axios.get(
          "http://localhost:8282/hr/attendance/searchRestAttendanceType",
          {},
        ),
      );
    }
  } catch (e) {
    console.error(e.response);
    yield put({ type: types.SEARCH_DAY_ATTD_LIST_FAILURE, error: e });
    yield put({ type: types.SEARCH_DAY_ATTD_LIST_FAILURE, error: e });
    yield put({ type: types.DAY_ATTD_DEADLINE_REGISTER_FAILURE, error: e });
  }
}

//=끝~==========ㅇㅋㅋㅋ=========일근태관리 하인봉=====================끝=================일근태관리 하인봉======================================일근태관리 하인봉==================

//===========================================사원등록 성훈 시작=======================================//
function* divisionSaga(action) {
  try {
    if (action.type === types.SEARCH_DIVISION_CODE_REQUEST) {
      const { data } = yield call(() =>
        axios.get("http://localhost:8282/hr/basicInfo/searchDepartment.do", {
          params: {
            searchCondition: "WORKPLACE",
            workplaceCode: action.workplaceCode,
            companyCode: "COM-01",
          },
        }),
      );
      yield put({ type: types.SEARCH_DIVISION_CODE_SUCCESS, data: data });
    }
  } catch (e) {
    console.error(e);
    yield put({ type: types.SEARCH_DIVISION_CODE_FAILURE, error: e });
  }
}

function* registerEmp(action) {
  try {
    if (action.type === types.EMP_REGISTER_REQUEST) {
      yield call(() =>
        axios.post(
          "http://localhost:8282/hr/registEmployee.do",
          { insertEmp: action.data },
          { headers: { "Content-Type": "application/json" } },
        ),
      );
    }
  } catch (e) {
    console.log(e.response);
    yield put({ type: types.EMP_REGISTER_FAILURE });
  }
}
//===========================================사원등록 성훈 종료=======================================//

//=========================================일근태 관리 원구 시작====================================//
function* DayAttdSaga(action) {
  try {
    if (action.payload.type === "insert") {
      yield axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: "http://localhost:8282/hr/insa/attendance/dayAttendance",
        data: action.payload.dayAttd,
      })
        .then(response => {})
        .catch(e => {
          alert(e);
        });
      yield put(actions.insertDayAttdSuccess());
    }
  } catch (error) {
    yield put(actions.insertDayAttdFailure(error.message));
  }
}


//**************************************2020-08-25 손유찬 월마감 사가**************************************************
function* DayAttdSSaga(action) {
  console.log("DayAttdSSaga 발동2");
  try {
    if (action.payload.type === "select") {
      const { data } = yield axios.get(
        "http://localhost:8282/hr/insa/attendance/dayAttendance",
        {
          params: {
            empCode: action.payload.empCode,
            applyDay: action.payload.applyDay,
          },
        },
      );
      yield put(actions.selectDayAttdSuccess(data.DayAttdTO));
    }
  } catch (error) {
    yield put(actions.selectDayAttdFailure(error.message));
  }
}
//**************************************2020-08-25 손유찬 월마감 사가**************************************************


//=================================일근태 관리 원구 종료 ======================================//

export function* onSalaryReqeust() {
  yield takeLatest(types.SALARY_LIST_REQUEST, salaryListSaga);
}

export function* onCodeSearch() {
  yield takeEvery(types.SEARCH_CODE, codeSaga);
}

export function* oncloseSalaryRequest() {
  yield takeLatest(types.CLOSE_SALARY_WITH_SLIP_REQUEST, closeSalary);
}

export function* onManageATTD() {
  yield takeEvery(types.SEARCH_DAY_ATTD_LIST_REQUEST, dayAttd); //재영 일근태관리  
  yield takeLatest(types.DAY_ATTD_LIST_UPDATE, dayAttd);//재영 일근태관리

  yield takeLatest(types.SEARCH_DAY_ATTD_LIST_All, dayAttd); //하인봉 근태관리
  yield takeLatest(types.DAY_ATTD_DEADLINE_REGISTER, dayAttd); //하인봉 근태관리
  yield takeLatest(types.DAY_ATTD_DEADLINE_CANCEL, dayAttd); //하인봉 근태관리
  yield takeLatest(types.SEARCH_RESTATTENDANCE_TYPE, dayAttd); //하인봉 근태외관리 근태외구분 가져오기  
  
  yield takeLatest(types.SEARCH_MONTH_ATTD_LIST_REQUEST, monthAttd); //재영 월근태관리
  yield takeLatest(types.MONTH_ATTD_LIST_UPDATE, monthAttd); //재영 월근태관리
}

export function* onEMPRegist() {
  yield takeLatest(types.SEARCH_DIVISION_CODE_REQUEST, divisionSaga); //성훈 사원등록
  yield takeLatest(types.EMP_REGISTER_REQUEST, registerEmp);
}

export function* onPositionListRequest() {
  //유주 직급리스트(사원상세)
  yield takeLatest(types.POSITION_LIST_REQUEST, positionListSaga);
}

export function* onEmpDetailedInfoRequest() {
  //유주 사원상세정보검색(사원상세)
  yield takeLatest(types.EMPDETAILED_INFO_REQUEST, empDetailedSaga);
}

export function* onEmpUpdateRequest() {
  //유주 사원정보수정업데이트(사원상세)
  yield takeLatest(types.EMP_UPDATE_REQUEST, empUpdateSaga);
}
export function* onSearchCode() {
  yield takeLatest(types.SEARCH_CODE, codeSaga);
}
export function* onInsertDayAttd() {
  yield takeLatest(types.INSERT_DAY_ATTD_START, DayAttdSaga);
}
export function* onSelectDayAttd() {
  yield takeLatest(types.SELECT_DAY_ATTD_START, DayAttdSSaga);
}

export default function* HrSaga() {
  yield all([
    call(onSalaryReqeust), //월급여 조회 지원
    call(onCodeSearch),
    call(oncloseSalaryRequest), //월급여 마감 지원
    call(onManageATTD),
    call(onEMPRegist),
    call(onPositionListRequest), //유주
    call(onEmpDetailedInfoRequest), //유주
    call(onEmpUpdateRequest), //유주
    call(onInsertDayAttd), // 원구
    call(onSelectDayAttd), // 원구
  ]);
}
