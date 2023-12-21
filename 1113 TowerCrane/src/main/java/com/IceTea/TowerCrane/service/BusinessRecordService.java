package com.IceTea.TowerCrane.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IceTea.TowerCrane.dto.JobOffererSignInDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignInDto;
import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.entity.ContractEntity;
import com.IceTea.TowerCrane.repository.ContractRepository;

@Service
public class BusinessRecordService {
	
	@Autowired ContractRepository contractRepository;
	
	public ResponseDto<List<ContractEntity>> getJobSeekerBusinessRecord(JobSeekerSignInDto dto){
		List<ContractEntity> contractList = new ArrayList<ContractEntity>();
		
		try {
			contractList = contractRepository.getJobSeekerBusinessRecord(dto.getJsId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", contractList);
	}
	
	public ResponseDto<List<ContractEntity>> getJobOffererBusinessRecord(JobOffererSignInDto dto){
		List<ContractEntity> contractList = new ArrayList<ContractEntity>();
		
		try {
			contractList = contractRepository.getJobOffererBusinessRecord(dto.getJoId());
		} catch (Exception e) {
			return ResponseDto.setFaild("DB Error.");
			// TODO: handle exception
		}
		return ResponseDto.setSuccess("Success.", contractList);
	}

}
