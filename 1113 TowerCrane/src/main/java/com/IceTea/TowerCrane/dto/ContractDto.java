package com.IceTea.TowerCrane.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContractDto {
	private String jobOfferPostingId;
	private String jobSeekPostingId;
	private int offerWage;
	private String jsId;
	private String constructionSiteId;
}
