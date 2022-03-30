package com.phantom.entity;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.print.attribute.standard.DateTimeAtCompleted;

import org.hibernate.annotations.CreationTimestamp;

import com.phantom.entity.Account.AccountRole;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table(name = "Department")
@Data
@NoArgsConstructor
public class Department {

	

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "name", length = 50, nullable = false)
	@NonNull
	private String name;

	@Column(name = "total_member")
	private int totalMember;

	@Column(name = "type", columnDefinition = "ENUM('Dev', 'Test', 'Scrum_Master', 'PM','Bridge_SE')")
	@Enumerated(EnumType.STRING)
	@NonNull
	private DepartmentType type;

	public enum DepartmentType {
		Dev, Test, Scrum_Master, PM, Bridge_SE;

		public static DepartmentType toEnum(String type) {
			for (DepartmentType item : DepartmentType.values()) {
				if (item.toString().equals(type))
					return item;
			}
			return null;
		}
	}

	@Column(name = "created_date")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@NonNull
	private Date createdDate;

	@OneToMany(mappedBy = "department")
	private List<Account> accounts;
	
	@PrePersist
	public void prePersist() {

	}

}
