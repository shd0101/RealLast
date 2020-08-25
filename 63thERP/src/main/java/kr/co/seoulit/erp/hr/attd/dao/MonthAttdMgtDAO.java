package kr.co.seoulit.erp.hr.attd.dao;

import java.util.HashMap;
import org.apache.ibatis.annotations.Mapper;
import kr.co.seoulit.erp.hr.attd.to.MonthAttdMgtTO;


@Mapper
public interface MonthAttdMgtDAO {
	public HashMap<String, Object> batchMonthAttdMgtProcess(HashMap<String,Object> map);
	public void updateMonthAttdMgtList(MonthAttdMgtTO monthAttdMgt);
	public void cancelMonthAttdMgtList(MonthAttdMgtTO monthAttdMgt);
}
