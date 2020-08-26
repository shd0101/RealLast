import { takeEvery, put, takeLatest } from "redux-saga/effects";
import accountApi from "Api/accountApi";
import hrApi from "Api/hrApi";
import * as types from "ERP/ACCOUNT/ActionType/ActionType";

function* searchPeriodNo(action) {
  try {
    const { data } = yield accountApi.get("/account/findPeriodNo", {
      params: {
        toDay: action.params.toDay,
      },
    });
    yield put({ type: types.SEARCH_PERIOD_NO_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_PERIOD_NO_FAILURE, error });
  }
}

function* searchSlipList(action) {
  try {
    const { data } = yield accountApi.get("/account/findRangedSlipList", {
      params: {
        startDate: action.params.startDate,
        endDate: action.params.endDate,
        slipStatus: action.params.slipStatus,
      },
    });
    yield put({ type: types.SEARCH_SLIP_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_SLIP_FAILURE, error });
  }
}

function* searchJournalList(action) {
  try {
    const { data } = yield accountApi.get("/account/findSingleJournalList", {
      params: {
        slipNo: action.params.slipNo,
      },
    });

    yield put({ type: types.SEARCH_JOURNAL_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_JOURNAL_FAILURE, error });
  }
}
function* searchAccountList(action) {
  try {
    const { data } = yield accountApi.get("/base/getAccountList", { //*** 2020-08-24 정대현 수정
      
    });

    yield put({ type: types.SEARCH_ACCOUNT_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_ACCOUNT_FAILURE, error });
  }
}

function* searchCustomerList(action) {
  try {
    const { data } = yield hrApi.get("/basicInfo/searchCustomer", {
      params: {
        searchCondition: action.params.searchCondition,
        workplaceCode: action.params.workplaceCode,
      },
    });

    yield put({ type: types.SEARCH_CUSTOMER_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_CUSTOMER_FAILURE, error });
  }
}

function* addSlip(action) {
  try {
    const { data } = yield accountApi.post(
      "/account/addSlip",
      action.params.batchArray,
    );

    yield put({ type: types.ADD_SLIP_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.ADD_SLIP_FAILURE, error });
  }
}

function* amSlipRequest(action) {
  try {
    const { data } = yield accountApi.get("/account/findRangedSlipList", {
      params: {
        startDate: action.params.startDate,
        endDate: action.params.endDate,
        slipStatus: action.params.slipStatus,
      },
    });
    yield put({ type: types.SEARCH_AM_SLIP_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_AM_SLIP_FAILURE, error });
  }
}

function* amJournalRequest(action) {
  try {
    const { data } = yield accountApi.get("/account/findSingleJournalList", {
      params: {
        slipNo: action.params.slipNo,
      },
    });

    yield put({ type: types.SEARCH_AM_JOURNAL_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_AM_JOURNAL_FAILURE, error });
  }
}

function* updateSlip(action) {
  try {
    yield accountApi.put("/account/approveSlip", {
      approvalData: action.params.approvalData,
    });
  } catch (error) {
    yield put({ type: types.UPDATE_SLIP_FAILURE, error });
  }
}

function* searchJournalFormList(action) {
  try {
    const { data } = yield accountApi.get("/account/journal", {
      params: {
        startDate: action.params.startDate,
        endDate: action.params.endDate,
      },
    });
    yield put({ type: types.SEARCH_JOURNAL_FROM_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_JOURNAL_FROM_FAILURE, error });
  }
}

function* searchFinancial(action) {
  try {
    const { data } = yield accountApi.get("/statement/getFinancialPosition", {
      params: {
        toDate: action.params.date,
      },
    });

    yield put({ type: types.SEARCH_FINANCIAL_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_FINANCIAL_FAILURE, error });
  }
}

function* searchTotalTrial(action) {
  try {
    const { data } = yield accountApi.get("/statement/getTotalTrialBalance", {
      params: {
        toDate: action.params.approvalDate,
      },
    });

    yield put({ type: types.SEARCH_TOTALTRIAL_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_TOTALTRIAL_FAILURE, error });
  }
}

//================================ 2020-08-24  손익계산서  조편백 시작 ====================================
function* searchIncomeList(action) {
  console.log("/////" + JSON.stringify(action));
  try {
    const { data } = yield accountApi.get("/statement/incomeStatement", {
      params: {
        toDate: action.params.date,
      },
    });

    yield put({ type: types.SEARCH_INCOME_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_INCOME_FAILURE, error });
  }
}
//================================ 2020-08-24  손익계산서 조편백 끝 ====================================

//********************************** 2020-08-24 정대현 추가 **********************************
function* searchCashJournalList(action) {
  try {
    const { data } = yield accountApi.get("/statement/cashJournal", {
      params: {
        fromDate: action.params.fromDate,
        toDate: action.params.toDate,
      },
    });

    yield put({ type: types.SEARCH_CASHJOURNAL_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_CASHJOURNAL_FAILURE, error });
  }
}
//********************************** 2020-08-24 정대현 추가 여기까지**********************************

//********************************** 2020-08-24 김진호 추가 **********************************
//일(월)계표
function* searchDetailTrial(action) {
  try {
    const { data } = yield accountApi.get("/statement/detailTrialBalance", {
      params: {
        fromDate: action.params.fromDate,
        toDate: action.params.toDate,
      },
    });

    yield put({ type: types.SEARCH_DETAILTRIAL_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.SEARCH_DETAILTRIAL_FAILURE, error });
  }
}
//********************************** 2020-08-24 김진호 끝 **********************************

export default function* AccSaga() {
  yield takeLatest(types.SEARCH_PERIOD_NO_REQUEST, searchPeriodNo);
  yield takeLatest(types.SEARCH_SLIP_REQUEST, searchSlipList);
  yield takeLatest(types.SEARCH_JOURNAL_REQUEST, searchJournalList);
  yield takeLatest(types.SEARCH_ACCOUNT_REQUEST, searchAccountList);
  yield takeLatest(types.ADD_SLIP_REQUEST, addSlip);
  yield takeLatest(types.SEARCH_AM_SLIP_REQUEST, amSlipRequest);
  yield takeLatest(types.SEARCH_AM_JOURNAL_REQUEST, amJournalRequest);
  yield takeLatest(types.UPDATE_SLIP_REQUEST, updateSlip);
  yield takeLatest(types.SEARCH_JOURNAL_FROM_REQUEST, searchJournalFormList);
  yield takeLatest(types.SEARCH_CUSTOMER_REQUEST, searchCustomerList);
  yield takeEvery(types.SEARCH_FINANCIAL_REQUEST, searchFinancial);
  yield takeEvery(types.SEARCH_TOTALTRIAL_REQUEST, searchTotalTrial);
  yield takeEvery(types.SEARCH_INCOME_REQUEST, searchIncomeList); //<------------ 2020-08-24 손익계산서 조편백
  yield takeLatest(types.SEARCH_CASHJOURNAL_REQUEST, searchCashJournalList); //*********** 2020-08-24 정대현 추가 **********
  yield takeLatest(types.SEARCH_DETAILTRIAL_REQUEST, searchDetailTrial); // 일(월)계표 2020-08-24 김진호 추가
}
