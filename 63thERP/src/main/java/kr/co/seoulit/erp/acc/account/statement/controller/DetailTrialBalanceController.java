package kr.co.seoulit.erp.acc.account.statement.controller;

import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.seoulit.erp.acc.account.statement.serviceFacade.StatementServiceFacade;
import kr.co.seoulit.erp.acc.account.statement.to.DetailTrialBalanceBean;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class DetailTrialBalanceController  {
	@Autowired
    private StatementServiceFacade statementServiceFacade;
  

	//일(월)계표
    @RequestMapping(value="/statement/detailTrialBalance")
    public ArrayList<DetailTrialBalanceBean> handleRequestInternal(@RequestParam("fromDate")String fromDate,@RequestParam("toDate")String toDate) {
          
        return statementServiceFacade.getDetailTrialBalance(fromDate, toDate);
    }

}

