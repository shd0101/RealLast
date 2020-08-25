package kr.co.seoulit.erp.hr.basicInfo.to;

import kr.co.seoulit.common.to.BaseTO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class FinancialAccountAssociatesTO extends BaseTO {
	private String accountOpenPlace;
	private String financialAccountNote;
	private String financialInstituteName;
	private String cardType;
	private String businessLicenseNumber;
	private String cardNumber;
	private String cardOpenPlace;
	private String accountAssociatesType;
	private String financialInstituteCode;
	private String workplaceCode;
	private String cardMemberName;
	private String accountAssociatesCode;
	private String accountNumber;
	private String accountAssociatesName;

}