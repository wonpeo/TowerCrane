package com.IceTea.TowerCrane.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobSeekerSignUpDto {
	private String jsId;
	private String jsPw;
	private String jsPwCheck;
	private String jsName;
	private String jsJobClass;
	private int jsAge;
	private int jsCareer;
}
