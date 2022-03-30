package com.phantom.form.account;

import com.phantom.entity.Account;
import com.phantom.entity.Department;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccountFilterForm {
	
	private Account.AccountRole role;
	
	private String departmentName;

}
