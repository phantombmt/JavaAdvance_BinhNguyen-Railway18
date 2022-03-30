package com.phantom.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table(name = "`Account`")
@Data
@NoArgsConstructor
public class Account {

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "username", length = 50, nullable = false, updatable = false)
	@NonNull
	private String userName;

	@Column(name = "password", length = 800, nullable = false)
	@NonNull
	private String password;

	@Column(name = "first_name", length = 50, nullable = false, updatable = false)
	@NonNull
	private String firstName;

	@Column(name = "last_name", length = 50, nullable = false, updatable = false)
	@NonNull
	private String lastName;

	@Formula(" concat(first_name, ' ',last_name) ")
	private String fullName;

	@Column(name = "role", columnDefinition = "ENUM('ADMIN','EMPLOYEE','MANAGER') default 'EMPLOYEE'")
	@Enumerated(EnumType.STRING)
	@NonNull
	private AccountRole role;

	public enum AccountRole {
		ADMIN, EMPLOYEE, MANAGER;

		public static AccountRole toEnum(String role) {
			for (AccountRole item : AccountRole.values()) {
				if (item.toString().equals(role)) {
					return item;
				}
			}
			return null;
		}

	}

	@ManyToOne
	@JoinColumn(name = "department_id")
	@NonNull
	private Department department;

	@PrePersist
	public void prePersist() {
		if (role == null) {
			role = AccountRole.EMPLOYEE;
		}

		if (password == null) {
			password = new BCryptPasswordEncoder().encode("123456");
		}
	}

}
