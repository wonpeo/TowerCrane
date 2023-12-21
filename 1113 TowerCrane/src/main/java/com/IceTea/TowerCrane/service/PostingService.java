package com.IceTea.TowerCrane.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IceTea.TowerCrane.dto.ContractDto;
import com.IceTea.TowerCrane.dto.InputJobOfferPostingDto;
import com.IceTea.TowerCrane.dto.InputJobSeekPostingDto;
import com.IceTea.TowerCrane.dto.InterestedPostingDto;
import com.IceTea.TowerCrane.dto.JobOfferPostingControlDto;
import com.IceTea.TowerCrane.dto.JobOffererSignInDto;
import com.IceTea.TowerCrane.dto.JobSeekPostingControlDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignInDto;
import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.entity.ContractEntity;
import com.IceTea.TowerCrane.entity.InterestedJobOfferPostingEntity;
import com.IceTea.TowerCrane.entity.InterestedJobSeekPostingEntity;
import com.IceTea.TowerCrane.entity.JobOfferPostingEntity;
import com.IceTea.TowerCrane.entity.JobSeekPostingEntity;
import com.IceTea.TowerCrane.repository.ContractRepository;
import com.IceTea.TowerCrane.repository.InterestedJobOfferPostingRepository;
import com.IceTea.TowerCrane.repository.InterestedJobSeekPostingRepository;
import com.IceTea.TowerCrane.repository.JobOfferPostingRepository;
import com.IceTea.TowerCrane.repository.JobOffererRepository;
import com.IceTea.TowerCrane.repository.JobSeekPostingRepository;
import com.IceTea.TowerCrane.repository.JobSeekerRepository;


@Service
public class PostingService {

	@Autowired JobSeekerRepository jobSeekerRepository;
	@Autowired JobOffererRepository jobOffererRepository;
	@Autowired JobSeekPostingRepository jobSeekPostingRepository;
	@Autowired JobOfferPostingRepository jobOfferPostingRepository;
	@Autowired InterestedJobSeekPostingRepository interestedJobSeekPostingRepository;
	@Autowired InterestedJobOfferPostingRepository interestedJobOfferPostingRepository;
	@Autowired ContractRepository contractRepository;
	
	public ResponseDto<List<JobSeekPostingEntity>> getJobSeekPostingList(){
		List<JobSeekPostingEntity> jobSeekPostingList = new ArrayList<JobSeekPostingEntity>();
		
		try {
			jobSeekPostingList = jobSeekPostingRepository.jobSeekPostingList();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseDto.setFaild("DB Error.");
		}
		
		return ResponseDto.setSuccess("Success", jobSeekPostingList);
	}
	
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingList(){
		List<JobOfferPostingEntity> jobOfferPostingList = new ArrayList<JobOfferPostingEntity>();
		
		try {
			jobOfferPostingList = jobOfferPostingRepository.jobOfferPostingList();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseDto.setFaild("DB Error.");
		}
		
		return ResponseDto.setSuccess("Success", jobOfferPostingList);
	}
	
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingListForNoob(){
		List<JobOfferPostingEntity> jobOfferPostingList = new ArrayList<JobOfferPostingEntity>();
		
		try {
			jobOfferPostingList = jobOfferPostingRepository.jobOfferPostingListForNoob();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseDto.setFaild("DB Error.");
		}
		
		return ResponseDto.setSuccess("Success", jobOfferPostingList);
	}
	
