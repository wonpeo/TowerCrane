package com.IceTea.TowerCrane.entity;

import com.IceTea.TowerCrane.dto.JobOffererSignUpDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="JobOfferer")
@Table(name="job_offerer")
public class JobOffererEntity {
    @Id
    private String joId;
    private String joPw;
    private String joName;
    private String companyName; 
    private int wagePaymentAbility; 
    private int workEnvironment; 
    private int workIntensity; 
    private int orderValidity;  
    
    public JobOffererEntity(JobOffererSignUpDto dto) {
    	this.joId = dto.getJoId();
		this.joPw = dto.getJoPw();
		this.joName = dto.getJoName();
		this.companyName = dto.getCompanyName();
    }
}
