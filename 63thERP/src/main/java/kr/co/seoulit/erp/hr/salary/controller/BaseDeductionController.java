package kr.co.seoulit.erp.hr.salary.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//import kr.co.seoulit.erp.base.controller.DeptListController;
import kr.co.seoulit.erp.hr.salary.sf.SalaryServiceFacade;
import kr.co.seoulit.erp.hr.salary.to.BaseDeductionTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/hr/*")
public class BaseDeductionController {
	@Autowired
	private  SalaryServiceFacade salaryServiceFacade;
	
	
	@RequestMapping("/salary/baseDeductionManage.do")
	@ResponseBody
	public Map<String, Object> findBaseDeductionList(HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
			response.setContentType("application/json; charset=UTF-8");
			ArrayList<BaseDeductionTO> baseDeductionList = salaryServiceFacade.findBaseDeductionList();
			map.put("baseDeductionList", baseDeductionList);
			BaseDeductionTO emptyBean = new BaseDeductionTO();
//			emptyBean.setStatus("insert");
			map.put("emptyBean", emptyBean);
			map.put("errorMsg","success");
			map.put("errorCode", 0);

		
		
		return map;
	}
	
	/*
	 * public ModelAndView batchBaseDeductionProcess(HttpServletRequest request,
	 * HttpServletResponse response){ String sendData =
	 * request.getParameter("sendData"); try {
	 * response.setContentType("application/json; charset=UTF-8");; // 간편하고 성능좋은
	 * gson으로 변경 Gson gson = new Gson(); ArrayList<BaseDeductionTO>
	 * baseDeductionList = gson.fromJson(sendData, new
	 * TypeToken<ArrayList<BaseDeductionTO>>(){}.getType());
	 * salaryServiceFacade.batchBaseDeductionProcess(baseDeductionList);
	 * modelMap.put("errorMsg","success"); modelMap.put("errorCode", 0); } catch
	 * (Exception ioe) { modelMap.clear(); modelMap.put("errorMsg",
	 * ioe.getMessage()); } modelAndView = new ModelAndView("jsonView", modelMap);
	 * return modelAndView; }
	 */
	
}
