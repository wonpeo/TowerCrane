package com.IceTea.TowerCrane.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.entity.JobOfferPostingEntity;
import com.IceTea.TowerCrane.service.MainPageListService;

@RestController
@RequestMapping("/api/ListForMainPage")
public class MainPageListController {
	@Autowired MainPageListService mainPageListService;
	
	@GetMapping("/1stList")
	public ResponseDto<List<JobOfferPostingEntity>> getTop4OfferWageJobOfferPostingSelectedByWagePaymentAbility() {
		return mainPageListService.getTop4OfferWageJobOfferPostingSelectedByWagePaymentAbility();
	}
	
	@GetMapping("/2ndList")
	public ResponseDto<List<JobOfferPostingEntity>> getTop4OfferWageJobOfferPostingSelectedByWorkEnvironment() {
		return mainPageListService.getTop4OfferWageJobOfferPostingSelectedByWorkEnvironment();
	}
	
	@GetMapping("/3rdList")
	public ResponseDto<List<JobOfferPostingEntity>> getTop4OfferWageJobOfferPostingSelectedByWorkIntensity() {
		return mainPageListService.getTop4OfferWageJobOfferPostingSelectedByWorkIntensity();
	}
	
	@GetMapping("/4thList")
	public ResponseDto<List<JobOfferPostingEntity>> getTop4OfferWageJobOfferPostingSelectedByOrderValidity() {
		return mainPageListService.getTop4OfferWageJobOfferPostingSelectedByOrderValidity();
	}
}
