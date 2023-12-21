package com.IceTea.TowerCrane.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.InterestedJobOfferPostingEntity;


@Repository
public interface InterestedJobOfferPostingRepository extends JpaRepository<InterestedJobOfferPostingEntity, String> {
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
			+ "interested_job_offer_posting.interested_job_offer_posting_id,"
			+ "interested_job_offer_posting.js_id "
			+ "from interested_job_offer_posting "
			+ "inner join job_offer_posting "
			+ "on interested_job_offer_posting.job_offer_posting_id = job_offer_posting.job_offer_posting_id "
			+ "inner join construction_site "
			+ "on construction_site.construction_site_id = job_offer_posting.construction_site_id "
			+ "inner join job_offerer "
			+ "on job_offerer.jo_id = construction_site.jo_id "
			+ "where interested_job_offer_posting.js_id = :jsId", nativeQuery = true)
	public List<InterestedJobOfferPostingEntity> interestedJobOfferPostingWithJsId(@Param("jsId") String jsId);
}
