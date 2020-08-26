//============================= 2020.08.24 양지훈 수정 =============================
import React, { useState } from "react";
import { Button, Paper, AppBar, Toolbar, Typography, TextField, makeStyles} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        fontSize: 16,
      },
    },
}));

//견적 그리드 columns
const esColumns = [
    { headerName: "거래처코드", field: "customerCode", width: 150, hide:true },
    { headerName: "거래처명", field: "customerName", width: 150 },
    { headerName: "견적일자", field: "estimateDate", width: 150 },
    { headerName: "유효일자", field: "effectiveDate", width: 150 },
    { headerName: "견적담당자", field: "personCodeInCharge", width: 150 },
    { headerName: "견적요청자", field: "estimateRequester", width: 150, editable: true },
    { headerName: "비고", field: "description", width: 150, editable: true },
    { headerName: "CRUD상태", field: "status", width: 150 }, //기존에 Status 였음.
];

// 견적 상세 그리드 Columns
const esDetailColumns = [
    //please checked setting
    { headerName: "품목코드", field: "itemCode", width: 150 },
    { headerName: "품목명", field: "itemName", width: 150 },
    { headerName: "단위", field: "unitOfEstimate", width: 150 },
    { headerName: "견적요청일(납기일)", field: "dueDateOfEstimate", width: 150 },
    { headerName: "견적수량", field: "estimateAmount", width: 150 },
    { headerName: "견적단가", field: "unitPriceOfEstimate", width: 150 },
    { headerName: "합계액", field: "sumPriceOfEstimate", width: 150 },
    { headerName: "비고", field: "description", width: 150 },
];

//modal window content Head
const commColumnDefs = [
    { headerName: "상 세 코 드 번 호", field: "detailCode", width: 100, },
    { headerName: "상 세 코 드 이 름", field: "detailCodeName", width: 100, },
    { headerName: "사 용 여 부", field: "codeUseCheck", width: 100, }
];

