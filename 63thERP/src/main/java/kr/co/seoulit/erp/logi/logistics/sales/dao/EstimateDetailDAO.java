package kr.co.seoulit.erp.logi.logistics.sales.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateDetailTO;

@Mapper
public interface EstimateDetailDAO {

	public ArrayList<EstimateDetailTO> selectEstimateDetailList(String estimateNo);

	public int selectEstimateDetailCount(String estimateNo);

	public void insertEstimateDetail(EstimateDetailTO TO);

	public void updateEstimateDetail(EstimateDetailTO TO);

	public void deleteEstimateDetail(EstimateDetailTO TO);

}