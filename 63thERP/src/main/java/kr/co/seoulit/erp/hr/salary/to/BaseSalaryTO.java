package kr.co.seoulit.erp.hr.salary.to;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class BaseSalaryTO extends BaseTO {
	private String positionCode, position, baseSalary,	hobongRatio;
	
}