const EsRegister = () => {
    // 스타일 적용하기
    const classes = useStyles();

    // 견적담당자 이름
    const sessionId = sessionStorage.getItem('empNameInfo_token');

    // 견적 그리드 상태 변경
    const [esPositionGridApi, setEsPositionGridApi] = useState('');
    // 견적상세 그리드 상태 변경
    const [esDetailPositionGridApi, setEsDetailPositionGridApi] = useState('');
    // 견적추가 가 한번만 되게 해놓은 true/false;
    const [esFlag, setEsFlag] = useState(true);
    // modal window true: 보이기/ false: 가리기
    const [openEs, setOpenEs] =useState(false);
    // modal 화면에 보여질 grid data
    const [codeList, setCodeList] = useState([]);
    // 공통 모달 그리드 상태 변경
    const [commModalGridApi,setCommModalGridApi] = useState('');
    // 견적 그리드 rows
    const [esList, setEsList] = useState([]);
    // 견적 그리드 모달 달력
    const [calendarModal, setCalendarModal] =  useState(false);

    // 모달의 그리드 api
    const onModaGridReady = params => {
        console.log('commModalGridApi',params.api);
        setCommModalGridApi(params.api);
        params.api.sizeColumnsToFit();
    };
    // 견적 그리드 api
    const onGridReady = params => {
        console.log('esPositionGridApi',params.api);
        setEsPositionGridApi(params.api);
        params.api.sizeColumnsToFit();
    };
    // 견적상세 그리드 api
    const onGridReady2 = params => {
        console.log('esDetailPositionGridApi',params.api);
        setEsDetailPositionGridApi(params.api);
        params.api.sizeColumnsToFit();
    };

    // leadingZeros는 자릿수를 맞추기 위한 펑션임.
    const leadingZeros =(date, digits) => {
        let zero = '';
        date = date.toString();
        if (date.length < digits) {
            for (let i = 0; i < digits - date.length; i++)
                zero += '0';
        };
        return zero + date;
    };
    // 견적등록일자 오늘 날짜 기본 선택;
    let now = new Date();
    let year = now.getFullYear();
    let month = leadingZeros(now.getMonth() + 1, 2);
    let date = leadingZeros(now.getDate(), 2);
    let today = year + '-' + month + '-' + date;

    // 견적추가버튼
    const esInsertBtn = () => {
        const dateVal = document.getElementsByName('addEsDate')[0].value;
        if(!esFlag) {
            alert('등록중인 견적이 존재합니다');
            return;
        }else if(esFlag){
            let newRow = {
                customerCode: 'open modal',
                customerName: 'open modal',
                estimateDate: dateVal,
                effectiveDate: 'datepicker',
                personCodeInCharge: sessionId,
                estimateRequester: 'edittable',
                description: 'edittable',
                status: 'N',
            };
            setEsList([
                ...esList,
                newRow,
            ]);
            // esPositionGridApi.updateRowData({ add: [esList] });
            setEsFlag(false);
        };
    };

    //견적 그리드 cell click event (===handleClickOpen)
    const onEsCellClick = async (e) => {
        // column name
        let colName= e.colDef.field;
        console.log('cell click event', colName);
        //거래처 검색
        if (colName === 'customerName') {
            //modal open
            setOpenEs(true);
            try {
                await axios.get(
                    'http://localhost:8282/logi/base/codeList.do',
                    { params: { divisionCode: 'CL-01' }, },
                ).then( response => {
                    const jsonData = response.data.detailCodeList; // return array;
                    setCodeList(jsonData);// data 불변성 적용해야 한다.!!!!!!!!!!!!!!!!!!!!
                });
            } catch (e) {
                console.log(e);
            }
        //유효일자 편집
        } else if (colName === 'effectiveDate') {
            setCalendarModal(true);
        };
    };
    // 모달창 cell value click; useEffect 적용하기
    const handleClose = event => {
        setOpenEs(false);
        const commValueData = event.data;
        // 거래처명일 때, 품목명일 때 조건문 만들기;
        console.log('거래처명일 때, 품목명일 때 구분하기',event);
        const divisionCodeNo=commValueData.divisionCodeNo;
        console.log('거래처명일 때, 품목명일 때 구분하기',divisionCodeNo);

        // 거래처 data를 가져왔을 때;
        if(commValueData.divisionCodeNo === "CL-01"){
            let customerToUpdate = [];
            esPositionGridApi.forEachNodeAfterFilterAndSort((rowNode) => {
                let data = rowNode.data;
                data.customerCode = commValueData.detailCode;
                data.customerName = commValueData.detailCodeName;
                customerToUpdate.push(data);
            });
            esPositionGridApi.updateRowData({ update: customerToUpdate }); //  update == only array data
            // console.log('#############모달창 cell value Click', ', detailCodeName::: ', commValueData.detailCodeName,
            //                                                     ', detailCodeNo::: ', commValueData.detailCode,
            //                                                     ', divisionCodeNo::: ', commValueData.divisionCodeNo,
            //                                                     ', codeUseCheck::: ', commValueData.codeUseCheck);      
            // console.log(':::: commValueData ::::', commValueData);
            // console.log(':::: commModalGridApi ::::',commModalGridApi.getSelectedRows());
            // console.log('::: esPositionGridApi :::',esPositionGridApi.getSelectedRows());
            // console.log('::: esPositionGridApi :::',esPositionGridApi);
            // console.log('::: esList :::',esList);
            // esPositionGridApi.forEachNodeAfterFilterAndSort((rowNode, index) => {
            //     console.log('::: index :::',index);
            //     console.log('::: rowNode :::',rowNode.data);
            // });
            // commModalGridApi.forEachNodeAfterFilterAndSort((rowNode, index) => {
            //     console.log('::: index2 :::',index);
            //     console.log('::: rowNode2 :::',rowNode.data);
            // });
        
        // divisionCodeNo: "IT-CI"
        } else if (commValueData.divisionCodeNo.indexOf("IT") !== -1) {
            alert("Find!");
            let itemToUpdate = [];
            esDetailPositionGridApi.forEachNodeAfterFilterAndSort((rowNode) => {
                let data = rowNode.data;
                data.itemCode = commValueData.detailCode;
                data.itemName = commValueData.detailCodeName;
                itemToUpdate.push(data);
            });
            esDetailPositionGridApi.updateRowData({ update: itemToUpdate }); //  update == only array data
        };
    };
    // 거래처모달창 닫기버튼
    const closeEsDialog = () => {
        setOpenEs(false);
        // 모달창 닫을 때 내부 데이터 화면에서 지우기 구현해야 함;
    };
    // 모달달력 수정할 때;
    const modalCalendarOnChange = event => {
        setCalendarModal(false);
        const dateValue = event.target.value;
        let date = [];
        esPositionGridApi.forEachNodeAfterFilterAndSort((rowNode) => {
            let nodeData = rowNode.data;
            nodeData.effectiveDate = dateValue;
            date.push(nodeData);
        });
        esPositionGridApi.updateRowData({ update: date });
    };
    // 유효일자 모달창 닫기 버튼
    const closeCalendarDialog = () => {
        setCalendarModal(false);
    };

    /////////////////////////////////////////===========================================/////////////////////////////////////////

    //견적상세추가 버튼
    const esDetailInsertBtn = () => {
        const esRow = esPositionGridApi.getSelectedRows().length;
        console.log('::: length :::',esRow);
        console.log('::: length :::',esPositionGridApi.getSelectedRows());
        if(esRow === 0){
            alert('견적을 먼저 추가해주세요;');
            return;
        };
        // 견적 행이 있을 때 처리
        let newRow = {
            itemCode: 'open modal',
            itemName: 'open modal',
            unitOfEstimate: 'open modal',
            dueDateOfEstimate: 'datePicker',
            estimateAmount: 'open modal',
            unitPriceOfEstimate: 'db',
            sumPriceOfEstimate: 'open modal',
            description: 'edittable',
        };
        esDetailPositionGridApi.updateRowData({ add: [newRow] });
    };
    //견적상세 셀 클릭
    const onEsDetailCellClick = async (e) => {

        //const [codeList, setCodeList] = useState([]);

        const colName= e.colDef.field;
        console.log('::: Estimate Detail cell click event :::', colName);
        switch (colName) {
            case 'itemName' :
                console.log('itemName::: 아이템코드는 히든으로 만들자!');
                 //modal open
                setOpenEs(true);
                try {
                    await axios.get(
                        'http://localhost:8282/logi/base/codeList.do',
                        { params: { divisionCode: 'IT-_I' }, },
                    ).then( response => {
                        const jsonData = response.data.detailCodeList; // return array;
                        console.log('itemName::: 아이템코드는 히든', jsonData);
                        setCodeList(jsonData);// data 불변성 적용해야 한다.!!!!!!!!!!!!!!!!!!!!
                    });
                } catch (e) {
                    console.log(e);
                }
                break;
            default:
                break;
        };
    };


    // const onEsCellClick = async (e) => {
    //     // column name
    //     let colName= e.colDef.field;
    //     console.log('cell click event', colName);
    //     //거래처 검색
    //     if (colName === 'customerName') {
    //         //modal open
    //         setOpenEs(true);
    //         try {
    //             await axios.get(
    //                 'http://localhost:8282/logi/base/codeList.do',
    //                 { params: { divisionCode: 'CL-01' }, },
    //             ).then( response => {
    //                 const jsonData = response.data.detailCodeList; // return array;
    //                 setCodeList(jsonData);// data 불변성 적용해야 한다.!!!!!!!!!!!!!!!!!!!!
    //             });
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     //유효일자 편집
    //     } else if (colName === 'effectiveDate') {
    //         setCalendarModal(true);
    //     };
    // };

    // 일괄저장버튼
    const batchProcess = () => {
        console.log('일괄저장버튼');
    };

    return (
        <>
            <h1>견 적 등 록</h1>
            <hr/>
            <div  align="right">
                <fieldset name='addEstimate' align='center'>
                    <legend>
                        <strong>견적등록일자</strong>
                    </legend>                  {/* onChange : 값이 변경되면 콜백이 발생. */}
                    <TextField name="addEsDate" type={"date"} defaultValue={today} //ref={useReference} onChange={onDateChange}
                    />
                </fieldset>
            </div>
            <br/>
            <Paper>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h5'>견 적</Typography>
                        <div className={classes.root}>
                            <Button variant="contained" color="secondary" size="large" onClick={esInsertBtn}
                            >견적추가</Button>
                            <Button variant="contained" color="secondary" size="large" onClick={batchProcess}
                            >견적일괄저장</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={"ag-theme-balham"} style={{ height: "100px", width: "100%", textAlign: 'center', paddingTop: "0px" }} >
                    <AgGridReact
                                columnDefs={esColumns}
                                rowData={esList}
                                rowSelection='single'
                                onGridReady={onGridReady}
                                onCellClicked={onEsCellClick} />
                </div>
                <hr/>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h5'>견 적 상 세</Typography>
                        <div className={classes.root}>
                            <Button variant="contained" color="secondary" size="large" onClick={esDetailInsertBtn}
                                >견적상세추가</Button>
                            <Button variant="contained" color="secondary" size="large" //onClick={searchEs}
                            >체크한견적상세삭제</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={"ag-theme-balham"} style={{ height: "200px", width: "100%", textAlign: 'center', paddingTop: "0px" }} >
                <AgGridReact
                    columnDefs={esDetailColumns}
                    // rowData={data}
                    rowSelection='single'
                    onGridReady={onGridReady2}
                    onCellClicked={onEsDetailCellClick}
                />
                </div>
            </Paper>
            {/* {견적 - 거래처명},{견적상세 - 품목명} - agrid dialog; */}
            <div>
                <Dialog open={openEs} onClose={closeEsDialog} fullWidth={true} maxWidth={'xs'}>
                    <DialogTitle id="simple-dialog-title">회 사 목 록</DialogTitle>
                    <DialogContent>
                        <List>
                            <div className={"ag-theme-balham"}
                                style={{ height: "300px", width: "100%", paddingTop: "8px" }}>
                                <AgGridReact
                                    columnDefs={commColumnDefs}
                                    rowData={codeList}   // 뿌릴 data
                                    rowSelection='single'  // 하나만 선택 가능.
                                    onGridReady={onModaGridReady}
                                    onCellClicked={handleClose}  // cell을 클릭하면, handleClose가 실행된다.
                                />
                            </div>
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={closeEsDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            {/* 견적 - 유효일자 - date dialog */}
            <div>
                <Dialog open={calendarModal} onClose={closeCalendarDialog} fullWidth={true} maxWidth={'xs'}>
                    <div>
                    <DialogTitle id="simple-dialog-title">일 자</DialogTitle>
                    </div>
                    <DialogContent align='center'>
                    <TextField name="addEsDate" type={"date"} onChange={modalCalendarOnChange}></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={closeCalendarDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default EsRegister;
//========================================== 2020.08.24 양지훈 수정 ================================================