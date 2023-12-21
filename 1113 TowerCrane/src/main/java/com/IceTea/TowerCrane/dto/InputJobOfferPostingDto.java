package com.IceTea.TowerCrane.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InputJobOfferPostingDto {
	
	private String requirementJobClass;
	private int offerWage;
	private int requiredCareer;
	private String constructionSiteId;
	private LocalDate closingDate;
	
}
