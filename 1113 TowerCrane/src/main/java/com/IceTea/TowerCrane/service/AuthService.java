package com.IceTea.TowerCrane.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.dto.JobOffererSignInDto;
import com.IceTea.TowerCrane.dto.JobOffererSignInResponseDto;
import com.IceTea.TowerCrane.dto.JobOffererSignUpDto;

import com.IceTea.TowerCrane.dto.JobSeekerSignInDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignInResponseDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignUpDto;

import com.IceTea.TowerCrane.entity.JobOffererEntity;
import com.IceTea.TowerCrane.entity.JobSeekerEntity;

import com.IceTea.TowerCrane.repository.JobOffererRepository;
import com.IceTea.TowerCrane.repository.JobSeekerRepository;
import com.IceTea.TowerCrane.security.TokenProvider;

@Service
public class AuthService {
	//---------------------------------------------------------------------------------------------------------
	//구직자 jobSeeker 로그인/회원가입
	//DB 연동. 회원가입 기능.
	@Autowired JobSeekerRepository jobseekerRepository;
	@Autowired TokenProvider tokenProvider;
	
	public ResponseDto<?> jobSeekerSignUp(JobSeekerSignUpDto dto){
		String jobSeekerId = dto.getJsId();
		String jobSeekerPassword = dto.getJsPw();
		String jobSeekerPasswordCheck = dto.getJsPwCheck();
		
		//비밀번호 동일 체크.
		if(!jobSeekerPassword.equals(jobSeekerPasswordCheck))
			return ResponseDto.setFaild("Password does not Matched.");
		
		//ID 중복 확인
		try {
			if(jobseekerRepository.existsById(jobSeekerId))
				return ResponseDto.setFaild("Existed ID.");
		}catch (Exception error) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		
		//조건 성립한 경우, 구직자 엔티티 생성. 생성한 엔티티는 레포지토리에 입력.
		try {
			JobSeekerEntity jobSeekerEntity = new JobSeekerEntity(dto);
		
			//구직자 레포지토리 이용하여 엔티티를 DB에 입력/추가.
			jobseekerRepository.save(jobSeekerEntity);
		}catch (Exception error) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		
		//성공 후 메시지 출력.
		return ResponseDto.setSuccess("Sign Up Success", null);
	}
	
	public ResponseDto<JobSeekerSignInResponseDto> jobSeekerSignIn(JobSeekerSignInDto dto){
		String jsId = dto.getJsId();
		String jsPw = dto.getJsPw();
		
		try {
			boolean existed = jobseekerRepository.existsByJsIdAndJsPw(jsId, jsPw);
			if(!existed) {
				return ResponseDto.setFaild("Sign In Information Does Not Match");
			}
		} catch (Exception error) {
			return ResponseDto.setFaild("Database Error");
		}
		
		JobSeekerEntity jobseekerEntity = null;
		try {
			jobseekerEntity = jobseekerRepository.findById(jsId).orElse(null);
		} catch (Exception error) {
			return ResponseDto.setFaild("Database Error");
		}
		jobseekerEntity.setJsPw("");
		
		String token = tokenProvider.create(jsId);
		int exprTime = 3600000;
				
		JobSeekerSignInResponseDto signInResponseDto=new JobSeekerSignInResponseDto(token,exprTime,jobseekerEntity);

		return ResponseDto.setSuccess("Sign In Success", signInResponseDto);
	}
	//---------------------------------------------------------------------------------------------------------
	//구인자 jobOfferer 로그인/회원가입
	@Autowired JobOffererRepository jobOffererRepository;
	public ResponseDto<?> jobOffererSignUp(JobOffererSignUpDto dto){
		String jobOffererId = dto.getJoId();
		String jobOffererPassword = dto.getJoPw();
		String jobOffererPasswordCheck = dto.getJoPwCheck();
		
		if(!jobOffererPassword.equals(jobOffererPasswordCheck))
			return ResponseDto.setFaild("Password does not Matched.");
		
		try {
			if(jobOffererRepository.existsById(jobOffererId))
				return ResponseDto.setFaild("Existed ID.");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("Existed ID.");
		}
		
		try {
			JobOffererEntity jobOffererEntity = new JobOffererEntity(dto);
			jobOffererRepository.save(jobOffererEntity);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		
		return ResponseDto.setSuccess("Sign Up Success", null);
	}
	
	public ResponseDto<JobOffererSignInResponseDto> jobOffererSignIn(JobOffererSignInDto dto){
		String joId = dto.getJoId();
		String joPw = dto.getJoPw();
		
		try {
			boolean existed = jobOffererRepository.existsByJoIdAndJoPw(joId, joPw);
			if(!existed)
				return ResponseDto.setFaild("Sign In Information Does Not Match.");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		
		JobOffererEntity jobOffererEntity = null;
		
		try {
			jobOffererEntity = jobOffererRepository.findById(joId).orElse(null);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		
		jobOffererEntity.setJoPw("");
		String token = tokenProvider.create(joPw);
		int exprTime = 3600000;
		
		JobOffererSignInResponseDto signInResponseDto = new JobOffererSignInResponseDto(token, exprTime, jobOffererEntity);
		
		return ResponseDto.setSuccess("Sign In Success", signInResponseDto);
	}
	
}
