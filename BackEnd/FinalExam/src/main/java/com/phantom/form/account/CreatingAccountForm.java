package com.phantom.form.account;

import com.phantom.entity.Account.AccountRole;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingAccountForm {
	
	private String userName;
	
	private String firstName;
	
	private String lastName;
	
	private AccountRole role;
	
	private int departmentId;
}
