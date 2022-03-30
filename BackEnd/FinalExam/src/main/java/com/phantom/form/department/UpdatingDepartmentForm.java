package com.phantom.form.department;

import com.phantom.entity.Department.DepartmentType;
import com.phantom.form.department.UpdatingDepartmentForm;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingDepartmentForm {
	
	private int id;
	
	private DepartmentType type;
}
