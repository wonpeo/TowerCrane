package com.IceTea.TowerCrane.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.ContractEntity;


@Repository
public interface ContractRepository extends JpaRepository<ContractEntity, String> {

	@Query(value = "select "
			+ "job_seeker.js_id, "
			+ "job_seeker.js_name, "
			+ "job_seeker.js_job_class, "
			+ "job_seeker.js_age, "
			+ "job_seeker.js_career, "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "contract.contract_id, "
			+ "contract.contract_wage, "
			+ "contract.contract_date "
			+ "from contract "
			+ "inner join construction_site "
			+ "on contract.construction_site_id = construction_site.construction_site_id "
			+ "inner join job_offerer "
			+ "on construction_site.jo_id = job_offerer.jo_id "
			+ "inner join job_seeker "
			+ "on contract.js_id = job_seeker.js_id "
			+ "where job_seeker.js_id = :jsId", nativeQuery = true)
	public List<ContractEntity> getJobSeekerBusinessRecord(@Param("jsId") String jsId);
	
	@Query(value = "select "
			+ "job_seeker.js_id, "
			+ "job_seeker.js_name, "
			+ "job_seeker.js_job_class, "
			+ "job_seeker.js_age, "
			+ "job_seeker.js_career, "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "contract.contract_id, "
			+ "contract.contract_wage, "
			+ "contract.contract_date "
			+ "from contract "
			+ "inner join construction_site "
			+ "on contract.construction_site_id = construction_site.construction_site_id "
			+ "inner join job_offerer "
			+ "on construction_site.jo_id = job_offerer.jo_id "
			+ "inner join job_seeker "
			+ "on contract.js_id = job_seeker.js_id "
			+ "where job_offerer.jo_id = :joId", nativeQuery = true)
	public List<ContractEntity> getJobOffererBusinessRecord(@Param("joId") String joId);
}
