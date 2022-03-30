package com.phantom.dto.auth;

import com.phantom.entity.Account;

import lombok.Data;

@Data
public class LoginInfoDto {

	private int id;

	private String userName;

	private String fullName;

	private String firstName;

	private String lastName;

	private Account.AccountRole role;

}
