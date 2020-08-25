package kr.co.seoulit.erp.hr.attd.sf;


import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.hr.attd.to.DayAttdMgtTO;
import kr.co.seoulit.erp.hr.attd.to.DayAttdTO;
import kr.co.seoulit.erp.hr.attd.to.MonthAttdMgtTO;
import kr.co.seoulit.erp.hr.attd.to.RestAttdTO;
import kr.co.seoulit.erp.hr.base.to.HrDetailCodeTO;

public interface AttdServiceFacade {
	public ArrayList<DayAttdTO> findDayAttdList(String empCode, String applyDay);
	public HashMap<String,Object> registDayAttd(DayAttdTO dayAttd);
	public void insertDayAttd(DayAttdTO dayAttd); // test

	public ArrayList<RestAttdTO> findRestAttdList(String empCode, String startDate, String endDate, String code);
	public ArrayList<RestAttdTO> findRestAttdListByDept(String deptName, String startDate, String endDate);
	public ArrayList<RestAttdTO> findRestAttdListByToday(String empCode, String toDay);
	public void registRestAttd(HashMap<String, String> attdRestMap);
	public void modifyRestAttdList(ArrayList<RestAttdTO> restAttdList);

	public ArrayList<DayAttdMgtTO> findDayAttdMgtList(String applyDay);
	public void modifyDayAttdMgtList(ArrayList<DayAttdMgtTO> dayAttdMgtList);

	public ArrayList<MonthAttdMgtTO> findMonthAttdMgtList(String applyYearMonth);
	public void modifyMonthAttdMgtList(ArrayList<MonthAttdMgtTO> monthAttdMgtList);
	public HashMap<String, Object> findDayAttdMgtList(HashMap<String, Object> map);//�κ�
	   public ArrayList<DayAttdMgtTO> findDayAttdMgtListAll(HashMap<String, Object> map);//�κ�
	   public ArrayList<DayAttdMgtTO> dayDeadlineRegister(HashMap<String, Object> map);//�κ�
	public void dayDeadlineCancel(HashMap<String, Object> map);
	public ArrayList<HrDetailCodeTO> searchRestAttendanceType();
}
