package com.IceTea.TowerCrane.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.JobOffererEntity;

import jakarta.transaction.Transactional;

@Repository
public interface JobOffererRepository extends JpaRepository<JobOffererEntity, String> {

	public boolean existsByJoIdAndJoPw(String joId, String JoPw);
	
	@Modifying
	@Transactional
	@Query(value = "update job_offerer "
    		+ "set jo_name = :joName, "
    		+ "company_name = :companyName "
    		+ "where jo_id = :joId", nativeQuery = true)
	public void jobOffererInfoChange(@Param("joId") String joId, @Param("joName") String joName,@Param("companyName") String companyName);
	
	@Modifying
	@Transactional
    @Query(value = "update job_offerer "
    		+ "set "
    		+ "wage_payment_ability = (select avg(temp_wage_payment_ability) from job_offerer_assessment inner join contract on contract.contract_id = job_offerer_assessment.contract_id inner join construction_site on contract.construction_site_id = construction_site.construction_site_id where construction_site.jo_id = :joId ), "
    		+ "work_environment = (select avg(temp_work_environment) from job_offerer_assessment inner join contract on contract.contract_id = job_offerer_assessment.contract_id inner join construction_site on contract.construction_site_id = construction_site.construction_site_id where construction_site.jo_id = :joId ), "
    		+ "work_intensity = (select avg(temp_work_intensity) from job_offerer_assessment inner join contract on contract.contract_id = job_offerer_assessment.contract_id inner join construction_site on contract.construction_site_id = construction_site.construction_site_id where construction_site.jo_id = :joId ), "
    		+ "order_validity = (select avg(temp_order_validity) from job_offerer_assessment inner join contract on contract.contract_id = job_offerer_assessment.contract_id inner join construction_site on contract.construction_site_id = construction_site.construction_site_id where construction_site.jo_id = :joId ) "
    		+ "where jo_id = :joId", nativeQuery = true )
	public void updateJobOffererAssessment(@Param("joId") String joId);
}
