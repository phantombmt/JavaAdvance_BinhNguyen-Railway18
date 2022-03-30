package com.phantom.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.phantom.entity.Department;
import com.phantom.form.department.DepartmentFilterForm;
import com.phantom.form.department.UpdatingDepartmentForm;
import com.phantom.form.department.CreatingDepartmentForm;

public interface IDepartmentService {
	
	Page<Department> getListDepartments(Pageable pageable, String search,DepartmentFilterForm filterForm);
	
	public void createDepartment(CreatingDepartmentForm form);

	Department getDepartmentByID(int id);

	void updateDepartment(int id,UpdatingDepartmentForm form);

	void deleteDepartment(int id);

	boolean isDepartmentExistsByName(String departmentName);

	void deleteDepartments(List<Integer> ids);
}
