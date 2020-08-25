import React from "react";
import EstimateRegister from "./EstimateRegister";
import EstimateRegisterDetail from "./EstimateRegisterDetail";
import { connect } from "react-redux";

import { dialogData } from "ERP/LOGISTIC/Action/Action";
import { amoutpriceData } from "ERP/LOGISTIC/Action/Action";
import { withRouter } from "react-router-dom";


const EstimateRegisterContainer = props => {

    const { dialogData, DialogData, amoutpriceData, standardUnitPrice } = props;
    return (
        <div>
            <EstimateRegister dialogData={dialogData} DialogData={DialogData} />
            <EstimateRegisterDetail dialogData={dialogData} itemRowData={DialogData} amoutpriceData={amoutpriceData} standardUnitPrice={standardUnitPrice} />

        </div>
    );
};

const mapStateToProps = state => {
    return {
        DialogData: state.LOGIReducer.DialogData,
        standardUnitPrice: state.LOGIReducer.standardUnitPrice,
    };
};
export default connect(mapStateToProps, { dialogData, amoutpriceData })(
    withRouter(EstimateRegisterContainer),
);
