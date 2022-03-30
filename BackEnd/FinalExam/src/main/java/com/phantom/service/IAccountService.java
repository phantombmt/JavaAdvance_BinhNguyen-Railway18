package com.phantom.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.phantom.entity.Account;
import com.phantom.form.account.AccountFilterForm;
import com.phantom.form.account.CreatingAccountForm;
import com.phantom.form.account.UpdatingAccountForm;

public interface IAccountService extends UserDetailsService {
	
	Page<Account> getListAccounts(Pageable pageable, String search,AccountFilterForm filterForm);

	public Account getAccountByID(int id);
	
	boolean isAccountExistsByUserName(String userName);

	Account getAccountByUserName(String username);
	
	void createAccount(CreatingAccountForm form);

	void updateAccount(int id,UpdatingAccountForm form);

	void deleteAccount(int id);

	void deleteAccounts(List<Integer> ids);

	void updateMultipleAccounts( int id,List<Integer> ids);

	

}
