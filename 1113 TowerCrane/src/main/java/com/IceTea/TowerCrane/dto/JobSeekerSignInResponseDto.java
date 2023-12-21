package com.IceTea.TowerCrane.dto;

import com.IceTea.TowerCrane.entity.JobSeekerEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobSeekerSignInResponseDto {
	private String token;
	private int exprTime;
	private JobSeekerEntity JobSeeker;
}
