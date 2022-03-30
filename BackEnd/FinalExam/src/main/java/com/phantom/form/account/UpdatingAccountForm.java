package com.phantom.form.account;

import com.phantom.entity.Account.AccountRole;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingAccountForm {
	
	private int id;
	
	private AccountRole role;
	
	private int departmentId;
}
