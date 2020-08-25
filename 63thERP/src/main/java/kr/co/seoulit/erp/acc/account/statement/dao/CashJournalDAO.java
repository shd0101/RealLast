package kr.co.seoulit.erp.acc.account.statement.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.acc.account.statement.to.CashJournalBean;

@Mapper
public interface CashJournalDAO {

    public ArrayList<CashJournalBean> selectCashJournalList(String fromDate, String toDate);

}
