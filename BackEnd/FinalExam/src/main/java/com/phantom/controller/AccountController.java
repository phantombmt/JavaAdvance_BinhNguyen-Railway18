package com.phantom.controller;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.phantom.entity.Account;
import com.phantom.form.account.AccountFilterForm;
import com.phantom.form.account.CreatingAccountForm;
import com.phantom.form.account.UpdatingAccountForm;
import com.phantom.dto.AccountDTO;

import com.phantom.service.IAccountService;

@RestController
@RequestMapping(value = "/api/v1/accounts")
public class AccountController {

	@Autowired
	private IAccountService accountService;

	@Autowired
	private ModelMapper modelMapper;
	
	//Get list Account
	@GetMapping()
	public Page<AccountDTO> getListAccounts(Pageable pageable,
			@RequestParam(value = "search", required = false) String search,AccountFilterForm filterForm){
		
		Page<Account> accounts = accountService.getListAccounts(pageable,search,filterForm);
		
		// convert entities --> dtos
		List<AccountDTO> dtos = modelMapper.map(accounts.getContent(), new TypeToken<List<AccountDTO>>() {}.getType());
		Page<AccountDTO> dtoPages= new PageImpl<>(dtos, pageable, accounts.getTotalElements());
		return dtoPages;
	}
	
	
	//Get Account by Id
	@GetMapping(value = "/{id}")
	public AccountDTO getAccountByID(@PathVariable(name = "id") int id) {
		Account entity = accountService.getAccountByID(id);

		// convert entity to dto
		AccountDTO dto = modelMapper.map(entity, AccountDTO.class);
		return dto;
	}
	
	// Check existsByName
	@GetMapping(value = "/username/{userName}/exists")
	public boolean existsByName(@PathVariable(name = "userName") String userName) {
		return accountService.isAccountExistsByUserName(userName);
	}
	
	//Create Account
	@PostMapping()
	public void createAccount(@RequestBody CreatingAccountForm form) {
		accountService.createAccount(form);
	}
	
	//Update Account
	@PutMapping(value = "/{id}")
//	@PreAuthorize("ADMIN")
	public void updateAccount(
			@PathVariable(name = "id") int id, 
			@RequestBody UpdatingAccountForm form) {
		form.setId(id);
		accountService.updateAccount(id,form);
	}
	
	//Update multiple Account set Department
	@PutMapping(value = "/departmentId/{departmentId}")
	public void updateMultipleAccounts(
			@PathVariable(name = "departmentId") int id,
			@RequestParam(name = "ids") List<Integer> ids) {
		
		accountService.updateMultipleAccounts(id,ids);
	}
	
	
	
	//Delete single Account
	@DeleteMapping(value = "/{id}")
	public void deleteAccount(@PathVariable(name = "id") int id) {
		accountService.deleteAccount(id);
	}
	
	//Delete multiple Accounts
	@DeleteMapping
	public void deleteAccounts(@RequestParam(name = "ids") List<Integer> ids) {
		accountService.deleteAccounts(ids);
	}

}
