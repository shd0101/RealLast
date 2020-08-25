package kr.co.seoulit.erp.acc.account.base.applicationService;

import java.util.ArrayList;

import kr.co.seoulit.erp.acc.account.base.to.AccountBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountControlBean;

public interface AccountApplicationService {

    public AccountBean getAccount(String code);

    public ArrayList<AccountBean> findParentAccountList();

    public ArrayList<AccountBean> findDetailAccountList(String code);

    public void updateAccount(AccountBean accountBean);

    ArrayList<AccountBean> getAccountListByName(String accountName);

    ArrayList<AccountControlBean> getAccountControlList(String accountCode);
    
    public String selectPeriodNo(String toDay);
}
