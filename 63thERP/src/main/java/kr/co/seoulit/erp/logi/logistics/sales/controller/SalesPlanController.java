package kr.co.seoulit.erp.logi.logistics.sales.controller;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.logi.logistics.sales.serviceFacade.SalesServiceFacade;

import kr.co.seoulit.erp.logi.logistics.sales.to.SalesPlanTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/logi/sales/*")
public class SalesPlanController {

	@Autowired
	private SalesServiceFacade salesSF;
	
	private ModelMap modelMap = new ModelMap();

	@RequestMapping("/searchSalesPlan.do")
	public ModelMap searchSalesPlanInfo(HttpServletRequest request, HttpServletResponse response) {

		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String dateSearchCondition = request.getParameter("dateSearchCondition");

		try {

			ArrayList<SalesPlanTO> salesPlanTOList = salesSF.getSalesPlanList(dateSearchCondition, startDate, endDate);

			modelMap.put("gridRowJson", salesPlanTOList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

	@RequestMapping("/batchSalesPlanListProcess.do")
	public ModelMap batchListProcess(HttpServletRequest request, HttpServletResponse response) {

//		String batchList = request.getParameter("batchList");
		
		try {

//			ArrayList<SalesPlanTO> salesPlanTOList = gson.fromJson(batchList, new TypeToken<ArrayList<SalesPlanTO>>() {
//			}.getType());

//			HashMap<String, Object> resultMap = salesSF.batchSalesPlanListProcess(salesPlanTOList);
//
//			modelMap.put("result", resultMap);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

}
