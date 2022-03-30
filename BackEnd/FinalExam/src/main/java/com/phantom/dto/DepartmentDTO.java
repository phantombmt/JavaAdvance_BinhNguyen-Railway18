package com.phantom.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.phantom.entity.Department.DepartmentType;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class DepartmentDTO {
	
	private int id;
	
	private String name;
	
	private int totalMember;
	
	private DepartmentType type;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date createdDate;
	
	private List<AccountCustom> accounts;
	
	@Data
	@NoArgsConstructor
	static class AccountCustom{
		@JsonProperty("accountId")
		private int id;
		
		private String username;
	}
	
	
}
