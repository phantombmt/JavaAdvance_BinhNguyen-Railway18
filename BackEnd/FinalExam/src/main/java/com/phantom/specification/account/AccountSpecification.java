package com.phantom.specification.account;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.phantom.entity.Account;
import com.phantom.entity.Department;
import com.phantom.form.account.AccountFilterForm;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class AccountSpecification {
	
	private static String formatSearch(String search) {
		search = search.trim();
		while (search.contains("  ")) {
			search = search.replace("  ", " ");		
		}
		return search;
	}

	@SuppressWarnings("deprecation")
	public static Specification<Account> buildWhere(String search, AccountFilterForm filterForm) {

		Specification<Account> where = null;

		// if there is searching by name
		if (!StringUtils.isEmpty(search)) {
			search = search.trim();
			CustomSpecification username = new CustomSpecification("username", search);
			CustomSpecification fullName = new CustomSpecification("fullname", search);
			where = Specification.where(username).or(fullName);
		}

		// if there is filter by DepartmentType
		if (filterForm != null && filterForm.getDepartmentName() != null) {
			CustomSpecification departmentName = new CustomSpecification("departmentName", filterForm.getDepartmentName());
			if (where == null) {
				where = departmentName;
			} else {
				where = where.and(departmentName);
			}
		}

		// if there is filter by AccountRole
		if (filterForm != null && filterForm.getRole() != null) {
			CustomSpecification accountRole = new CustomSpecification("role", filterForm.getRole());
			if (where == null) {
				where = accountRole;
			} else {
				where = where.and(accountRole);
			}
		}

		return where;

	}

}

@SuppressWarnings("serial")
@RequiredArgsConstructor // NonNull auto add param to Contructor
class CustomSpecification implements Specification<Account> {

	@NonNull
	private String field;
	@NonNull
	private Object value;

	@Override
	public Predicate toPredicate(Root<Account> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

		if (field.equalsIgnoreCase("username")) {
			// root.get("name as the same in class Account")
			return criteriaBuilder.like(root.get("userName"), "%" + value.toString() + "%");
		}

		if (field.equalsIgnoreCase("fullname")) {
			// root.get("name as the same in class Account")
			return criteriaBuilder.like(root.get("fullName"), "%" + value.toString() + "%");
		}

		if (field.equalsIgnoreCase("departmentName")) {

			return criteriaBuilder.equal(root.get("department").get("name"), value.toString());
		}

		if (field.equalsIgnoreCase("role")) {

			return criteriaBuilder.equal(root.get("role"), value);
		}
		
		return null;
	}
}
