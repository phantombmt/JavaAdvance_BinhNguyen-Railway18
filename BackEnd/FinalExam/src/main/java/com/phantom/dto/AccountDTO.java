package com.phantom.dto;
import com.phantom.entity.Department;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;


@Data
@NoArgsConstructor
public class AccountDTO {
	
	@NonNull
	private int id;


	@NonNull
	private String userName;


//	@NonNull
//	private String password;
//
//
//	@NonNull
//	private String firstName;
//
//	@NonNull
//	private String lastName;
	
	@NonNull
	private String fullName;

	@NonNull
	private String role;
	
//	@NonNull
//	private int departmentId;
//	
//	@NonNull
//	private Department.DepartmentType departmentType;
	
	
	private String departmentName;
	


}
