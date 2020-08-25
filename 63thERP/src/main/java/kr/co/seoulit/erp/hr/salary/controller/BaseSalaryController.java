package kr.co.seoulit.erp.hr.salary.controller;


import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//import kr.co.seoulit.erp.base.controller.DeptListController;
import kr.co.seoulit.erp.hr.salary.sf.SalaryServiceFacade;
import kr.co.seoulit.erp.hr.salary.to.BaseSalaryTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/hr/*")
public class BaseSalaryController  {
	@Autowired
	private SalaryServiceFacade salaryServiceFacade;

	@RequestMapping("/salary/baseSalaryManage.do")
	@ResponseBody
	public ArrayList<BaseSalaryTO> findBaseSalaryList(){
	return  salaryServiceFacade.findBaseSalaryList();
	}
		
}

/*
 * public ModelAndView modifyBaseSalaryList(HttpServletRequest request,
 * HttpServletResponse response){
 * 
 * String sendData = request.getParameter("sendData"); try {
 * response.setContentType("application/json; charset=UTF-8"); //간편하고 성능좋은
 * gson으로 변경 Gson gson = new Gson(); ArrayList<BaseSalaryTO> baseSalaryList =
 * gson.fromJson(sendData, new
 * TypeToken<ArrayList<BaseSalaryTO>>(){}.getType());
 * salaryServiceFacade.modifyBaseSalaryList(baseSalaryList);
 * modelMap.put("errorMsg","success"); modelMap.put("errorCode", 0); } catch
 * (Exception ioe) { modelMap.clear(); modelMap.put("errorMsg",
 * ioe.getMessage()); } modelAndView = new ModelAndView("jsonView", modelMap);
 * return modelAndView; }
 * 
 * }
 */