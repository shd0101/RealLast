package kr.co.seoulit.erp.hr.emp.controller;


import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


import kr.co.seoulit.erp.hr.emp.sf.EmpServiceFacade;

@CrossOrigin("*")
@RestController
@RequestMapping("/hr/*")
public class EmpRegistController{
	
	@Autowired
	private EmpServiceFacade empServiceFacade;
	private ModelAndView modelAndView = null;
	private ModelMap modelMap = new ModelMap();
	
	
	
	
	@RequestMapping(value="registEmployee.do",method=RequestMethod.POST)
	public ModelAndView registEmployee(@RequestBody HashMap<String,Object> insertEmp) {
		try {
			System.out.println("AAA");
			HashMap<String,String> emp=(HashMap<String,String>)insertEmp.get("insertEmp");
			empServiceFacade.registEmployee(emp);		
			modelMap.put("errorMsg","사원이 등록되었습니다.");
			modelMap.put("errorCode", 0);
		} catch (Exception dae){
			modelMap.put("errorMsg", "사원 등록에 실패했습니다 : "+dae.getMessage());
			modelMap.put("errorCode", -1);
		}
		modelAndView = new ModelAndView("jsonView", modelMap);
		return modelAndView;
	}
	
	
	
	public ModelAndView findLastEmpCode(HttpServletRequest request, HttpServletResponse response){
		try {
			response.setContentType("application/json; charset=UTF-8");
			String empCode = empServiceFacade.findLastEmpCode();
			modelMap.put("lastEmpCode", empCode);
			modelMap.put("errorMsg","success");
			modelMap.put("errorCode", 0);
		} catch (Exception ioe) {
			modelMap.clear();
			modelMap.put("errorMsg", ioe.getMessage());
		}
		modelAndView = new ModelAndView("jsonView", modelMap);
		return modelAndView;
	}
	
}
