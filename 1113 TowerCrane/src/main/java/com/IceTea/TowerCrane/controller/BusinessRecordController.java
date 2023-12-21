package com.IceTea.TowerCrane.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IceTea.TowerCrane.dto.JobOffererSignInDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignInDto;
import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.entity.ContractEntity;
import com.IceTea.TowerCrane.service.BusinessRecordService;

@RestController
@RequestMapping("/api/businessRecord")
public class BusinessRecordController {
	@Autowired BusinessRecordService businessRecordService;
	
	@PostMapping("/jobSeekerBusinessRecord")
	public ResponseDto<List<ContractEntity>> getJobSeekerBusinessRecord(@RequestBody JobSeekerSignInDto requestBody){
		return businessRecordService.getJobSeekerBusinessRecord(requestBody);
	}
	
	@PostMapping("/jobOffererBusinessRecord")
	public ResponseDto<List<ContractEntity>> getJobOffererBusinessRecord(@RequestBody JobOffererSignInDto requestBody){
		return businessRecordService.getJobOffererBusinessRecord(requestBody);
	}

}
