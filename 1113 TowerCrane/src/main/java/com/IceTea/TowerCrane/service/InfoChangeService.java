package com.IceTea.TowerCrane.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IceTea.TowerCrane.dto.JobOffererSignInDto;
import com.IceTea.TowerCrane.dto.JobOffererSignUpDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignInDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignUpDto;
import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.repository.JobOffererRepository;
import com.IceTea.TowerCrane.repository.JobSeekerRepository;

@Service
public class InfoChangeService {

	@Autowired JobSeekerRepository jobSeekerRepository;
	@Autowired JobOffererRepository jobOffererRepository;
	
	public ResponseDto<?> jobSeekerInfoChange(JobSeekerSignUpDto dto){
		
		String jobSeekerId = dto.getJsId();
		String jobSeekerName = dto.getJsName();
		String jobSeekerJobClass = dto.getJsJobClass();
		int jobSeekerAge = dto.getJsAge();
		int jobSeekerCareer = dto.getJsCareer();
		
		try {
			if(!jobSeekerRepository.existsById(jobSeekerId))
				return ResponseDto.setFaild("No Info In JobSeeker.");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		try {
			jobSeekerRepository.jobSeekerInfoChange(jobSeekerId, jobSeekerName, jobSeekerJobClass, jobSeekerAge, jobSeekerCareer); 
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		
		return ResponseDto.setSuccess("Sign Up Success", null);
	}
	
	public ResponseDto<?> jobOffererInfoChange(JobOffererSignUpDto dto){
		String jobOffererId = dto.getJoId();
		String jobOffererName = dto.getJoName();
		String companyName = dto.getCompanyName();
		
		try {
			if(!jobOffererRepository.existsById(jobOffererId))
				return ResponseDto.setFaild("No Info In JobOfferer.");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		
		try {
			jobOffererRepository.jobOffererInfoChange(jobOffererId, jobOffererName, companyName); 
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		
		return ResponseDto.setSuccess("Sign Up Success", null);
	}
	
	//------------------------------회원탈퇴----------------------------------
	
	public ResponseDto<?> jobSeekerDelete(JobSeekerSignInDto dto){
		if(!jobSeekerRepository.existsById(dto.getJsId())) 
			return ResponseDto.setFaild("No Info In JobSeeker.");
		try {
			jobSeekerRepository.deleteById(dto.getJsId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Sign Up Success", null);
	}
	
	public ResponseDto<?> jobOffererDelete(JobOffererSignInDto dto){
		if(!jobOffererRepository.existsById(dto.getJoId()))
			return ResponseDto.setFaild("No Info In JobOfferer.");
		try {
			jobOffererRepository.deleteById(dto.getJoId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Sign Up Success", null);
	}
}
