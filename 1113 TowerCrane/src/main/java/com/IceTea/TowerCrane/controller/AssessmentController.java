package com.IceTea.TowerCrane.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IceTea.TowerCrane.dto.JobOffererAssessmentDto;
import com.IceTea.TowerCrane.dto.JobSeekerAssessmentDto;
import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.service.AssessmentService;

@RestController
@RequestMapping("/api/Assessment")
public class AssessmentController {
	@Autowired AssessmentService assessmentService;

	@PostMapping("/JobSeekerAssessment")
	public ResponseDto<?> jobSeekerAssessment(@RequestBody JobSeekerAssessmentDto requestBody) {
		ResponseDto<?> result = assessmentService.jobSeekerAssessment(requestBody);
		return result;
	}
	
	@PostMapping("/JobOffererAssessment")
	public ResponseDto<?> jobOffererAssessment(@RequestBody JobOffererAssessmentDto requestBody) {
		ResponseDto<?> result = assessmentService.jobOffererAssessment(requestBody);
		return result;
	}
}
