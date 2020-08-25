package kr.co.seoulit.erp.hr.salary.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.co.seoulit.erp.acc.account.slip.to.JournalBean;
import kr.co.seoulit.erp.acc.account.slip.to.SlipBean;
import kr.co.seoulit.erp.hr.salary.sf.SalaryServiceFacade;
import kr.co.seoulit.erp.hr.salary.to.MonthSalaryTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/hr/*",produces ="application/json")
public class monthSalaryController {
	@Autowired
	private SalaryServiceFacade salaryServiceFacade;
	
	private ModelMap modelMap = null;
	

	@SuppressWarnings("unchecked")
	@RequestMapping("/salary/findMonthSalary") //월 급여조회
	public ModelMap findMonthSalary(HttpServletRequest request, HttpServletResponse response){
		String applyYearMonth = request.getParameter("applyYearMonth");
		String empCode = request.getParameter("empCode");
		HashMap<String, Object> monthSalary = null;
		modelMap = new ModelMap();
		try {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("application/json; charset=UTF-8");
			monthSalary = salaryServiceFacade.findMonthSalary(applyYearMonth,empCode);
			ArrayList<MonthSalaryTO> list = (ArrayList<MonthSalaryTO>) monthSalary.get("result");
			if(list.size() != 1) {
				modelMap.put("errorCode","-1");
				modelMap.put("errorMsg", monthSalary.get("errorMsg"));
			} else {
				modelMap.put("monthSalary", monthSalary);
				modelMap.put("errorMsg","success");
				modelMap.put("errorCode", 0);
			}
		} catch (Exception ioe) {
			ioe.printStackTrace();
			modelMap.clear();
			modelMap.put("errorCode","-1");
			modelMap.put("errorMsg", ioe.getMessage());
		}
		return modelMap;
	}
	
	@RequestMapping(value="/salary/findYearSalary")
	public ModelMap findYearSalary(HttpServletRequest request, HttpServletResponse response){
		String applyYear = request.getParameter("applyYear");
		String empCode = request.getParameter("empCode");
		modelMap = new ModelMap();
		try {

			ArrayList<MonthSalaryTO> yearSalary = salaryServiceFacade.findYearSalary(applyYear, empCode);
			modelMap.put("yearSalary", yearSalary);
			modelMap.put("errorMsg","success");
			modelMap.put("errorCode", 0);
		} catch (Exception ioe) {
			modelMap.clear();
			modelMap.put("errorMsg", ioe.getMessage());
		} 
		return modelMap;
	}
	
	
	@PostMapping("salary/modifyMonthSalary.do") //월급여 마감  
	public ModelMap modifyMonthSalary(@RequestBody Map<String , ArrayList<MonthSalaryTO>> empcode1)
	{
//**************************2020-08-20 63기 손유찬 수정********************************* 
//			@RequestBody ArrayList<SlipBean> slipData , @RequestBody ArrayList<MonthSalaryTO> monthSalary
		modelMap = new ModelMap();
		System.out.println("뷰단에서 가져온 empcode : "+empcode1.get("empcode1"));
	
			try {
				for(MonthSalaryTO empCodeList : empcode1.get("empcode1")) {
					
					empCodeList.setFinalizeStatus("Y");
					salaryServiceFacade.closeMonthSalary(empCodeList);
					salaryServiceFacade.modifyMonthSalary(empCodeList);
				}
				
//**************************2020-08-20 63기 손유찬 수정********************************* 
			modelMap.put("errorMsg","success");
			modelMap.put("errorCode", 0);
			} catch (Exception ioe) {
				modelMap.put("errorMsg", ioe.getMessage());
			} 
			return modelMap;
}
	
	
	
//**************************2020-08-20 63기 손유찬 수정********************************* 	
	@RequestMapping("salary/findCloseSalary.do")  //월급여 조회
	@GetMapping
   public ModelMap findCloseSalary(HttpServletRequest request, HttpServletResponse response) {
		String applyYearMonth = request.getParameter("applyYearMonth");
		String deptCode=request.getParameter("deptCode");
		HashMap<String, Object> monthSalary = null;
		modelMap = new ModelMap();
		try {
		//	request.setCharacterEncoding("UTF-8");
		//	response.setContentType("application/json; charset=UTF-8");
			monthSalary = salaryServiceFacade.CloseSalary(applyYearMonth, deptCode);
			System.out.println("가져온값 "+monthSalary);
			modelMap.put("monthSalary", monthSalary);
			modelMap.put("errorMsg","success");
			modelMap.put("errorCode", 0);
			} catch (Exception ioe) {
				modelMap.clear();
				modelMap.put("errorMsg", ioe.getMessage());
			} 
	   return modelMap;
	}
	
	
	//**************************2020-08-20 63기 손유찬 수정********************************* 
}