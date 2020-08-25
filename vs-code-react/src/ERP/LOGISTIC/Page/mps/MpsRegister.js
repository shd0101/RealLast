import React, { useState } from 'react';
import MpsContractGrid from 'ERP/LOGISTIC/Page/mps/MpsContractGrid';
import MpsSearchContract from 'ERP/LOGISTIC/Page/mps/MpsSearchContract';
import MpsGrid from 'ERP/LOGISTIC/Page/mps/MpsGrid';

import { Button } from "@material-ui/core";



const MpsRegister = () => {
    // const [date, setDate] = useState({
    //    title: "기간조회",
    //    fromDate: '0',
    //    toDate: '0'
    // });

    const [gridData, setGridData] = useState({
        columDefs: [
            { headerName: '', checkboxSelection: true, width: 70, headerCheckboxSelection: true },
            { headerName: "수주상세일련번호", field: "contractDetailNo", minWidth: 130 },
            { headerName: "수주일련번호", field: "contractNo", minWidth: 110 },
            { headerName: "품목코드", field: "itemCode", editable: true, minWidth: 70 },
            { headerName: "품목명", field: "itemName", minWidth: 140 },
            { headerName: "단위", field: "unitOfContract", minWidth: 60 },
            { headerName: "납기일", field: "dueDateOfContract", minWidth: 80 },
            { headerName: "수량", field: "estimateAmount", minWidth: 60 },
            { headerName: "보유수량", field: "unitPriceOfContract", minWidth: 70, hide: true },//hide
            { headerName: "생산예정수량", field: "productionRequirement", minWidth: 90, hide: true },//hide
            { headerName: "단가", field: "unitPriceOfContract", minWidth: 70 },
            { headerName: "합계액", field: "sumPriceOfContract", minWidth: 90 },
            { headerName: "MPS적용여부", field: "operationCompletedStatus", minWidth: 30 },
            { headerName: "납품여부", field: "deliveryCompletionStatus", minWidth: 30 }
        ],
        rowData: "",
        getUrl: 'http://localhost:8282/app/logi/production/searchMpsInfo.do',

    });

    const [mpsGridData, setMpsGridData] = useState({
        columnDefs: [
            //{ headerName: '#', checkboxSelection: true, width: 100, headerCheckboxSelection: true },
            { headerName: "주생산계획번호", field: "mpsNo", minWidth: 130 },
            { headerName: "주생산계획근거", field: "mpsPlanClassification", minWidth: 130, hide: true },
            { headerName: "수주상세일련번호", field: "contractDetailNo", minWidth: 110 },
            { headerName: "품목코드", field: "itemCode", editable: true, minWidth: 70 },
            { headerName: "품목명", field: "itemName", minWidth: 140 },
            { headerName: "단위", field: "unitOfMps", minWidth: 60 },
            { headerName: "계획일자", field: "mpsPlanDate", minWidth: 80 },
            { headerName: "계획수량", field: "mpsPlanAmount", minWidth: 60 },
            { headerName: "납기일", field: "dueDateOfMps", minWidth: 70 },
            { headerName: "예정마감일자", field: "scheduledEndDate", minWidth: 90 },
            { headerName: "MPS적용여부", field: "mrpApplyStatus", minWidth: 30 }
        ],
        mpsRowData: '',
        putUrl: '/logi/production/registerMps'
    });
    console.log(mpsGridData);

    return (
        <React.Fragment>
            <MpsSearchContract
                gridData={gridData}
                setGridData={setGridData}
            />
            <MpsContractGrid
                gridData={gridData}
                mpsGridData={mpsGridData}
                setMpsGridData={setMpsGridData}
            />
            <MpsGrid mpsGridData={mpsGridData} setMpsGridData={setMpsGridData} />
        </React.Fragment>
    );
}

export default MpsRegister;
