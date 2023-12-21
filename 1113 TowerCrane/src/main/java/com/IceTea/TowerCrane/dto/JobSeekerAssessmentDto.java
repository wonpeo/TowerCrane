package com.IceTea.TowerCrane.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobSeekerAssessmentDto {
	private String jsId;
	private String contractId;
	private int tempWorkAttitude;
	private int tempJobPerformance;
	private int tempRehiredRate;
	private int tempAttendanceRate;
}
