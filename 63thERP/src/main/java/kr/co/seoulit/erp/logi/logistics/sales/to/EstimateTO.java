package kr.co.seoulit.erp.logi.logistics.sales.to;

import java.util.ArrayList;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class EstimateTO extends BaseTO {
	private String effectiveDate;
	private String estimateNo;
	private String estimateRequester;
	private String description;
	private String contractStatus;
	private String customerCode;
	private String personCodeInCharge;
	private String personNameCharge;
	private String estimateDate;
	private ArrayList<EstimateDetailTO> estimateDetailTOList;

}