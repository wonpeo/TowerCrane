package com.IceTea.TowerCrane.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobOfferPostingControlDto {

	private String jobOfferPostingId;
	private String requirementJobClass;
	private String location;
	private int requiredCareer;
	
}
