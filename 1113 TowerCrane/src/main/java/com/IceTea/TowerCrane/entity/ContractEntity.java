package com.IceTea.TowerCrane.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

import com.IceTea.TowerCrane.dto.ContractDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="Contract")
@Table(name="contract")
public class ContractEntity {
    @Id
    private String contractId;
    private int contractWage;  
    private LocalDate contractDate;

    @ManyToOne(targetEntity = JobSeekerEntity.class)
	@JoinColumn(name = "jsId", referencedColumnName = "jsId", insertable=false, updatable=false) 
	private JobSeekerEntity jobSeeker;  

	@ManyToOne(targetEntity = ConstructionSiteEntity.class)
	@JoinColumn(name = "constructionSiteId", referencedColumnName = "constructionSiteId", insertable=false, updatable=false) 
	private ConstructionSiteEntity constructionSite;  
	
	private String jsId;
	private String constructionSiteId;

	
	
	public ContractEntity(ContractDto dto, String id) {
		this.contractId = id;
		this.contractWage = dto.getOfferWage();
		LocalDate today = LocalDate.now();
		this.contractDate = today;
		this.jsId = dto.getJsId();
		this.constructionSiteId = dto.getConstructionSiteId();
	}
}
