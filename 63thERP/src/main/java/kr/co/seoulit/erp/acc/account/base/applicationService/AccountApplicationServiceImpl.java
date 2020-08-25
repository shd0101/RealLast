package kr.co.seoulit.erp.acc.account.base.applicationService;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.acc.account.base.dao.AccountDAO;
import kr.co.seoulit.erp.acc.account.base.to.AccountBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountControlBean;
import kr.co.seoulit.erp.acc.account.base.applicationService.AccountApplicationService;
import kr.co.seoulit.erp.acc.account.base.applicationService.AccountApplicationServiceImpl;

@Component
public class AccountApplicationServiceImpl implements AccountApplicationService {

  @Autowired
    private AccountDAO accountDAO;  

  	
    public void setAccountDAO(AccountDAO accountDAO) {
		this.accountDAO = accountDAO;
	}

	public AccountBean getAccount(String accountCode) {
        return  accountDAO.selectAccount(accountCode);
    }

    @Override
    public ArrayList<AccountBean> findParentAccountList() {
        return accountDAO.selectParentAccountList();
    }

    public String selectPeriodNo(String toDay) {
    	return accountDAO.selectPeriodNo(toDay);
    };

    public ArrayList<AccountBean> findDetailAccountList(String code) {
        return accountDAO.selectDetailAccountList(code);
    }

    @Override
    public void updateAccount(AccountBean accountBean) {     
            accountDAO.updateAccount(accountBean);
    }

    @Override
    public ArrayList<AccountBean> getAccountListByName(String accountName) {
        return accountDAO.selectAccountListByName(accountName);
    }

    @Override
    public ArrayList<AccountControlBean> getAccountControlList(String accountCode) {
        return accountDAO.selectAccountControlList(accountCode);
    }


}
