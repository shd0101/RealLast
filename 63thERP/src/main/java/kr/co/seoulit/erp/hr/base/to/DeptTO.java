package kr.co.seoulit.erp.hr.base.to;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class DeptTO extends BaseTO{
	String deptCode, deptName, deptTel;

}
