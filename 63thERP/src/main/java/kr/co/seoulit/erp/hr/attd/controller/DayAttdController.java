 package kr.co.seoulit.erp.hr.attd.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import kr.co.seoulit.erp.hr.attd.sf.AttdServiceFacade;
import kr.co.seoulit.erp.hr.attd.to.DayAttdTO;
import kr.co.seoulit.common.to.ResultTO;
import kr.co.seoulit.erp.hr.attd.controller.DayAttdController;

@CrossOrigin("*")
@RestController
//@RequestMapping(value = "/hr/*", produces = "application/json")
@RequestMapping("/hr/insa/*")
public class DayAttdController{
	@Autowired
	private AttdServiceFacade attdServiceFacade;
	
	@RequestMapping(value="/attendance/dayAttendance", method=RequestMethod.GET)
	public HashMap<String,Object> findDayAttdList(@Param("empCode") String empCode, @Param("applyDay") String applyDay){
		HashMap<String, Object> model=new HashMap<>();
		
		model.put("DayAttdTO", attdServiceFacade.findDayAttdList(empCode, applyDay));
		return model;
	}


	//@RequestMapping(value="insa/attendance/dayAttendance", method=RequestMethod.POST)
	@PostMapping(value="/attendance/dayAttendance")
	public Map<String, Object> registDayAttd(@RequestBody DayAttdTO dayAttd){
		//("sendData") String sendData
		System.out.println("나와   "+dayAttd);
		HashMap<String, Object> map=attdServiceFacade.registDayAttd(dayAttd);   
	 System.out.println(map);
		return map;

	}
}

