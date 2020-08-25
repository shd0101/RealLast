import * as types from "ERP/HR/ActionType/ActionType";

const initialState = {
  company: [],
  workPlace: [],
  attdData: [],
  monthAttdMgtList: [],
  salaryList: [],
  errorMsg: "",
  cday: "",
  name: "",
  dayAttdMgtList: [],
  departmentList: [],
  positionList: [],
  empDetailedInfo: [],
  flag: false,
};

const HrReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_COMPANY_CODE:
      return {
        ...state,
        company: action.payload,
      };

    case types.SEARCH_WORK_PLACE_CODE:
      return {
        ...state,
        workPlace: action.payload,
      };

    case types.INSERT_DAY_ATTD_SUCCESS:
      return {
        ...state,
      };
    case types.INSERT_DAY_ATTD_FAILURE:
      return {
        ...state,
      };
    case types.SELECT_DAY_ATTD_SUCCESS:
      return {
        ...state,
        attdData: action.payload,
      };
    case types.SELECT_DAY_ATTD_FAILURE:
      return {
        ...state,
      };

    case types.SALARY_LIST_SUCCESS:
      return {
        ...state,
        salaryList: action.payload.monthSalary.result,
      };

    case types.SALARY_LIST_FAILURE:
      return {
        ...state,
        errorMsg: action.payload,
      };

    case types.CLOSE_SALARY_WITH_SLIP_SUCCESS:
      return {
        ...state,
        salaryList: action.payload, //받을게 없지만 일단 넣었다.
        flag: true,
      };

    case types.CLOSE_SALARY_WITH_SLIP_FAILURE:
      return {
        ...state,
        errorMsg: action.payload,
      };

    case types.POSITION_LIST_SUCCESS:
      console.log("HR리듀서 POSITION_LIST_SUCCESS  ", action);
      return {
        ...state,
        positionList: action.payload,
      };

    case types.POSITION_LIST_FAILURE:
      return {
        ...state,
        errorMsg: action.payload,
      };

    case types.EMPDETAILED_INFO_SUCCESS:
      console.log("HR리듀서 EMPDETAILED_INFO_SUCCESS ", action);
      return {
        ...state,
        empDetailedInfo: action.payload,
      };

    case types.EMPDETAILED_INFO_FAILURE:
      return {
        ...state,
        errorMsg: action.payload,
      };
//==========================================재영 월근태관리===================================//
  case types.SEARCH_MONTH_ATTD_LIST_SUCCESS:
    return {
      ...state,
      monthAttdMgtList: action.data.monthAttdMgtList,
    };
  case types.MONTH_ATTD_LIST_UPDATE_SEUCCESS:
    return {
      ...state,
      monthAttdMgtList: [],
    }
  case types.MONTH_ATTD_LIST_FAILURE:
  return {
    ...state,
    errorMsg: action.e.errorMsg,
  }  
//==========================================재영 일근태관리===================================//   
     case types.SEARCH_DAY_ATTD_LIST_SUCCESS:
      console.log("........................");
      return {
        ...state,
        dayAttdMgtList: action.data.dayAttdMgtList,
        errorCode: action.data.errorCode,
      };
    case types.DAY_ATTD_LIST_UPDATE_SEUCCESS:
      console.log("update success");
      return {
        ...state,
        dayAttdMgtList: [], 
      };  
    case types.SEARCH_DAY_ATTD_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };
 //===================인봉=====================================일근태관리//===================인봉=====================================일근태관리
    case types.SEARCH_DAY_ATTD_LIST_All:
      return {
        ...state,
        startDate: action.data.startDate,
        endDate: action.data.endDate,
      };
    case types.SEARCH_DAY_ATTD_LIST_All_SUCCESS:
      return {
        ...state,
        dayAttdMgtList: action.data.dayAttdMgtList,
      };
    case types.SEARCH_DAY_ATTD_LIST_All_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case types.DAY_ATTD_DEADLINE_REGISTER:
      return {
        ...state,
        empCodeList: action.data.empCodeList,
        applyDayList: action.data.applyDayList,
      };
    case types.DAY_ATTD_DEADLINE_REGISTER_SUCCESS:
      return {
        ...state,
        dayAttdMgtList: action.data.dayAttdMgtList,
      };

    //===================인봉=====================================일근태관리 //===================인봉=====================================일근태관리

    //======================사원등록  성훈시작==========================================//
    case types.SEARCH_DIVISION_CODE_REQUEST:
      return {
        ...state,
        workplaceCode: action.workplaceCode,
      };

    case types.SEARCH_DIVISION_CODE_SUCCESS:
      return {
        ...state,
        departmentList: action.data.gridRowJson,
      };
    case types.SEARCH_DIVISION_CODE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
      
      //사원등록
    case types.EMP_REGISTER_REQUEST:
      return {
        ...state,
      };
    case types.EMP_REGISTER_SUCCESS:
      return {
        ...state,
      };
    case types.EMP_REGISTER_FAILURE:
      return {
        ...state,
      };

    //======================사원등록  성훈종료==========================================//
    default:
      return state;
  }
};

export default HrReducer;