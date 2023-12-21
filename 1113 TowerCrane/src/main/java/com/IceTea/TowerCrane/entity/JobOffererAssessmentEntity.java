package com.IceTea.TowerCrane.entity;

import com.IceTea.TowerCrane.dto.JobOffererAssessmentDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="JobOffererAssessment")
@Table(name="job_offerer_assessment")
public class JobOffererAssessmentEntity {
    @Id
    private String jobOffererAssessmentId;    
    private int tempWagePaymentAbility;  
    private int tempWorkEnvironment;  
    private int tempWorkIntensity;  
	private int tempOrderValidity;

	@ManyToOne(targetEntity = ContractEntity.class)
	@JoinColumn(name = "contractId", referencedColumnName = "contractId", insertable=false, updatable=false) 
	private ContractEntity contract;
	
	private String contractId;
	
	public JobOffererAssessmentEntity(JobOffererAssessmentDto dto, String jobOffererAssessmentId) {
		this.jobOffererAssessmentId = jobOffererAssessmentId;
		this.contractId = dto.getContractId();
		this.tempWagePaymentAbility = dto.getTempWagePaymentAbility();
		this.tempWorkEnvironment = dto.getTempWorkEnvironment();
		this.tempWorkIntensity = dto.getTempWorkIntensity();
		this.tempOrderValidity = dto.getTempOrderValidity();
	}
}
