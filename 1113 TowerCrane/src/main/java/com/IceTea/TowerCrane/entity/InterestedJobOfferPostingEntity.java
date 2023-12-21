package com.IceTea.TowerCrane.entity;

import com.IceTea.TowerCrane.dto.InterestedPostingDto;

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
@Entity(name="InterestedJobOfferPosting")
@Table(name="interested_job_offer_posting")
public class InterestedJobOfferPostingEntity {
	
	@Id
	private String interestedJobOfferPostingId;
	
	@ManyToOne(targetEntity = JobOfferPostingEntity.class)
	@JoinColumn(name = "jobOfferPostingId", referencedColumnName = "jobOfferPostingId", insertable=false, updatable=false)
	private JobOfferPostingEntity jobOfferPosting;
	
	@ManyToOne(targetEntity = JobSeekerEntity.class)
	@JoinColumn(name = "jsId", referencedColumnName = "jsId", insertable=false, updatable=false)
	private JobSeekerEntity jobSeeker;
	
	private String jobOfferPostingId;
	private String jsId;
	
	public InterestedJobOfferPostingEntity(InterestedPostingDto dto, String id) {
		this.interestedJobOfferPostingId = id;
		this.jobOfferPostingId = dto.getJobOfferPostingId();
		this.jsId = dto.getJsId();
	}

}
