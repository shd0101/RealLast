import React, { useState } from "react";
import { Button, TextField, makeStyles, Typography, Select, MenuItem} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import axios from "axios";
/*#####################################  2020-08-24 #######################################*/
/*###################################### 63기 김태윤 #######################################*/
/*####################################### 납품 수정#########################################*/
const useStyles = makeStyles(theme => ({  
  btnSearch: {
    fontSize: "1.3rem",
    backgroundColor: "rosybrown",
    color: "white",
    fontWeight: "bold",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    width: "20%",
    height: "20%",
  },
  labelStyle: {
    color: "gray",
    padding: theme.spacing(2),
  },
  cal: {
    padding: theme.spacing(2),
  },
  end: {
    padding: theme.spacing(2),
  },
  hrStyle: {
    opacity: "0.4",
  },
  name: {
    color: "dimGray",
    fontWeight: "600",
    fontSize: "20px",
  },
}));

const gridFrameStyle = {
  height: "300px",
  width: "98%",
  backgroundColor: "gainsboro",
};

const gridStyle = {
  width: "98%",
  height: "70vh",
  backgroundColor: "whiteSmoke",
};

const headerName = [
  { headerName: "수주일련번호", field: "contractNo", width: 150 },
  { headerName: "견적일련번호", field: "estimateNo", width: 150 },  
  { headerName: "수주유형분류", field: "contractTypeName", width: 150},
  { headerName: "거래처코드", field: "customerCode", width: 150 },
  { headerName: "거래처명", field: "customerName", width: 150 },
  { headerName: "견적일자", field: "estimateDate", width: 150},
  { headerName: "수주일자", field: "contractDate", width: 150 },
  { headerName: "수주요청자", field: "contractRequester", width: 150, editable: true },
  { headerName: "수주담당자명", field: "empNameInCharge", width: 150 },
  { headerName: "비고", field: "description", width: 150 },
  { headerName: "contractType", field: "contractType", width: 150 },
  { headerName: "personCodeInCharge", field: "personCodeInCharge", width: 150 },
  { headerName: "납품완료여부", field: "deliveryCompletionStatus", width: 150 },
];

const deliveryDetailName = [
  { headerName: " ", width: 30,  },
  { headerName: "수주상세일련번호", field: "contractDetailNo", width: 130 },
  { headerName: "수주일련번호", field: "contractNo", width: 130 },
  { headerName: "품목코드", field: "itemCode", width: 130 },
  { headerName: "품목명", field: "itemName",  width: 130 },
  { headerName: "단위", field: "unitOfContract", width: 130 },
  { headerName: "납기일", field: "dueDateOfContract", width: 130 },
  { headerName: "견적수량", field: "estimateAmount", width: 130 },
  { headerName: "재고사용량", field: "stockAmountUse", width: 130 },
  { headerName: "필요제작수량", field: "productionRequirement", width: 130 },
  { headerName: "단가", field: "unitPriceOfContract", width: 130 },
  { headerName: "합계액", field: "sumPriceOfContract", width: 130 },
  { headerName: "처리상태", field: "processingStatus", width: 130 },
  { headerName: "작업완료여부", field: "operationCompletedStatus", width: 130 },
  { headerName: "납품완료여부", field: "deliveryCompletionStatus", width: 130 },
  { headerName: "비고", field: "description", width: 130 },
];

