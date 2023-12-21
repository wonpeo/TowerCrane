package com.IceTea.TowerCrane.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.JobOfferPostingEntity;

import jakarta.transaction.Transactional;


@Repository
public interface JobOfferPostingRepository extends JpaRepository<JobOfferPostingEntity, String> {

	public List<JobOfferPostingEntity> findByOrderByJobOfferPostingId();
	
	public List<JobOfferPostingEntity> findTop3ByOrderByJobOfferPostingIdDesc();
	
	//구인공고 출력
	@Query(value = "select "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "job_offerer.wage_payment_ability, "
			+ "job_offerer.work_environment, "
			+ "job_offerer.work_intensity, "
			+ "job_offerer.order_validity, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "job_offer_posting.job_offer_posting_id, "
			+ "job_offer_posting.requirement_job_class, "
			+ "job_offer_posting.offer_wage, "
			+ "job_offer_posting.required_career, "
			+ "job_offer_posting.closing_date, "
			+ "job_offer_posting.booked "
			+ "from job_offer_posting "
			+ "inner join construction_site on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer on job_offerer.jo_id = construction_site.jo_id "
			+ "where job_offer_posting.booked = 0 and closing_date > now() "
			+ "order by job_offer_posting_id desc;", nativeQuery = true)
	public List<JobOfferPostingEntity> jobOfferPostingList();
	
	//신입 채용하는 구인공고 출력. 기준 2년차 이하.
	@Query(value = "select "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "job_offerer.wage_payment_ability, "
			+ "job_offerer.work_environment, "
			+ "job_offerer.work_intensity, "
			+ "job_offerer.order_validity, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "job_offer_posting.job_offer_posting_id, "
			+ "job_offer_posting.requirement_job_class, "
			+ "job_offer_posting.offer_wage, "
			+ "job_offer_posting.required_career, "
			+ "job_offer_posting.closing_date, "
			+ "job_offer_posting.booked "
			+ "from job_offer_posting "
			+ "inner join construction_site on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer on job_offerer.jo_id = construction_site.jo_id "
			+ "where job_offer_posting.required_career <= 2 and job_offer_posting.booked = 0 and closing_date > now() "
			+ "order by job_offer_posting_id desc;", nativeQuery = true)
	public List<JobOfferPostingEntity> jobOfferPostingListForNoob();
	
	//구인공고 선택 직종 출력
	@Query(value = "select "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "job_offerer.wage_payment_ability, "
			+ "job_offerer.work_environment, "
			+ "job_offerer.work_intensity, "
			+ "job_offerer.order_validity, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "job_offer_posting.job_offer_posting_id, "
			+ "job_offer_posting.requirement_job_class, "
			+ "job_offer_posting.offer_wage, "
			+ "job_offer_posting.required_career, "
			+ "job_offer_posting.closing_date, "
			+ "job_offer_posting.booked "
			+ "from job_offer_posting "
			+ "inner join construction_site on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer on job_offerer.jo_id = construction_site.jo_id "
			+ "where job_offer_posting.booked = 0 and closing_date > now() and job_offer_posting.requirement_job_class = :requirementJobClass "
			+ "order by job_offer_posting_id desc;", nativeQuery = true)
	public List<JobOfferPostingEntity> jobOfferPostingListWithRequirementJobClass(@Param("requirementJobClass") String requirementJobClass);
	
	//구인공고 선택 공사장 위치 출력
	@Query(value = "select "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "job_offerer.wage_payment_ability, "
			+ "job_offerer.work_environment, "
			+ "job_offerer.work_intensity, "
			+ "job_offerer.order_validity, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "job_offer_posting.job_offer_posting_id, "
			+ "job_offer_posting.requirement_job_class, "
			+ "job_offer_posting.offer_wage, "
			+ "job_offer_posting.required_career, "
			+ "job_offer_posting.closing_date, "
			+ "job_offer_posting.booked "
			+ "from job_offer_posting "
			+ "inner join construction_site on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer on job_offerer.jo_id = construction_site.jo_id "
			+ "where job_offer_posting.booked = 0 and closing_date > now() and construction_site.location = :location "
			+ "order by job_offer_posting_id desc;", nativeQuery = true)
	public List<JobOfferPostingEntity> jobOfferPostingListWithLocation(@Param("location") String location);
	
