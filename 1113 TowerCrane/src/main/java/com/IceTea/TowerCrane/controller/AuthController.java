package com.IceTea.TowerCrane.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IceTea.TowerCrane.dto.ResponseDto;

import com.IceTea.TowerCrane.dto.JobOffererSignInDto;
import com.IceTea.TowerCrane.dto.JobOffererSignInResponseDto;
import com.IceTea.TowerCrane.dto.JobOffererSignUpDto;

import com.IceTea.TowerCrane.dto.JobSeekerSignInDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignInResponseDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignUpDto;

import com.IceTea.TowerCrane.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired AuthService authService;
	
	
	//---------------------------------------------------------------------------------------------------------
	//구직자 jobSeeker 로그인/회원가입
	@PostMapping("/jobSeekerSignUp")
	public ResponseDto<?> jobSeekerSignUp(@RequestBody JobSeekerSignUpDto requestBody){
		ResponseDto<?> result = authService.jobSeekerSignUp(requestBody);
		System.out.println("성공 여부 확인용 Console 메시지/ 입력된 구직자 정보: " + requestBody.toString());
		return result;
	}
	
	@PostMapping("/jobSeekerSignIn")
	public ResponseDto<JobSeekerSignInResponseDto> jobSeekerSignIn(@RequestBody JobSeekerSignInDto requestBody){
		ResponseDto<JobSeekerSignInResponseDto> result = authService.jobSeekerSignIn(requestBody);
		return result;
	}
	//---------------------------------------------------------------------------------------------------------
	//구인자 jobOfferer 로그인/회원가입
	@PostMapping("/jobOffererSignUp")
	public ResponseDto<?> jobOffererSignUp(@RequestBody JobOffererSignUpDto requestBody){
		ResponseDto<?> result = authService.jobOffererSignUp(requestBody);
		System.out.println("성공 여부 확인용 Console 메시지/ 입력된 구직자 정보: " + requestBody.toString());
		return result;
	}
	
	@PostMapping("/jobOffererSignIn")
	public ResponseDto<JobOffererSignInResponseDto> jobOffererSignIn(@RequestBody JobOffererSignInDto requestBody){
		ResponseDto<JobOffererSignInResponseDto> result = authService.jobOffererSignIn(requestBody);
		return result;
	}
	//---------------------------------------------------------------------------------------------------------
}