package kr.co.seoulit.erp.acc.account.statement.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.seoulit.erp.acc.account.statement.serviceFacade.StatementServiceFacade;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class FinancialPositionController {
    @Autowired
	private StatementServiceFacade statementServiceFacade;
  
    @RequestMapping(value="/statement/getFinancialPosition", method = RequestMethod.GET)
    public HashMap<String, Object> getFinancialPosition(@RequestParam("toDate")String toDate){
    
     return statementServiceFacade.getFinancialPosition(toDate);
    }
    
    
    @RequestMapping(value="/statement/addearlystatements", method = RequestMethod.POST)
	public void addearlystatements(@RequestParam("toDate")String toDate) {
		
          //  HashMap<String, Object> financialPosition = statementServiceFacade.addEarlyStatements(toDate);
          statementServiceFacade.addEarlyStatements(toDate);
    }

}

