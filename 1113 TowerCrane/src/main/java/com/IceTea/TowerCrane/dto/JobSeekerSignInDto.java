package com.IceTea.TowerCrane.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobSeekerSignInDto {
	@NotBlank
	private String jsId;
	@NotBlank
	private String jsPw;
}
