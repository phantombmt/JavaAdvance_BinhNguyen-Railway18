package com.phantom.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.phantom.entity.Department;
import com.phantom.form.department.DepartmentFilterForm;
import com.phantom.repository.IDepartmentRepository;
import com.phantom.specification.department.DepartmentSpecification;
import com.phantom.form.department.UpdatingDepartmentForm;
import com.phantom.form.department.CreatingDepartmentForm;

@Service
@Transactional
public class DepartmentService implements IDepartmentService {

	@Autowired
	private IDepartmentRepository departmentRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Page<Department> getListDepartments(Pageable pageable, String search, DepartmentFilterForm filterForm) {
		Specification<Department> where = DepartmentSpecification.buildWhere(search, filterForm);
		return departmentRepository.findAll(where, pageable);
	}
	@Override
	public Department getDepartmentByID(int id) {
		return departmentRepository.findById(id).get();
	}

	public void createDepartment(CreatingDepartmentForm form) {
		
		// convert form to entity
		Department department = modelMapper.map(form, Department.class);
		
//		BeanUtils.copyProperties(form, department);
		
		departmentRepository.save(department);
	}
	
	public void updateDepartment(int id,UpdatingDepartmentForm form) {
		
		Department department = getDepartmentByID(id);
		// convert form to entity
		Department latestDepartment = modelMapper.map(form, Department.class);
		latestDepartment.setName(department.getName());
		latestDepartment.setCreatedDate(department.getCreatedDate());
		
		departmentRepository.save(latestDepartment);
	}
	@Override
	public void deleteDepartment(int id) {
		departmentRepository.deleteById(id);
	}
	@Override
	public boolean isDepartmentExistsByName(String departmentName) {
		// TODO Auto-generated method stub
		return departmentRepository.existsByName(departmentName);
	}
	@Override
	public void deleteDepartments(List<Integer> ids) {
		departmentRepository.deleteByIds(ids);
		
	}




}
