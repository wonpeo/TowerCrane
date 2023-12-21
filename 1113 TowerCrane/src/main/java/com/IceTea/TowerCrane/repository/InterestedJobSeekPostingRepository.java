package com.IceTea.TowerCrane.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.InterestedJobSeekPostingEntity;

@Repository
public interface InterestedJobSeekPostingRepository extends JpaRepository<InterestedJobSeekPostingEntity, String> {
	@Query(value = "select "
			+ "job_seeker.js_id, "
			+ "job_seeker.js_name, "
			+ "job_seeker.js_job_class, "
			+ "job_seeker.js_age, "
			+ "job_seeker.js_career, "
			+ "job_seeker.work_attitude, "
			+ "job_seeker.job_performance, "
			+ "job_seeker.rehired_rate, "
			+ "job_seeker.attendance_rate, "
			+ "job_seek_posting.job_seek_posting_id, "
			+ "job_seek_posting.offer_wage, "
			+ "job_seek_posting.booked,"
			+ "interested_job_seek_posting.interested_job_seek_posting_id,"
			+ "interested_job_seek_posting.jo_id "
			+ "from interested_job_seek_posting "
			+ "inner join job_seek_posting "
			+ "on interested_job_seek_posting.job_seek_posting_id = job_seek_posting.job_seek_posting_id "
			+ "inner join job_seeker "
			+ "on job_seek_posting.js_id = job_seeker.js_id "
			+ "where interested_job_seek_posting.jo_id = :joId", nativeQuery = true)
	public List<InterestedJobSeekPostingEntity> interestedJobSeekPostingWithJoId(@Param("joId") String joId);
}
