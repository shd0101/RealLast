package kr.co.seoulit.erp.logi.logistics.sales.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.logi.logistics.sales.to.SalesPlanTO;

public interface SalesPlanApplicationService {
	
	public ArrayList<SalesPlanTO> getSalesPlanList(String dateSearchCondition, String startDate, String endDate);
	
	// ApplicationService 안에서만 호출
	public String getNewSalesPlanNo(String salesPlanDate);

	public HashMap<String, Object> batchSalesPlanListProcess(ArrayList<SalesPlanTO> salesPlanTOList);

	
}
