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
@Entity(name="InterestedJobSeekPosting")
@Table(name="interested_job_seek_posting")
public class InterestedJobSeekPostingEntity {
	
	@Id
	private String interestedJobSeekPostingId;
	
	@ManyToOne(targetEntity = JobSeekPostingEntity.class)
	@JoinColumn(name = "jobSeekPostingId", referencedColumnName = "jobSeekPostingId", insertable=false, updatable=false)
	private JobSeekPostingEntity jobSeekPosting;
	
	@ManyToOne(targetEntity = JobOffererEntity.class)
	@JoinColumn(name = "joId", referencedColumnName = "joId", insertable=false, updatable=false)
	private JobOffererEntity jobOfferer;
	
	private String jobSeekPostingId;
	private String joId;
	
	public InterestedJobSeekPostingEntity(InterestedPostingDto dto, String id) {
		this.interestedJobSeekPostingId = id;
		this.jobSeekPostingId = dto.getJobSeekPostingId();
		this.joId = dto.getJoId();
	}

}
