package kr.co.seoulit.erp.acc.base.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PeriodDAO {

    public String getPeriodNo(String today);
    
    public void insertPeriodNo(String sdate,String edate);

}