package com.IceTea.TowerCrane.dto;

import com.IceTea.TowerCrane.entity.JobOffererEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobOffererSignInResponseDto {
	private String token;
	private int exprTime;
	private JobOffererEntity JobOfferer;
}
