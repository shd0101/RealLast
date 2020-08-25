package kr.co.seoulit.erp.acc.account.statement.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.acc.account.statement.to.DetailTrialBalanceBean;


@Mapper
public interface DetailTrialBalanceDAO {
    public ArrayList<DetailTrialBalanceBean> selectDetailTrialBalance(String fromDate, String toDate);

}
