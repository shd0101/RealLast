package kr.co.seoulit.erp.logi.logistics.production.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.logi.logistics.production.serviceFacade.ProductionServiceFacade;

import kr.co.seoulit.erp.logi.logistics.production.to.ContractDetailInMpsAvailableTO;
import kr.co.seoulit.erp.logi.logistics.production.to.MpsTO;
import kr.co.seoulit.erp.logi.logistics.production.to.SalesPlanInMpsAvailableTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/logi/production/*")
public class MpsController {

	@Autowired
	private ProductionServiceFacade productionSF;

	
	private ModelMap modelMap = new ModelMap();

	@RequestMapping("/searchMpsInfo.do")
	public ModelMap searchMpsInfo(HttpServletRequest request, HttpServletResponse response) {


		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String includeMrpApply = request.getParameter("includeMrpApply"); 

		try {

			ArrayList<MpsTO> mpsTOList = productionSF.getMpsList(startDate, endDate, includeMrpApply);

			modelMap.put("gridRowJson", mpsTOList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

	@RequestMapping("/searchContractDetailInMpsAvailable.do")
	public ModelMap searchContractDetailListInMpsAvailable(HttpServletRequest request,
			HttpServletResponse response) {

		String searchCondition = request.getParameter("searchCondition");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");

		try {

			ArrayList<ContractDetailInMpsAvailableTO> contractDetailInMpsAvailableList = productionSF
					.getContractDetailListInMpsAvailable(searchCondition, startDate, endDate);
													   //contractDate, 2019-07-01, 2019-07-31
			modelMap.put("gridRowJson", contractDetailInMpsAvailableList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

	@RequestMapping("/searchSalesPlanInMpsAvailable.do")
	public ModelMap searchSalesPlanListInMpsAvailable(HttpServletRequest request, HttpServletResponse response) {

		String searchCondition = request.getParameter("searchCondition");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");

		try {

			ArrayList<SalesPlanInMpsAvailableTO> salesPlanInMpsAvailableList = productionSF
					.getSalesPlanListInMpsAvailable(searchCondition, startDate, endDate);

			modelMap.put("gridRowJson", salesPlanInMpsAvailableList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

	@RequestMapping("/convertContractDetailToMps.do")
	public ModelMap convertContractDetailToMps(HttpServletRequest request, HttpServletResponse response) {

//		String batchList = request.getParameter("batchList");
//		ArrayList<ContractDetailInMpsAvailableTO> contractDetailInMpsAvailableList = gson.fromJson(batchList,
//				new TypeToken<ArrayList<ContractDetailInMpsAvailableTO>>() {
//				}.getType());

		try {

//			HashMap<String, Object> resultMap = productionSF
//					.convertContractDetailToMps(contractDetailInMpsAvailableList);
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

	@RequestMapping("/convertSalesPlanToMps.do")
	public ModelMap convertSalesPlanToMps(HttpServletRequest request, HttpServletResponse response) {

//		String batchList = request.getParameter("batchList");

//		ArrayList<SalesPlanInMpsAvailableTO> salesPlanInMpsAvailableList = gson.fromJson(batchList,
//				new TypeToken<ArrayList<SalesPlanInMpsAvailableTO>>() {
//				}.getType());

		try {

//			HashMap<String, Object> resultMap = productionSF.convertSalesPlanToMps(salesPlanInMpsAvailableList);
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
