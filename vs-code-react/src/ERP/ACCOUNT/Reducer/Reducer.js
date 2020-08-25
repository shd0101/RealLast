import * as types from "../ActionType/ActionType";

const initialState = {
  isLoading: false,
  slipList: [],
  journalList: [],
  approvalSlipList: [],
  approvalJournalList: [],
  accountList: [],
  customerList: [],
  journalFormList: [],
  error: "",
  periodNo: "",
  slipNo: "",
};

const AccReducer = (state = initialState, action) => {
  switch (action.type) {
    // 기수번호 조회
    case types.SEARCH_PERIOD_NO_SUCCESS:
      return {
        ...state,
        periodNo: action.data,
      };
    case types.SEARCH_PERIOD_NO_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 전표목록 조회
    case types.SEARCH_SLIP_SUCCESS:
      return {
        ...state,
        slipList: action.data,
      };
    case types.SEARCH_SLIP_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 분개목록 조회
    case types.SEARCH_JOURNAL_SUCCESS:
      return {
        ...state,
        journalList: action.data.journalList,
      };
    case types.SEARCH_JOURNAL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 계정과목 조회
    case types.SEARCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountList: action.data.accountList,
      };
    case types.SEARCH_ACCOUNT_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 거래처목록 조회
    case types.SEARCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        customerList: action.data,
      };
    case types.SEARCH_CUSTOMER_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 전표저장
    case types.ADD_SLIP_SUCCESS:
      return {
        ...state,
        slipNo: action.data.slipNo,
      };
    case types.ADD_SLIP_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    
    //전표승인 전표조회
    case types.SEARCH_AM_SLIP_SUCCESS:
        return {
          ...state,
          approvalSlipList: action.data,
        };
    case types.SEARCH_AM_SLIP_FAILURE:
        return {
        ...state,
        error: action.error,
      };
      //전표승인 분개조회
    case types.SEARCH_AM_JOURNAL_SUCCESS:
        return {
          ...state,
          approvalJournalList: action.data.journalList,
        };
    case types.SEARCH_AM_JOURNAL_FAILURE:
        return {
        ...state,
        error: action.error,
      };

    // 전표승인  (실패)
    case types.UPDATE_SLIP_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 분개장 조회
    case types.SEARCH_JOURNAL_FROM_SUCCESS:
      return {
        ...state,
        journalFormList: action.data,
      };
    case types.SEARCH_JOURNAL_FROM_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //재무상태표 조회
    case types.SEARCH_FINANCIAL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.SEARCH_FINANCIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        //data:action.data.financialList,
      };
    case types.SEARCH_FINANCIAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    //합계잔액시산표 조회
    case types.SEARCH_TOTALTRIAL_REQUEST:
      return {
        ...state,
      };
    case types.SEARCH_TOTALTRIAL_SUCCESS:
      return {
        ...state,
        //data:action.data.financialList,
      };
    case types.SEARCH_TOTALTRIAL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return { ...state };
  }
};

export default AccReducer;