const DeliveryInfo = () => {
  const classes = useStyles();
  const single = "single";

  const [deliveryGridApi, setDeliveryGridApi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rowData, setRowData] = useState("");
  const [rowDetailData, setRowDetailData] = useState("");
  const [formVisible, setFormVisible] = useState(true);
  const [searchCondition, setSearchCondition] = useState("searchByDate");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
      setOpen(false);
  }
  const handleOpen = () => {
      setOpen(true);
  }
  
  
  const handleChange = e => {
      if(e.target.value==="searchByDate"){ setFormVisible(true); }
      else{ setFormVisible(false); } 
      setSearchCondition(e.target.value);
  }
 
  function gridReady(params) {
    console.log("----- gridReady() 호출 -----");

    setDeliveryGridApi(params.api);
    console.log("deliveryGridApi >>>", deliveryGridApi);
    return deliveryGridApi;
  }

  const startDateChange = e => {
    //  console.log("startDateChange() 호출 - e.target.value -->", e.target.value);

    setStartDate(e.target.value);
  };
  console.log("시작날짜>>", startDate);

  const endDateChange = e => {
    // console.log("endDateChange()호출 - e.target.value -->", e.target.value);

    setEndDate(e.target.value);
  };
  console.log("종료날짜>>", endDate);

  // ------------------------ 수주검색------------------------------
  const searchDelivery= e => {
    let startd = startDate;
    let endd = endDate;
    if (startd && endd === "") {
      alert("날짜를 입력해 주세요");
      return;
    }
    let url = "http://localhost:8282/logi/logistics/sales/searchDeliverableContractList";

    const getData = async () =>
      await axios({
        method: "POST",
        url: url,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },//"searchByDate"  
        params: { startDate: startd, endDate: endd,  searchCondition : searchCondition , customerCode : "PTN-01"},
      });

    getData()
      .then(response => {
        console.log(
          "axios동작해서 나온 response.data ---> ",
          response.data.gridRowJson,
        );

        setRowData(response.data.gridRowJson);
        setRowDetailData();
      })
      .catch(e => {
        console.log("납품조회하다가 발생한 에러 >> ", e);
      });
  };

  const rowClicked = e => {
    console.log("======= 납품 상세 나오나 ========");
    console.log("해당 번호 :: e >>> ", e);

    setRowDetailData(rowData[e.rowIndex].contractDetailTOList);
  };


  const detailRowClicked= e => {
    
    if (e.data.contractNo === "") {

    }
  };
  return (  
    <>
      <div className="contract_header">
        <div id="deliveryPage" className={classes.cal} >
            <Select
              name="searchCondition"
              open={open}
              value={searchCondition}
              onClose={handleClose}
              onOpen={handleOpen}
              onChange={handleChange}
            >

              <MenuItem value="searchByDate">기간 검색</MenuItem>
              <MenuItem value="searchByCustomer">거래처 검색</MenuItem>
            </Select>
          <form name="searchDate" hidden={!formVisible}>
          <tr>
            <td width="200">
              <div>
              <Typography className={classes.labelStyle}>시작일</Typography> 
              <TextField
                id={"startDate"}
                type="date"
                value={startDate}
                onChange={startDateChange}
                rowSelection={single}
              ></TextField>
              </div>
            </td>
            <td width="200">
             <div>
              <Typography className={classes.labelStyle}>종료일</Typography>
              <TextField
                id={"endDate"}
                type="date"
                value={endDate}
                onChange={endDateChange}
              ></TextField>
              </div>
            </td>
          </tr>
          </form >
          <form name="searchCompany" hidden={formVisible}>
          <TextField
              value="PTN-01"
              rowSelection={single}
              placeholder="회사코드"
          ></TextField>
          <Button
              size= "large"
              color="grey"
   //          onClick={() => handleClickOpen("companyCode")}
            >거래처 조회</Button>  
          </form>
        </div>
        &nbsp;&nbsp;
        <Button className={classes.btnSearch} onClick={searchDelivery}>
          납품 가능 수주 조회
        </Button>
      </div>
      <br />
      <hr className={classes.hrStyle} />
      <div className="contract_body">
        <br />
        <Typography className={classes.name}>납품 가능 수주 리스트</Typography>
        <br />
        <div className={"ag-theme-material"} style={gridFrameStyle}>
          <AgGridReact
            onGridReady={gridReady}
            columnDefs={headerName}
            style={gridStyle}
            rowSelection={single}
            onRowClicked={rowClicked}
            rowData={rowData}
            target={this}
          />
        </div>
        <br />
        <hr className={classes.hrStyle} />
        <br />
        <Typography className={classes.name}>납품 가능 수주리스트 상세</Typography>
        <br />
        <hr className={classes.hrStyle} />
        <div className={"ag-theme-material"} style={gridFrameStyle}>
          <AgGridReact
            onGridReady={gridReady}
            columnDefs={deliveryDetailName}
            style={gridStyle}
            rowSelection={single}
            onRowClicked={detailRowClicked}
            rowData={rowDetailData}
          />
        </div>
      </div>
    </>
  );
};

export default DeliveryInfo;
/*####################################### 납품 수정끝#######################################*/