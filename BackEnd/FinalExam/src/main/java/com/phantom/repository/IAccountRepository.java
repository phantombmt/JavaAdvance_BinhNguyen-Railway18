package com.phantom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.phantom.entity.Account;

@Repository
public interface IAccountRepository extends JpaRepository<Account, Integer>,JpaSpecificationExecutor<Account> {

	boolean existsByUserName(String userName);
	
	Account findByUserName(String username);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM Account WHERE id IN(:ids)")
	void deleteByIds(List<Integer> ids);

	@Modifying
	@Transactional
	@Query(value="UPDATE FinalJavaAdvance.Account SET department_id =:id WHERE id IN (:ids)",nativeQuery=true)
	void updateByIds( int id,List<Integer> ids);

}
