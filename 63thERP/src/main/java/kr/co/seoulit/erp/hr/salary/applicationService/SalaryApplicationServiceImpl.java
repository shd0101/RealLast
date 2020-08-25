package kr.co.seoulit.erp.hr.salary.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.hr.salary.applicationService.SalaryApplicationService;
import kr.co.seoulit.erp.hr.salary.applicationService.SalaryApplicationServiceImpl;
import kr.co.seoulit.erp.hr.salary.dao.BaseDeductionDAO;
import kr.co.seoulit.erp.hr.salary.dao.BaseExtSalDAO;
import kr.co.seoulit.erp.hr.salary.dao.BaseSalaryDAO;
import kr.co.seoulit.erp.hr.salary.dao.MonthDeductionDAO;
import kr.co.seoulit.erp.hr.salary.dao.MonthExtSalDAO;
import kr.co.seoulit.erp.hr.salary.dao.MonthSalaryDAO;
import kr.co.seoulit.erp.hr.salary.repository.MonthSalaryRepository;
import kr.co.seoulit.erp.hr.salary.to.BaseDeductionTO;
import kr.co.seoulit.erp.hr.salary.to.BaseExtSalTO;
import kr.co.seoulit.erp.hr.salary.to.BaseSalaryTO;
import kr.co.seoulit.erp.hr.salary.to.MonthSalaryTO;

@Component
public class SalaryApplicationServiceImpl implements SalaryApplicationService{
	@Autowired
	private MonthDeductionDAO monthDeductionDAO;
	@Autowired
	private MonthExtSalDAO monthExtSalDAO;
	@Autowired
	private MonthSalaryDAO monthSalaryDAO;
	@Autowired
	private BaseDeductionDAO baseDeductionDAO;
	@Autowired
	private BaseExtSalDAO baseExtSalDAO;
	@Autowired
	private BaseSalaryDAO baseSalaryDAO;
	@Autowired
	private MonthSalaryRepository monthSsalaryRepostiroy;

	
	@Override
	public HashMap<String, Object> findMonthSalary(String applyYearMonth, String empCode) {

		HashMap<String, Object> map = new HashMap<>();
		map.put("applyYearMonth", applyYearMonth);
		map.put("empCode", empCode);
		monthSalaryDAO.batchMonthSalaryProcess(map);
		System.out.println("MSG QWEEEEEEEEEEEEEEEEEEEEE "+map.get("errorMsg"));
		System.out.println("MSG QWEEEEEEEEEEEEEEEEEEEEE "+map.get("errorCode"));
		return map;
		
	}
	@Override
	public ArrayList<MonthSalaryTO> findYearSalary(String applyYear, String empCode) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("applyYear", applyYear);
		map.put("empCode", empCode);
		ArrayList<MonthSalaryTO> yearSalary = monthSalaryDAO.selectYearSalary(map);
		return yearSalary;	
	}
	@Override
	public void modifyMonthSalary(MonthSalaryTO monthSalary) {
		monthSalaryDAO.updateMonthSalary(monthSalary);
	}
	@Override
	public ArrayList<BaseDeductionTO> findBaseDeductionList() {
		ArrayList<BaseDeductionTO> baseDeductionList = baseDeductionDAO.selectBaseDeductionList();
		return baseDeductionList;
	}
	@Override
	public void batchBaseDeductionProcess(ArrayList<BaseDeductionTO> baseDeductionList) {

		for(BaseDeductionTO baseDeduction : baseDeductionList){
			switch(baseDeduction.getStatus()){
				case "insert" :
					baseDeductionDAO.insertBaseDeduction(baseDeduction);
					break;
				case "update" :
					baseDeductionDAO.updateBaseDeduction(baseDeduction);
					break;
				case "delete" :
					baseDeductionDAO.deleteBaseDeduction(baseDeduction);
					break;
			}
		}	
	}
	@Override
	public ArrayList<BaseSalaryTO> findBaseSalaryList() {
		ArrayList<BaseSalaryTO> baseSalaryList = baseSalaryDAO.selectBaseSalaryList();
		return baseSalaryList;
	}
	@Override
	public void modifyBaseSalaryList(ArrayList<BaseSalaryTO> baseSalaryList) {
		for(BaseSalaryTO baseSalary : baseSalaryList){
			if(baseSalary.getStatus().equals("update"))
				baseSalaryDAO.updateBaseSalary(baseSalary);
		}
	}
	@Override
	public ArrayList<BaseExtSalTO> findBaseExtSalList() {
		ArrayList<BaseExtSalTO> baseExtSalList = baseExtSalDAO.selectBaseExtSalList();
		return baseExtSalList;
	}
	@Override
	public void modifyBaseExtSalList(ArrayList<BaseExtSalTO> baseExtSalList) {
		for(BaseExtSalTO baseExtSal : baseExtSalList){
			if(baseExtSal.getStatus().equals("update"))
				baseExtSalDAO.updateBaseExtSal(baseExtSal);
		}		
	}
	@Override
	public HashMap<String, Object> findCloseSalary(String applyYearMonth, String deptCode) { //월급여조회
		HashMap<String, Object> map = new HashMap<>();
		map.put("applyYearMonth", applyYearMonth);
		map.put("deptCode", deptCode);
		monthSalaryDAO.findMonthSalaryProcess(map);
		return map;
	}
	@Override
	public void closeSalary(MonthSalaryTO empCodeList) { //마감 함수
		
		
		monthSsalaryRepostiroy.save(empCodeList);
		
		
	}
}