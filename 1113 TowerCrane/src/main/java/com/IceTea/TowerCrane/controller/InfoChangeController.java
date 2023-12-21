package com.IceTea.TowerCrane.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IceTea.TowerCrane.dto.JobOffererSignInDto;
import com.IceTea.TowerCrane.dto.JobOffererSignUpDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignInDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignUpDto;
import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.service.InfoChangeService;

@RestController
@RequestMapping("/api/InfoChange")
public class InfoChangeController {
	
	@Autowired InfoChangeService infoChangeService;
	
	@PostMapping("/jobSeekerInfoChange")
	public ResponseDto<?> jobSeekerInfoChange(@RequestBody JobSeekerSignUpDto requestBody){
		ResponseDto<?> result = infoChangeService.jobSeekerInfoChange(requestBody);
		System.out.println("성공 여부 확인용 Console 메시지/ 입력된 구직자 정보: " + result.toString());
		return result;
	}
	
	@PostMapping("/jobOffererInfoChange")
	public ResponseDto<?> jobOffererInfoChange(@RequestBody JobOffererSignUpDto requestBody){
		ResponseDto<?> result = infoChangeService.jobOffererInfoChange(requestBody);
		return result;
	}
	
	@PostMapping("/jobSeekerDelete")
	public ResponseDto<?> jobSeekerDelete(@RequestBody JobSeekerSignInDto requestBody){
		ResponseDto<?> result = infoChangeService.jobSeekerDelete(requestBody);
		return result;
	}
	
	@PostMapping("/jobOffererDelete")
	public ResponseDto<?> jobOffererDelete(@RequestBody JobOffererSignInDto requestBody){
		ResponseDto<?> result = infoChangeService.jobOffererDelete(requestBody);
		return result;
	}
}