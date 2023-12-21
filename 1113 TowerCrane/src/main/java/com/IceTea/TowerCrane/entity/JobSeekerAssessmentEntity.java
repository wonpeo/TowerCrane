package com.IceTea.TowerCrane.entity;

import com.IceTea.TowerCrane.dto.JobSeekerAssessmentDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="JobSeekerAssessment")
@Table(name="job_seeker_assessment")
public class JobSeekerAssessmentEntity {
    @Id
	private String jobSeekerAssessmentId;
	private int tempWorkAttitude;
	private int tempJobPerformance;
	private int tempRehiredRate;
	private int tempAttendanceRate;
	
	@ManyToOne(targetEntity = ContractEntity.class)
	@JoinColumn(name = "contractId", referencedColumnName = "contractId", insertable=false, updatable=false) 
	private ContractEntity contract;
	
	private String contractId;
	
	public JobSeekerAssessmentEntity(JobSeekerAssessmentDto dto, String jobSeekerAssessmentId) {
		this.jobSeekerAssessmentId = jobSeekerAssessmentId;
		this.contractId = dto.getContractId();
		this.tempWorkAttitude = dto.getTempWorkAttitude();
		this.tempJobPerformance = dto.getTempJobPerformance();
		this.tempRehiredRate = dto.getTempRehiredRate();
		this.tempAttendanceRate = dto.getTempAttendanceRate();
	}
}
