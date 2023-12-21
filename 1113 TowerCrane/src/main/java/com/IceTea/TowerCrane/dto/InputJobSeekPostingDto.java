package com.IceTea.TowerCrane.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InputJobSeekPostingDto {

	private String jsId;
	private int offerWage;
	private LocalDate closingDate;
	
}
