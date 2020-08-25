//**************************2020-08-20 63기 손유찬 ********************************* 

import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Button from "@material-ui/core/Button";
import { FormControl,AppBar,Toolbar,Typography,} from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";


const BaseExtSalManage = () => {
  
  const [dataList, setDataList] = useState([]);
  const [data, setData] = useState("");
  const [gridEvent, setGridEvent] = useState();

  useEffect(() => {
    axios
      .get(
        "http://localhost:8282/hr/salary/baseExtSalManage.do",
        
      )
      .then(response => {
        console.log("리스펀스 ", response);
        setDataList(response.data.baseExtSalList);
        console.log(dataList);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const onRowSelected = event => {

      let list = [];
      list.push(event.api.getSelectedRows());
      setData(list[0]);
      console.log("온셀로우 이벤트 "+ data + list[0]);
    
  };


/* 
  const onUpdate = event => {
    event.api.setRowData(dataList)
    const selectedNodes = event.Api.getSelectedRows()
   // const selectedData = selectedNodes.map( node => node.data )
   // const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
  //  alert("Selected nodes:"+selectedDataStringPresentation)
  };
 */
  

  //AG 그리드의 헤드
  const state = {
    columnDefs: [
      { headerName: "코드", field: "extSalCode", },
      { headerName: "이름", field: "extSalName", editable:true},
      { headerName: "배수", field: "ratio", editable:true},

    ],
    rowData: dataList,
  };


  return (
    console.log("콘솔임", dataList),
    (
      <div>
          <div>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h5">초과수당관리</Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div>
        <FormControl style={{ minWidth: "410px" }}></FormControl>
        <FormControl style={{ minWidth: "200px" }}>
            
          </FormControl>
        </div>
        <br />
        <div
          className="ag-theme-balham"
          style={{
            height: "600px",
            width: "600px",
            textAlign:"center"
          }}
        >
         <AgGridReact
            columnDefs={state.columnDefs}
            rowData={state.rowData}
            onCellEditingStopped={onRowSelected}
            onGridReady={event => {
              event.api.sizeColumnsToFit();
              setGridEvent(event);
            }}
          ></AgGridReact>
        </div>
        <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onRowSelected}
        startIcon={<InputIcon />}
      >
        수정
      </Button>
      </div>
    )
  );
};
export default BaseExtSalManage;

//**************************2020-08-20 63기 손유찬 ********************************* 
