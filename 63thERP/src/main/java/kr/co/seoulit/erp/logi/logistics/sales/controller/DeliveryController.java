package kr.co.seoulit.erp.logi.logistics.sales.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.logi.logistics.sales.serviceFacade.SalesServiceFacade;

import kr.co.seoulit.erp.logi.logistics.sales.to.ContractInfoTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.DeliveryInfoTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/logi/sales/*")
public class DeliveryController {

	@Autowired
	private SalesServiceFacade salesSF;
	
	private ModelMap modelMap = new ModelMap();

	@RequestMapping("/searchDeliveryInfoList.do")
	public ModelMap searchDeliveryInfoList(HttpServletRequest request, HttpServletResponse response) {

		try {

			ArrayList<DeliveryInfoTO> deliveryInfoList = salesSF.getDeliveryInfoList();

			modelMap.put("gridRowJson", deliveryInfoList);
			modelMap.put("errorCode", 0);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

	// batchListProcess

	public ModelMap batchListProcess(HttpServletRequest request, HttpServletResponse response) {

//		String batchList = request.getParameter("batchList");

		try {

//			List<DeliveryInfoTO> deliveryTOList = gson.fromJson(batchList, new TypeToken<ArrayList<DeliveryInfoTO>>() {
//			}.getType());

//			HashMap<String, Object> resultMap = salesSF.batchDeliveryListProcess(deliveryTOList);
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

	@RequestMapping("/searchDeliverableContractList.do")
	public ModelMap searchDeliverableContractList(HttpServletRequest request, HttpServletResponse response) {

		String searchCondition = request.getParameter("searchCondition");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String customerCode = request.getParameter("customerCode");

		try {

			ArrayList<ContractInfoTO> deliverableContractList = null;

			if (searchCondition.equals("searchByDate")) {

				String[] paramArray = { startDate, endDate };
				deliverableContractList = salesSF.getDeliverableContractList("searchByDate", paramArray);

			} else if (searchCondition.equals("searchByCustomer")) {

				String[] paramArray = { customerCode };
				deliverableContractList = salesSF.getDeliverableContractList("searchByCustomer", paramArray);

			}

			modelMap.put("gridRowJson", deliverableContractList);
			modelMap.put("errorCode", 0);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

	@RequestMapping("/deliver.do")
	public ModelMap deliver(HttpServletRequest request, HttpServletResponse response) {

		HashMap<String,Object> resultMap = new HashMap<>();

		String contractDetailNo = request.getParameter("contractDetailNo");

		try {

			resultMap = salesSF.deliver(contractDetailNo);
			
		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

}
