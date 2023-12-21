package com.IceTea.TowerCrane.entity;

import java.time.LocalDate;

import com.IceTea.TowerCrane.dto.InputJobOfferPostingDto;

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
@Entity(name="JobOfferPosting")
@Table(name="job_offer_posting")
public class JobOfferPostingEntity {
    @Id    
    private String jobOfferPostingId;    
    private String requirementJobClass;
	private int offerWage;
	private int requiredCareer;
	private boolean booked;

	@ManyToOne(targetEntity = ConstructionSiteEntity.class)
	@JoinColumn(name = "constructionSiteId", referencedColumnName = "constructionSiteId", insertable=false, updatable=false) 
	private ConstructionSiteEntity constructionSite;  
	
	private String constructionSiteId;
	private LocalDate closingDate;
	
	public JobOfferPostingEntity(InputJobOfferPostingDto dto, String id) {
		this.jobOfferPostingId = id;
		this.requirementJobClass = dto.getRequirementJobClass();
		this.offerWage = dto.getOfferWage();
		this.requiredCareer = dto.getRequiredCareer();
		this.booked = false;
		this.constructionSiteId = dto.getConstructionSiteId();
		this.closingDate = dto.getClosingDate();
	}
}