	//구인공고 선택 요구 경력 이상 출력
	@Query(value = "select "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "job_offerer.wage_payment_ability, "
			+ "job_offerer.work_environment, "
			+ "job_offerer.work_intensity, "
			+ "job_offerer.order_validity, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "job_offer_posting.job_offer_posting_id, "
			+ "job_offer_posting.requirement_job_class, "
			+ "job_offer_posting.offer_wage, "
			+ "job_offer_posting.required_career, "
			+ "job_offer_posting.closing_date, "
			+ "job_offer_posting.booked "
			+ "from job_offer_posting "
			+ "inner join construction_site on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer on job_offerer.jo_id = construction_site.jo_id "
			+ "where job_offer_posting.booked = 0 and closing_date > now() and job_offer_posting.required_career >= :requiredCareer "
			+ "order by job_offer_posting_id desc;", nativeQuery = true)
	public List<JobOfferPostingEntity> jobOfferPostingListWithRequiredCareer(@Param("requiredCareer") int requiredCareer);
	
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	//해당 유저가 게시한 공고 출력.
	@Query(value = "select "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "job_offerer.wage_payment_ability, "
			+ "job_offerer.work_environment, "
			+ "job_offerer.work_intensity, "
			+ "job_offerer.order_validity, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "job_offer_posting.job_offer_posting_id, "
			+ "job_offer_posting.requirement_job_class, "
			+ "job_offer_posting.offer_wage, "
			+ "job_offer_posting.required_career, "
			+ "job_offer_posting.booked,"
			+ "job_offer_posting.closing_date "
			+ "from job_offer_posting "
			+ "inner join construction_site on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer on job_offerer.jo_id = construction_site.jo_id "
			+ "where job_offerer.jo_id = :joId", nativeQuery = true)
	public List<JobOfferPostingEntity> jobOfferPostingListWithJoId(@Param("joId") String joId);
	
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	//임금지불 능력 점수가 가장 높은 구인자의 임금이 제일 높은 4개의 채용 공고 반환.
	@Query(value = "select "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "job_offerer.wage_payment_ability, "
			+ "job_offerer.work_environment, "
			+ "job_offerer.work_intensity, "
			+ "job_offerer.order_validity, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "job_offer_posting.job_offer_posting_id, "
			+ "job_offer_posting.requirement_job_class, "
			+ "job_offer_posting.offer_wage, "
			+ "job_offer_posting.required_career, "
			+ "job_offer_posting.closing_date, "
			+ "job_offer_posting.booked "
			+ "from job_offer_posting "
			+ "inner join construction_site on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer on job_offerer.jo_id = construction_site.jo_id "
			+ "where job_offerer.wage_payment_ability = (select max(job_offerer.wage_payment_ability) from job_offerer) and job_offer_posting.booked = 0 and closing_date > now() "
			+ "order by job_offer_posting.offer_wage desc "
			+ "limit 4;", nativeQuery = true)
	public List<JobOfferPostingEntity> top4OfferWageJobOfferPostingSelectedByWagePaymentAbility();
	
	//업무 환경 점수가 가장 높은 구인자의 임금이 제일 높은 4개의 채용 공고 반환.
	@Query(value = "select "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "job_offerer.wage_payment_ability, "
			+ "job_offerer.work_environment, "
			+ "job_offerer.work_intensity, "
			+ "job_offerer.order_validity, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "job_offer_posting.job_offer_posting_id, "
			+ "job_offer_posting.requirement_job_class, "
			+ "job_offer_posting.offer_wage, "
			+ "job_offer_posting.required_career, "
			+ "job_offer_posting.closing_date, "
			+ "job_offer_posting.booked "
			+ "from job_offer_posting "
			+ "inner join construction_site on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer on job_offerer.jo_id = construction_site.jo_id "
			+ "where job_offerer.work_environment = (select max(job_offerer.work_environment) from job_offerer) and job_offer_posting.booked = 0 and closing_date > now() "
			+ "order by job_offer_posting.offer_wage desc "
			+ "limit 4;", nativeQuery = true)
	public List<JobOfferPostingEntity> top4OfferWageJobOfferPostingSelectedByWorkEnvironment();
	
	//업무 강도 점수가 가장 높은 구인자의 임금이 제일 높은 4개의 채용 공고 반환.
	@Query(value = "select "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "job_offerer.wage_payment_ability, "
			+ "job_offerer.work_environment, "
			+ "job_offerer.work_intensity, "
			+ "job_offerer.order_validity, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "job_offer_posting.job_offer_posting_id, "
			+ "job_offer_posting.requirement_job_class, "
			+ "job_offer_posting.offer_wage, "
			+ "job_offer_posting.required_career, "
			+ "job_offer_posting.closing_date, "
			+ "job_offer_posting.booked  "
			+ "from job_offer_posting "
			+ "inner join construction_site on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer on job_offerer.jo_id = construction_site.jo_id "
			+ "where job_offerer.work_intensity = (select max(job_offerer.work_intensity) from job_offerer) and job_offer_posting.booked = 0 and closing_date > now() "
			+ "order by job_offer_posting.offer_wage desc "
			+ "limit 4;", nativeQuery = true)
	public List<JobOfferPostingEntity> top4OfferWageJobOfferPostingSelectedByWorkIntensity();
	
	//명령의 타당성 점수가 가장 높은 구인자의 임금이 제일 높은 4개의 채용 공고 반환.
	@Query(value = "select "
			+ "job_offerer.jo_id, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name, "
			+ "job_offerer.wage_payment_ability, "
			+ "job_offerer.work_environment, "
			+ "job_offerer.work_intensity, "
			+ "job_offerer.order_validity, "
			+ "construction_site.construction_site_id, "
			+ "construction_site.location, "
			+ "job_offer_posting.job_offer_posting_id, "
			+ "job_offer_posting.requirement_job_class, "
			+ "job_offer_posting.offer_wage, "
			+ "job_offer_posting.required_career,"
			+ "job_offer_posting.closing_date, "
			+ "job_offer_posting.booked  "
			+ "from job_offer_posting "
			+ "inner join construction_site on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer on job_offerer.jo_id = construction_site.jo_id "
			+ "where job_offerer.order_validity = (select max(job_offerer.order_validity) from job_offerer) and job_offer_posting.booked = 0 and closing_date > now() "
			+ "order by job_offer_posting.offer_wage desc "
			+ "limit 4;", nativeQuery = true)
	public List<JobOfferPostingEntity> top4OfferWageJobOfferPostingSelectedByOrderValidity();
	
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	@Modifying
	@Transactional
	@Query(value = "update job_offer_posting "
			+ "set booked = 1 "
			+ "where job_offer_posting_id = :job_offer_posting_id", nativeQuery = true)
	public void bookJobOfferPosting(@Param("job_offer_posting_id") String job_offer_posting_id);

	
}