package com.IceTea.TowerCrane.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobSeekPostingControlDto {
	
	private String jobSeekPostingId;
	private int jsCareer;
	private String jsJobClass;

}
