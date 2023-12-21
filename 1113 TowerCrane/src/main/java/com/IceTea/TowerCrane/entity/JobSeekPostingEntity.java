package com.IceTea.TowerCrane.entity;

import java.time.LocalDate;

import com.IceTea.TowerCrane.dto.InputJobSeekPostingDto;

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
@Entity(name="JobSeekPosting")
@Table(name="job_seek_posting")
public class JobSeekPostingEntity {
    @Id    
    private String jobSeekPostingId;    
    private int offerWage;  
    private boolean booked;

	@ManyToOne(targetEntity = JobSeekerEntity.class)
	@JoinColumn(name = "jsId", referencedColumnName = "jsId", insertable=false, updatable=false) 
	private JobSeekerEntity jobSeeker;  
	
	private String jsId;
	private LocalDate closingDate;
	
	public JobSeekPostingEntity(InputJobSeekPostingDto dto, String id) {
		this.jobSeekPostingId = id;
		this.offerWage = dto.getOfferWage();
		this.booked = false;
		this.jsId = dto.getJsId();
		this.closingDate = dto.getClosingDate();
	}
}
