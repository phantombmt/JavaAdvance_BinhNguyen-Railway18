package com.phantom.controller;

import java.security.Principal;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phantom.dto.auth.LoginInfoDto;
import com.phantom.entity.Account;
import com.phantom.service.IAccountService;

@RestController
@RequestMapping(value = "api/v1/auth")
public class AuthController {

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private IAccountService service;

	@GetMapping("/login")
	public LoginInfoDto login(Principal principal) {

		String username = principal.getName();
		
		Account entity = service.getAccountByUserName(username);

		// convert entity --> dto
		LoginInfoDto dto = modelMapper.map(entity, LoginInfoDto.class);

		return dto;
	}
}
