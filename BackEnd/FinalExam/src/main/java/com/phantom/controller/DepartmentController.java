package com.phantom.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.phantom.dto.DepartmentDTO;
import com.phantom.entity.Department;
import com.phantom.form.department.CreatingDepartmentForm;
import com.phantom.form.department.DepartmentFilterForm;
import com.phantom.service.IDepartmentService;
import com.phantom.form.department.UpdatingDepartmentForm;



@RestController
@RequestMapping(value = "/api/v1/departments")
public class DepartmentController {
	@Autowired
	private IDepartmentService departmentService;

	@Autowired
	private ModelMapper modelMapper;
	
	
    //Get List Departments
	@GetMapping()
	public Page<DepartmentDTO> getListDepartments(Pageable pageable,
			@RequestParam(value = "search", required = false) String search, DepartmentFilterForm filterForm) {

		Page<Department> departments = departmentService.getListDepartments(pageable, search, filterForm);

		List<DepartmentDTO> dtos = modelMapper.map(departments.getContent(), new TypeToken<List<DepartmentDTO>>() {
		}.getType());
		Page<DepartmentDTO> dtoPages = new PageImpl<>(dtos, pageable, departments.getTotalElements());
		return dtoPages;
	}
	
	//Get Department By Id
	@GetMapping(value = "/{id}")
	public DepartmentDTO getDepartmentByID(@PathVariable(name = "id") int id) {
		Department entity = departmentService.getDepartmentByID(id);

		// convert entity to dto
		DepartmentDTO dto = modelMapper.map(entity, DepartmentDTO.class);
		return dto;
	}
	
	// Check existsByName
	@GetMapping(value = "/departmentName/{name}/exists")
	public boolean existsByName(@PathVariable(name = "name") String departmentName) {
		return departmentService.isDepartmentExistsByName(departmentName);
	}
	
	
	//Create Department
	@PostMapping()
	public void createDepartment(@RequestBody CreatingDepartmentForm form) {
		departmentService.createDepartment(form);
	}
	
	//Update Department
	@PutMapping(value = "/{id}")
	public void updateDepartment(
			@PathVariable(name = "id") int id, 
			@RequestBody UpdatingDepartmentForm form) {
		form.setId(id);
		departmentService.updateDepartment(id,form);
	}
	
	//Delete Department
	@DeleteMapping(value = "/{id}")
	public void deleteDepartment(@PathVariable(name = "id") int id) {
		departmentService.deleteDepartment(id);
	}
	
	//Delete multiple Departments
	@DeleteMapping
	public void deleteDepartments(@RequestParam(name = "ids") List<Integer> ids) {
		departmentService.deleteDepartments(ids);
	}

	

}
