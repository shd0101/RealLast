package kr.co.seoulit.erp.acc.account.base.controller;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.seoulit.erp.acc.account.base.serviceFacade.AccountServiceFacade;
import kr.co.seoulit.erp.acc.account.base.to.AccountBean;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class AccountController{
   @Autowired
	private AccountServiceFacade accountServiceFacade;

   @RequestMapping(value="/account/getAccount", method=RequestMethod.GET)
	public HashMap<String, Object> getAccount(@RequestParam("accountCode") String accountCode){
	   HashMap<String, Object> map=new HashMap<>();
	   try {
		AccountBean accountBean=accountServiceFacade.getAccount(accountCode);
        map.put("account", accountBean);
        map.put("errorCode",0);
        map.put("errorMsg","등록완료");
        
    }catch (Exception e2) {
    	map.put("errorCode", -1);
    	map.put("errorMsg", e2.getMessage());
    }
	   return map;
   }
   @RequestMapping(value="/account/getAccountListByName", method=RequestMethod.GET)
    public HashMap<String, Object> getAccountListByName(@RequestParam("accountName") String accountName) {
 
       HashMap<String, Object> map=new HashMap<>();
	   try {
		   ArrayList<AccountBean> accountBean=accountServiceFacade.getAccountListByName(accountName);
        map.put("accountList", accountBean);
        map.put("errorCode",0);
        map.put("errorMsg","등록완료");
        
    }catch (Exception e2) {
    	map.put("errorCode", -1);
    	map.put("errorMsg", e2.getMessage());
    }
	   return map;
   }
       
   @RequestMapping(value="/account/findParentAccountList", method=RequestMethod.GET)
    public HashMap<String, Object> findParentAccountList() {     
        HashMap<String, Object> map=new HashMap<>();
 	   try {
 		 ArrayList<AccountBean> accountBean=accountServiceFacade.findParentAccountList();
         map.put("accountList", accountBean);
         map.put("errorCode",0);
         map.put("errorMsg","등록완료");
         
     }catch (Exception e2) {
     	map.put("errorCode", -1);
     	map.put("errorMsg", e2.getMessage());
     }
 	   return map;
    }
        
    
   @RequestMapping(value="/account/findDetailAccountList", method=RequestMethod.GET)
    public HashMap<String, Object> findDetailAccountList(@RequestParam("code") String code) {
	   HashMap<String, Object> map=new HashMap<>();
        try {
    		ArrayList<AccountBean> accountBean=accountServiceFacade.findDetailAccountList(code);
            map.put("detailAccountList", accountBean);
            map.put("errorCode",0);
            map.put("errorMsg","등록완료");
            System.out.println(accountBean.get(1));
            
        }catch (Exception e2) {
        	map.put("errorCode", -1);
        	map.put("errorMsg", e2.getMessage());
        }
    	   return map;
       }
   @RequestMapping(value="/account/editAccount", method=RequestMethod.PUT)
   public void editAccount(@RequestParam HashMap<String,Object> param){
		AccountBean accountBean = new AccountBean();
		accountBean.setAccountInnerCode((String)param.get("accountInnerCode"));
		accountBean.setAccountName((String)param.get("accountName"));
       accountServiceFacade.updateAccount(accountBean);
   }
   
   @RequestMapping(value="/account/findPeriodNo")
   public String findPeriodNo(@RequestParam String toDay) {
	   
	   String periodNo = accountServiceFacade.findPeriodNo(toDay);
	   return periodNo ;
   }
}