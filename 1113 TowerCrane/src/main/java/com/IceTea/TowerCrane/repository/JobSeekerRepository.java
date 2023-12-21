package com.IceTea.TowerCrane.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.JobSeekerEntity;

import jakarta.transaction.Transactional;

@Repository
public interface JobSeekerRepository extends JpaRepository<JobSeekerEntity, String> {
	
    public boolean existsByJsIdAndJsPw(String jsId, String jsPw);
    
    public List<JobSeekerEntity> findByOrderByJsIdDesc();
    
    @Modifying
    @Transactional
    @Query(value = "update job_seeker "
    		+ "set js_name = :jsName, "
    		+ "js_job_class = :jsJobClass, "
    		+ "js_age = :jsAge, "
    		+ "js_career = :jsCareer "
    		+ "where js_id = :jsId", nativeQuery = true)
	public void jobSeekerInfoChange(@Param("jsId") String jsId, @Param("jsName") String jsName, @Param("jsJobClass") String jsJobClass, @Param("jsAge") int jsAge, @Param("jsCareer") int jsCareer);
    
    @Modifying
    @Transactional
    @Query(value = "update job_seeker "
    		+ "set "
    		+ "work_attitude = (select avg(temp_work_attitude) from job_seeker_assessment inner join contract on contract.contract_id = job_seeker_assessment.contract_id where contract.js_id = :jsId), "
    		+ "job_performance = (select avg(temp_job_performance) from job_seeker_assessment inner join contract on contract.contract_id = job_seeker_assessment.contract_id where contract.js_id = :jsId), "
    		+ "rehired_rate = (select avg(temp_rehired_rate) from job_seeker_assessment inner join contract on contract.contract_id = job_seeker_assessment.contract_id where contract.js_id = :jsId), "
    		+ "attendance_rate = (select avg(temp_attendance_rate) from job_seeker_assessment inner join contract on contract.contract_id = job_seeker_assessment.contract_id where contract.js_id = :jsId) "
    		+ "where js_id = :jsId", nativeQuery = true )
    public void updateJobSeekerAssessment(@Param("jsId") String jsId);

}
