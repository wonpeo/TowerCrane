package com.IceTea.TowerCrane.entity;

import com.IceTea.TowerCrane.dto.JobSeekerSignUpDto;

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
@Entity(name="Jobseeker")
@Table(name="job_seeker")
public class JobSeekerEntity {
	@Id
	private String jsId;
	private String jsPw;
	private String jsName;
	private String jsJobClass;
	private int jsAge;
	private int jsCareer;
	
	public JobSeekerEntity(JobSeekerSignUpDto dto) {
		this.jsId = dto.getJsId();
		this.jsPw = dto.getJsPw();
		this.jsName = dto.getJsName();
		this.jsJobClass = dto.getJsJobClass();
		this.jsAge = dto.getJsAge();
		this.jsCareer = dto.getJsCareer();
	}
}