package kr.co.seoulit.erp.hr.attd.controller;


import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.hr.attd.sf.AttdServiceFacade;
import kr.co.seoulit.erp.hr.attd.to.RestAttdTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/hr/*")
public class AttdApplovalController {
	@Autowired
	private AttdServiceFacade attdServiceFacade;
	private ModelMap modelMap = new ModelMap();

	@RequestMapping(value="/attendance/attendanceApploval.do",method=RequestMethod.GET)
	public ModelMap findRestAttdListByDept(HttpServletRequest request, HttpServletResponse response){
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String deptName = request.getParameter("deptName");
		
		try {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("application/json; charset=UTF-8");
			ArrayList<RestAttdTO> restAttdList = attdServiceFacade.findRestAttdListByDept(deptName, startDate, endDate);
			modelMap.put("errorMsg","success");
			modelMap.put("errorCode", 0);
			modelMap.put("restAttdList", restAttdList);
		} catch (Exception ioe) {
			modelMap.clear();
			modelMap.put("errorMsg", ioe.getMessage());
		} 
		return modelMap;
	}
	
	@RequestMapping(value="/attendance/attendanceApploval.do",method=RequestMethod.POST)
	public ModelMap modifyRestAttdList(HttpServletRequest request, HttpServletResponse response){
//		String sendData = request.getParameter("sendData");
		try {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("application/json; charset=UTF-8");
//			Gson gson = new Gson();
//			ArrayList<RestAttdTO> restAttdList = gson.fromJson(sendData, new TypeToken<ArrayList<RestAttdTO>>(){}.getType());
//			attdServiceFacade.modifyRestAttdList(restAttdList);
//			modelMap.put("errorMsg","success");
//			modelMap.put("errorCode", 0);
		} catch (Exception ioe) {
			modelMap.clear();
			modelMap.put("errorMsg", ioe.getMessage());
		} 
		return modelMap;
	} 
}
