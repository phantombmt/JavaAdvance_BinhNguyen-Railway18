package com.phantom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.phantom.entity.Department;

@Repository
public interface IDepartmentRepository extends JpaRepository<Department, Integer>,JpaSpecificationExecutor<Department> {

	boolean existsByName(String departmentName);

	@Modifying
	@Transactional
	@Query("DELETE FROM Department WHERE id IN(:ids)")
	void deleteByIds(List<Integer> ids);

}
