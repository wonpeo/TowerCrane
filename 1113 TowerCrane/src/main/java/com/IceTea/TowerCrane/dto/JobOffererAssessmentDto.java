package com.IceTea.TowerCrane.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobOffererAssessmentDto {
	private String joId;
	private String contractId;
	private int tempWagePaymentAbility;
	private int tempWorkEnvironment;
	private int tempWorkIntensity;
	private int tempOrderValidity;
}
