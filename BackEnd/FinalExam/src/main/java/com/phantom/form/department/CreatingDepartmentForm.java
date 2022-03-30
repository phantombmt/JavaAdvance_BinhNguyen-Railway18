package com.phantom.form.department;

import java.util.List;


import com.phantom.entity.Department.DepartmentType;
import com.phantom.form.department.CreatingDepartmentForm;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingDepartmentForm {
	
	private String name;
	
	private DepartmentType type;
	
//	private List<Account> accounts;
//	
//	@Data
//	@NoArgsConstructor
//	public static class Account{
//		private String userName;
//		private String firstName;
//		private String lastName;
//	}
}
