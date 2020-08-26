package kr.co.seoulit.erp.logi.logistics.sales.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.logi.logistics.sales.serviceFacade.SalesServiceFacade;

import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateDetailTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/logi/sales/*")
public class EstimateController {

	@Autowired
	private SalesServiceFacade salesSF;
	
	private ModelMap modelMap = new ModelMap();

	@RequestMapping("/searchEstimate.do")
	public ModelMap searchEstimateInfo(HttpServletRequest request, HttpServletResponse response) {

		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String dateSearchCondition = request.getParameter("dateSearchCondition");

		try {

			ArrayList<EstimateTO> estimateTOList = salesSF.getEstimateList(dateSearchCondition, startDate, endDate);

			modelMap.put("gridRowJson", estimateTOList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

// 酉곕떒�뿉 二쇱꽍 泥섎━ �릺�뼱�엳�쓬
	@RequestMapping("/searchEstimateDetail.do")
	public ModelMap searchEstimateDetailInfo(HttpServletRequest request, HttpServletResponse response) {
		
		String estimateNo = request.getParameter("estimateNo");

		try {

			ArrayList<EstimateDetailTO> estimateDetailTOList = salesSF.getEstimateDetailList(estimateNo);

			modelMap.put("gridRowJson", estimateDetailTOList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

	@RequestMapping("/addNewEstimate.do")
	public ModelMap addNewEstimate(HttpServletRequest request, HttpServletResponse response) {

//		String estimateDate = request.getParameter("estimateDate");//寃ъ쟻�씪�옄
//		String newEstimateInfo = request.getParameter("newEstimateInfo"); 
//		EstimateTO newEstimateTO = gson.fromJson(newEstimateInfo, EstimateTO.class);

		try {

//			HashMap<String, Object> resultList = salesSF.addNewEstimate(estimateDate, newEstimateTO);
//			//寃ъ쟻�씪�옄�� 寃ъ쟻,寃ъ쟻�긽�꽭�쓽 json媛앹껜瑜� EstimateTO濡� 蹂��솚�븳 newEstimateTO瑜� map�뿉 �떞�쓬
//			modelMap.put("result", resultList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

	@RequestMapping("/batchEstimateDetailListProcess.do")
	public ModelMap batchListProcess(HttpServletRequest request, HttpServletResponse response) {

//		String batchList = request.getParameter("batchList");

//		ArrayList<EstimateDetailTO> estimateDetailTOList = gson.fromJson(batchList,
//				new TypeToken<ArrayList<EstimateDetailTO>>() {
//				}.getType());

		try {

//			HashMap<String, Object> resultList = salesSF.batchEstimateDetailListProcess(estimateDetailTOList);
//
//			modelMap.put("result", resultList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

}
