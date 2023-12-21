package com.IceTea.TowerCrane.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IceTea.TowerCrane.dto.JobOffererAssessmentDto;
import com.IceTea.TowerCrane.dto.JobSeekerAssessmentDto;
import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.entity.JobOffererAssessmentEntity;
import com.IceTea.TowerCrane.entity.JobSeekerAssessmentEntity;
import com.IceTea.TowerCrane.repository.JobOffererAssessmentRepository;
import com.IceTea.TowerCrane.repository.JobOffererRepository;
import com.IceTea.TowerCrane.repository.JobSeekerRepository;
import com.IceTea.TowerCrane.repository.JobSeekerAssessmentRepository;


@Service
public class AssessmentService {

	@Autowired JobSeekerAssessmentRepository jsAssessmentRepository;
	@Autowired JobOffererAssessmentRepository joAssessmentRepository;
	@Autowired JobSeekerRepository jobSeekerRepository;
	@Autowired JobOffererRepository jobOffererRepository;
	
	public ResponseDto<?> jobSeekerAssessment(JobSeekerAssessmentDto dto) {
		String jobSeekerAssessmentId = "JSA_" + randomStringGenerator();
		try {
			JobSeekerAssessmentEntity jobSeekerAssessmentEntity = new JobSeekerAssessmentEntity(dto, jobSeekerAssessmentId);
			jsAssessmentRepository.save(jobSeekerAssessmentEntity);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		try {
			System.out.println(dto);
			jobSeekerRepository.updateJobSeekerAssessment(dto.getJsId());
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("여기문제");
			return ResponseDto.setFaild("DB Error.");
		}
		
		return ResponseDto.setSuccess("Sign Up Success", null);
	}
	
	public ResponseDto<?> jobOffererAssessment(JobOffererAssessmentDto dto) {
		String jobOffererAssessmentId = "JOA_" + randomStringGenerator();
		try {
			JobOffererAssessmentEntity jobOffererAssessmentEntity = new JobOffererAssessmentEntity(dto, jobOffererAssessmentId);
			joAssessmentRepository.save(jobOffererAssessmentEntity);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		try {
			jobOffererRepository.updateJobOffererAssessment(dto.getJoId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		
		return ResponseDto.setSuccess("Sign Up Success", null);
	}
	
	public String randomStringGenerator() {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 6;
		Random random = new Random();

		String generatedString  = random.ints(leftLimit,rightLimit + 1)
		  .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
		  .limit(targetStringLength)
		  .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
		  .toString();
		
		return generatedString;
	}
}