	public ResponseDto<List<JobSeekPostingEntity>> getJobSeekPostingListWithJsJobClass(JobSeekPostingControlDto dto){
		List<JobSeekPostingEntity> jobSeekPostingList = new ArrayList<JobSeekPostingEntity>();
		try {
			jobSeekPostingList = jobSeekPostingRepository.jobSeekPostingListWithJsJobClass(dto.getJsJobClass());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success", jobSeekPostingList);
	}
	
	public ResponseDto<List<JobSeekPostingEntity>> getJobSeekPostingListWithJsCareer(JobSeekPostingControlDto dto){
		List<JobSeekPostingEntity> jobSeekPostingList = new ArrayList<JobSeekPostingEntity>();
		try {
			jobSeekPostingList = jobSeekPostingRepository.jobSeekPostingListWithJsCareer(dto.getJsCareer());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success", jobSeekPostingList);
	}
	
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingListWithRequirementJobClass(JobOfferPostingControlDto dto){
		List<JobOfferPostingEntity> jobOfferPostingList = new ArrayList<JobOfferPostingEntity>();
		try {
			jobOfferPostingList = jobOfferPostingRepository.jobOfferPostingListWithRequirementJobClass(dto.getRequirementJobClass());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success", jobOfferPostingList);
	}
	
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingListWithLocation(JobOfferPostingControlDto dto){
		List<JobOfferPostingEntity> jobOfferPostingList = new ArrayList<JobOfferPostingEntity>();
		try {
			jobOfferPostingList = jobOfferPostingRepository.jobOfferPostingListWithLocation(dto.getLocation());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success", jobOfferPostingList);
	}
	
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingListWithRequiredCareer(JobOfferPostingControlDto dto){
		List<JobOfferPostingEntity> jobOfferPostingList = new ArrayList<JobOfferPostingEntity>();
		try {
			jobOfferPostingList = jobOfferPostingRepository.jobOfferPostingListWithRequiredCareer(dto.getRequiredCareer());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success", jobOfferPostingList);
	}
	
	//---------------------------------------Record----------------------------------------------------
	
	public ResponseDto<List<JobSeekPostingEntity>> getJobSeekPostingRecord(JobSeekerSignInDto dto){
		List<JobSeekPostingEntity> jobSeekPostingList = new ArrayList<JobSeekPostingEntity>();
		
		try {
			jobSeekPostingList = jobSeekPostingRepository.jobSeekPostingListWithJsId(dto.getJsId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", jobSeekPostingList);
	}
	
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingRecord(JobOffererSignInDto dto){
		List<JobOfferPostingEntity> jobOfferPostingList = new ArrayList<JobOfferPostingEntity>();
		
		try {
			jobOfferPostingList = jobOfferPostingRepository.jobOfferPostingListWithJoId(dto.getJoId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", jobOfferPostingList);
	}
	
	public ResponseDto<?> jobSeekPostingDelete(JobSeekPostingControlDto dto){
		if(!jobSeekPostingRepository.existsById(dto.getJobSeekPostingId())) {
			return ResponseDto.setFaild("No Data in DB.");
		}
		try {
			jobSeekPostingRepository.deleteById(dto.getJobSeekPostingId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		System.out.println("성공함");
		return ResponseDto.setSuccess("Success.", null);
	}
	
	public ResponseDto<?> jobOfferPostingDelete(JobOfferPostingControlDto dto){
		if(!jobOfferPostingRepository.existsById(dto.getJobOfferPostingId())) {
			return ResponseDto.setFaild("No Data in DB.");
		}
		try {
			jobOfferPostingRepository.deleteById(dto.getJobOfferPostingId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		System.out.println("성공함");
		return ResponseDto.setSuccess("Success.", null);
	}
	
	//---------------------------------------interested----------------------------------------------------
	
	public ResponseDto<?> inputInterestedJobSeekPosting(InterestedPostingDto dto){
		String interestedJobSeekPostingId = "IJSP_" + randomStringGenerator();
		if(dto.getJoId() == null) 
			return ResponseDto.setFaild("DB Error.");
		if(!jobOffererRepository.existsById(dto.getJoId()))
			return ResponseDto.setFaild("DB Error.");		
		try {
			InterestedJobSeekPostingEntity interestedJobSeekPostingEntity = new InterestedJobSeekPostingEntity(dto, interestedJobSeekPostingId);
			interestedJobSeekPostingRepository.save(interestedJobSeekPostingEntity);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", null);
	}
	
	public ResponseDto<?> inputInterestedJobOfferPosting(InterestedPostingDto dto){
		String interestedJobOfferPostingId = "IJOP_" + randomStringGenerator();
		if(dto.getJsId() == null)
			return ResponseDto.setFaild("DB Error.");
		if(!jobSeekerRepository.existsById(dto.getJsId()))
			return ResponseDto.setFaild("DB Error.");
		try {
			InterestedJobOfferPostingEntity interestedJobOfferPostingEntity = new InterestedJobOfferPostingEntity(dto, interestedJobOfferPostingId);
			interestedJobOfferPostingRepository.save(interestedJobOfferPostingEntity);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", null);
	}
	
	public ResponseDto<List<InterestedJobSeekPostingEntity>> getInterestedJobSeekPosting(InterestedPostingDto dto){
		List<InterestedJobSeekPostingEntity> interestedJobSeekPostingList = new ArrayList<InterestedJobSeekPostingEntity>();
		try {
			interestedJobSeekPostingList = interestedJobSeekPostingRepository.interestedJobSeekPostingWithJoId(dto.getJoId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", interestedJobSeekPostingList);
	}
	
	public ResponseDto<List<InterestedJobOfferPostingEntity>> getInterestedJobOfferPosting(InterestedPostingDto dto){
		List<InterestedJobOfferPostingEntity> interestedJobOfferPostingList = new ArrayList<InterestedJobOfferPostingEntity>();
		try {
			interestedJobOfferPostingList = interestedJobOfferPostingRepository.interestedJobOfferPostingWithJsId(dto.getJsId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", interestedJobOfferPostingList);
	}
	
	//---------------------------------------input----------------------------------------------------
	
	public ResponseDto<?> inputJobOfferPosting(InputJobOfferPostingDto dto){
		String jobOfferPostingId = "JOP_" + randomStringGenerator();
		try {
			JobOfferPostingEntity jobOfferPostingEntity = new JobOfferPostingEntity(dto, jobOfferPostingId);
			jobOfferPostingRepository.save(jobOfferPostingEntity);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", null);
	}
	
	public ResponseDto<?> inputJobSeekPosting(InputJobSeekPostingDto dto){
		String jobSeekPostingId = "JSP_" + randomStringGenerator();
		try {
			JobSeekPostingEntity jobSeekPostingEntity = new JobSeekPostingEntity(dto, jobSeekPostingId);
			jobSeekPostingRepository.save(jobSeekPostingEntity);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", null);
	}
	
	//---------------------------------------book----------------------------------------------------
	
	public ResponseDto<?> bookJobOfferPosting(ContractDto dto){
		String contractId = "contract_" + randomStringGenerator();
		if(!jobOfferPostingRepository.existsById(dto.getJobOfferPostingId()))
			return ResponseDto.setFaild("No Info In JobSeeker.");
		try {
			jobOfferPostingRepository.bookJobOfferPosting(dto.getJobOfferPostingId());
			ContractEntity contractEntity = new ContractEntity(dto, contractId);
			contractRepository.save(contractEntity);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", null);
	}
	
	public ResponseDto<?> bookJobSeekPosting(ContractDto dto){
		if(!jobSeekPostingRepository.existsById(dto.getJobSeekPostingId()))
			return ResponseDto.setFaild("No Info In JobSeeker.");
		try {
			jobSeekPostingRepository.bookJobOfferPosting(dto.getJobSeekPostingId());
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", null);
	}
	
	//---------------------------------------Etcetera----------------------------------------------------
	
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
