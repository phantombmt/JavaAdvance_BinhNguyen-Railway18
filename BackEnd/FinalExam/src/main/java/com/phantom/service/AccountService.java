package com.phantom.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.phantom.entity.Account;
import com.phantom.form.account.AccountFilterForm;
import com.phantom.form.account.CreatingAccountForm;
import com.phantom.form.account.UpdatingAccountForm;
import com.phantom.repository.IAccountRepository;
import com.phantom.specification.account.AccountSpecification;

@Service
@Transactional
public class AccountService implements IAccountService {

	@Autowired
	private IAccountRepository accountRepository;

	@Autowired
	private ModelMapper modelMapper;

	public Page<Account> getListAccounts(Pageable pageable, String search, AccountFilterForm filterForm) {
		Specification<Account> where = AccountSpecification.buildWhere(search, filterForm);
		return accountRepository.findAll(where, pageable);
	}

	public Account getAccountByID(int id) {
		return accountRepository.findById(id).get();
	}

	@Override
	public boolean isAccountExistsByUserName(String userName) {
		return accountRepository.existsByUserName(userName);
	}

	@Override
	public void createAccount(CreatingAccountForm form) {
		// omit id field
		TypeMap<CreatingAccountForm, Account> typeMap = modelMapper.getTypeMap(CreatingAccountForm.class,
				Account.class);
		if (typeMap == null) { // if not already added
			// skip field Account Id when convert
			modelMapper.addMappings(new PropertyMap<CreatingAccountForm, Account>() {
				@Override
				protected void configure() {
					skip(destination.getId());
				}
			});
		}
		// convert form to entity
		Account account = modelMapper.map(form, Account.class);

		accountRepository.save(account);
	}

	@Override
	public void updateAccount(int id, UpdatingAccountForm form) {

		Account account = getAccountByID(id);

		// convert form to entity
		Account newAccount = modelMapper.map(form, Account.class);

		newAccount.setUserName(account.getUserName());
		newAccount.setFirstName(account.getFirstName());
		newAccount.setLastName(account.getLastName());
		newAccount.setPassword(account.getPassword());

		accountRepository.save(newAccount);
	}

	@Override
	public void deleteAccount(int id) {

		accountRepository.deleteById(id);
		;
	}

	@Override
	public void deleteAccounts(List<Integer> ids) {
		accountRepository.deleteByIds(ids);
	}

	@Override
	public void updateMultipleAccounts(int id, List<Integer> ids) {
		accountRepository.updateByIds(id, ids);

	}
	
	@Override
	public Account getAccountByUserName(String username) {
		return accountRepository.findByUserName(username);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account account = accountRepository.findByUserName(username);

		if (account == null) {
			// 401
			throw new UsernameNotFoundException(username);
		}

		return new User(account.getUserName(), account.getPassword(),
				AuthorityUtils.createAuthorityList(account.getRole().toString()));
	}



}
