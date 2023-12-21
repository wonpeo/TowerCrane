package com.IceTea.TowerCrane.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.entity.JobOfferPostingEntity;
import com.IceTea.TowerCrane.repository.JobOfferPostingRepository;

@Service
public class MainPageListService {
	
	@Autowired JobOfferPostingRepository jobOfferPostingRepository;
	
	public ResponseDto<List<JobOfferPostingEntity>> getTop4OfferWageJobOfferPostingSelectedByWagePaymentAbility() {
		List<JobOfferPostingEntity> JobOfferPostingList = new ArrayList<JobOfferPostingEntity>();
		
		try {
			JobOfferPostingList = jobOfferPostingRepository.top4OfferWageJobOfferPostingSelectedByWagePaymentAbility();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", JobOfferPostingList);
	}
	
	public ResponseDto<List<JobOfferPostingEntity>> getTop4OfferWageJobOfferPostingSelectedByWorkEnvironment() {
		List<JobOfferPostingEntity> JobOfferPostingList = new ArrayList<JobOfferPostingEntity>();
		
		try {
			JobOfferPostingList = jobOfferPostingRepository.top4OfferWageJobOfferPostingSelectedByWorkEnvironment();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", JobOfferPostingList);
	}
	
	public ResponseDto<List<JobOfferPostingEntity>> getTop4OfferWageJobOfferPostingSelectedByWorkIntensity() {
		List<JobOfferPostingEntity> JobOfferPostingList = new ArrayList<JobOfferPostingEntity>();
		
		try {
			JobOfferPostingList = jobOfferPostingRepository.top4OfferWageJobOfferPostingSelectedByWorkIntensity();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", JobOfferPostingList);
	}
	
	public ResponseDto<List<JobOfferPostingEntity>> getTop4OfferWageJobOfferPostingSelectedByOrderValidity() {
		List<JobOfferPostingEntity> JobOfferPostingList = new ArrayList<JobOfferPostingEntity>();
		
		try {
			JobOfferPostingList = jobOfferPostingRepository.top4OfferWageJobOfferPostingSelectedByOrderValidity();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Success.", JobOfferPostingList);
	}
}
