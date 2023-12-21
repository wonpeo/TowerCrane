package com.IceTea.TowerCrane.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IceTea.TowerCrane.dto.ContractDto;
import com.IceTea.TowerCrane.dto.InputJobOfferPostingDto;
import com.IceTea.TowerCrane.dto.InputJobSeekPostingDto;
import com.IceTea.TowerCrane.dto.InterestedPostingDto;
import com.IceTea.TowerCrane.dto.JobOfferPostingControlDto;
import com.IceTea.TowerCrane.dto.JobOffererSignInDto;
import com.IceTea.TowerCrane.dto.JobSeekPostingControlDto;
import com.IceTea.TowerCrane.dto.JobSeekerSignInDto;
import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.entity.InterestedJobOfferPostingEntity;
import com.IceTea.TowerCrane.entity.InterestedJobSeekPostingEntity;
import com.IceTea.TowerCrane.entity.JobOfferPostingEntity;
import com.IceTea.TowerCrane.entity.JobSeekPostingEntity;
import com.IceTea.TowerCrane.service.PostingService;

@RestController
@RequestMapping("/api")
public class PostingController {

	@Autowired PostingService postingService;
	
	@GetMapping("/jobSeekPostingList")
	public ResponseDto<List<JobSeekPostingEntity>> getJobSeekPostingList() {
		return postingService.getJobSeekPostingList();
	}
	
	@GetMapping("/jobOfferPostingList")
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingList() {
		return postingService.getJobOfferPostingList();
	}
	
	@GetMapping("/jobOfferPostingListForNoob")
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingListForNoob() {
		return postingService.getJobOfferPostingListForNoob();
	}
	
	@PostMapping("jobSeekPostingListWithJsJobClass")
	public ResponseDto<List<JobSeekPostingEntity>> getJobSeekPostingListWithJsJobClass(@RequestBody JobSeekPostingControlDto requestBody) {
		return postingService.getJobSeekPostingListWithJsJobClass(requestBody);
	}
	
	@PostMapping("jobSeekPostingListWithJsCareer")
	public ResponseDto<List<JobSeekPostingEntity>> getJobSeekPostingListWithJsCareer(@RequestBody JobSeekPostingControlDto requestBody) {
		return postingService.getJobSeekPostingListWithJsCareer(requestBody);
	}
	
	@PostMapping("jobOfferPostingListWithRequirementJobClass")
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingListWithRequirementJobClass(@RequestBody JobOfferPostingControlDto requestBody) {
		return postingService.getJobOfferPostingListWithRequirementJobClass(requestBody);
	}
	
	@PostMapping("jobOfferPostingListWithLocation")
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingListWithLocation(@RequestBody JobOfferPostingControlDto requestBody) {
		return postingService.getJobOfferPostingListWithLocation(requestBody);
	}
	
	@PostMapping("jobOfferPostingListWithRequiredCareer")
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingListWithRequiredCareer(@RequestBody JobOfferPostingControlDto requestBody) {
		return postingService.getJobOfferPostingListWithRequiredCareer(requestBody);
	}
	
	//---------------------------------------Record----------------------------------------------------
	
	@PostMapping("/jobSeekPostingRecord")
	public ResponseDto<List<JobSeekPostingEntity>> getJobSeekPostingRecord(@RequestBody JobSeekerSignInDto requestBody){
		return postingService.getJobSeekPostingRecord(requestBody);
	}
	
	@PostMapping("/jobOfferPostingRecord")
	public ResponseDto<List<JobOfferPostingEntity>> getJobOfferPostingRecord(@RequestBody JobOffererSignInDto requestBody){
		return postingService.getJobOfferPostingRecord(requestBody);
	}

	@PostMapping("/deleteJobSeekPosting")
	public ResponseDto<?> jobSeekPostingDelete(@RequestBody JobSeekPostingControlDto requestBody){
		return postingService.jobSeekPostingDelete(requestBody);
	}
	
	@PostMapping("/deleteJobOffererPosting")
	public ResponseDto<?> jobOfferPostingDelete(@RequestBody JobOfferPostingControlDto requestBody){
		return postingService.jobOfferPostingDelete(requestBody);
	}
	
	//---------------------------------------interested----------------------------------------------------
	
	@PostMapping("/inputInterestedJobSeekPosting")
	public ResponseDto<?> inputInterestedJobSeekPosting(@RequestBody InterestedPostingDto requestBody){
		return postingService.inputInterestedJobSeekPosting(requestBody);
	}
	
	@PostMapping("/inputInterestedJobOfferPosting")
	public ResponseDto<?> inputInterestedJobOfferPosting(@RequestBody InterestedPostingDto requestBody){
		return postingService.inputInterestedJobOfferPosting(requestBody);
	}
	
	@PostMapping("/interestedjobSeekPostingList")
	public ResponseDto<List<InterestedJobSeekPostingEntity>> getInterestedJobSeekPosting(@RequestBody InterestedPostingDto requestBody){
		return postingService.getInterestedJobSeekPosting(requestBody);
	}
	
	@PostMapping("/interestedjobOfferPostingList")
	public ResponseDto<List<InterestedJobOfferPostingEntity>> getInterestedJobOfferPosting(@RequestBody InterestedPostingDto requestBody){
		return postingService.getInterestedJobOfferPosting(requestBody);
	}
	
	//---------------------------------------input----------------------------------------------------
	
	@PostMapping("/inputJobOfferPosting")
	public ResponseDto<?> inputJobOfferPosting(@RequestBody InputJobOfferPostingDto requestBody){
		return postingService.inputJobOfferPosting(requestBody);
	}
	
	@PostMapping("/inputJobSeekPosting")
	public ResponseDto<?> inputJobSeekPosting(@RequestBody InputJobSeekPostingDto requestBody){
		return postingService.inputJobSeekPosting(requestBody);
	}
	
	//---------------------------------------book----------------------------------------------------
	
	@PostMapping("/bookJobOfferPosting")
	public ResponseDto<?> bookJobOfferPosting(@RequestBody ContractDto requestBody){
		return postingService.bookJobOfferPosting(requestBody);
	}
}
