package kr.co.seoulit.erp.logi.logistics.production.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.logi.logistics.production.serviceFacade.ProductionServiceFacade;

import kr.co.seoulit.erp.logi.logistics.production.to.MrpGatheringTO;
import kr.co.seoulit.erp.logi.logistics.production.to.MrpTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/logi/production/*")
public class MrpController  {

	@Autowired
	private ProductionServiceFacade productionSF;

	private ModelMap modelMap = new ModelMap();
	
	@RequestMapping("/getMrpList.do")
	public ModelMap getMrpList(HttpServletRequest request, HttpServletResponse response) {
		
		String mrpGatheringStatusCondition = request.getParameter("mrpGatheringStatusCondition");
		String dateSearchCondition = request.getParameter("dateSearchCondition");
		String mrpStartDate = request.getParameter("mrpStartDate");
		String mrpEndDate = request.getParameter("mrpEndDate");
		String mrpGatheringNo = request.getParameter("mrpGatheringNo");
		
		try {

			ArrayList<MrpTO> mrpList = null;
			
		
			if(mrpGatheringStatusCondition != null ) {
				//여기 null이라는 스트링값이 담겨저왔으니 null은 아님. 객체가있는상태.
				
				mrpList = productionSF.searchMrpList(mrpGatheringStatusCondition);
				
			} else if (dateSearchCondition != null) {
				
				mrpList = productionSF.searchMrpList(dateSearchCondition, mrpStartDate, mrpEndDate);
				
			} else if (mrpGatheringNo != null) {
				
				mrpList = productionSF.searchMrpListAsMrpGatheringNo(mrpGatheringNo);
				
			}
			
			modelMap.put("gridRowJson", mrpList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}
	
	@RequestMapping("/openMrp.do")
	public HashMap<String, Object> openMrp(HttpServletRequest request, HttpServletResponse response) {
		
//		String mpsNoListStr = request.getParameter("mpsNoList");
		
//		ArrayList<String> mpsNoArr = gson.fromJson(mpsNoListStr,
//				new TypeToken<ArrayList<String>>() { }.getType());		
		
		HashMap<String, Object> resultMap = new HashMap<>();

		try {

//			resultMap = productionSF.openMrp(mpsNoArr);
			
		} catch (Exception e2) {
			
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return resultMap;
	}

	@RequestMapping("/registerMrp.do")
	public ModelMap registerMrp(HttpServletRequest request, HttpServletResponse response) {
		
//		String batchList = request.getParameter("batchList");
//		String mrpRegisterDate = request.getParameter("mrpRegisterDate");

//		ArrayList<MrpTO> newMrpList 
//			= gson.fromJson(batchList,
//					new TypeToken<ArrayList<MrpTO>>() { }.getType());

		try {

//			HashMap<String, Object> resultMap = productionSF.registerMrp(mrpRegisterDate, newMrpList);	 
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
	
	
	@RequestMapping("/getMrpGatheringList.do")
	public ModelMap getMrpGatheringList(HttpServletRequest request, HttpServletResponse response) {
		
//		String mrpNoList = request.getParameter("mrpNoList");
		
//		ArrayList<String> mrpNoArr = gson.fromJson(mrpNoList,
//				new TypeToken<ArrayList<String>>() { }.getType());

		try {

//			ArrayList<MrpGatheringTO> mrpGatheringList = productionSF.getMrpGathering(mrpNoArr);
//			
//			modelMap.put("gridRowJson", mrpGatheringList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}
	
	
	@RequestMapping("/registerMrpGathering.do")
	public ModelMap registerMrpGathering(HttpServletRequest request, HttpServletResponse response) {
		
//		String mrpGatheringRegisterDate = request.getParameter("mrpGatheringRegisterDate");
//		String batchList = request.getParameter("batchList");
//		String mrpNoAndItemCodeList = request.getParameter("mrpNoAndItemCodeList");
		
//		ArrayList<MrpGatheringTO> newMrpGatheringList
//			= gson.fromJson(batchList,
//					new TypeToken<ArrayList<MrpGatheringTO>>() { }.getType());	
//		
//		HashMap<String, String> mrpNoAndItemCodeMap 
//			=  gson.fromJson(mrpNoAndItemCodeList,
//					new TypeToken<HashMap<String, String>>() { }.getType());

		try {

//			HashMap<String, Object> resultMap 
//				= productionSF.registerMrpGathering(mrpGatheringRegisterDate, newMrpGatheringList, mrpNoAndItemCodeMap);	 
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
	
	@RequestMapping("/searchMrpGathering.do")
	public ModelMap searchMrpGathering(HttpServletRequest request, HttpServletResponse response) {
		
		String searchDateCondition = request.getParameter("searchDateCondition");
		String startDate = request.getParameter("mrpGatheringStartDate");
		String endDate = request.getParameter("mrpGatheringEndDate");

		try {

			ArrayList<MrpGatheringTO> mrpGatheringList = 
					productionSF.searchMrpGatheringList(searchDateCondition, startDate, endDate);
			
			modelMap.put("gridRowJson", mrpGatheringList);
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
