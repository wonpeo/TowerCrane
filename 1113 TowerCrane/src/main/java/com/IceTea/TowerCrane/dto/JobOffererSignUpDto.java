package com.IceTea.TowerCrane.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobOffererSignUpDto {
	private String joId;
	private String joPw;
	private String joPwCheck;
	private String joName;
	private String companyName;
}
