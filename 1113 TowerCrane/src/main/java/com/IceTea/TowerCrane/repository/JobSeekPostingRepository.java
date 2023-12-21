package com.IceTea.TowerCrane.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.JobSeekPostingEntity;

import jakarta.transaction.Transactional;


@Repository
public interface JobSeekPostingRepository extends JpaRepository<JobSeekPostingEntity, String> {
	
	//구직공고 출력.
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
			+ "job_seek_posting.closing_date, "
			+ "job_seek_posting.booked "
			+ "from job_seek_posting "
			+ "inner join job_seeker on job_seek_posting.js_id = job_seeker.js_id "
			+ "where job_seek_posting.booked = 0 and closing_date > now() "
			+ "order by job_seek_posting_id desc;", nativeQuery = true)
	public List<JobSeekPostingEntity> jobSeekPostingList();
	
	//구직공고 선택 직종 출력.
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
			+ "job_seek_posting.closing_date, "
			+ "job_seek_posting.booked "
			+ "from job_seek_posting "
			+ "inner join job_seeker on job_seek_posting.js_id = job_seeker.js_id "
			+ "where job_seek_posting.booked = 0 and closing_date > now() and job_seeker.js_job_class = :jsJobClass "
			+ "order by job_seek_posting.offer_wage desc;", nativeQuery = true)
	public List<JobSeekPostingEntity> jobSeekPostingListWithJsJobClass(@Param("jsJobClass") String jsJobClass);
	
	//구직공고 선택 경력 이상 출력.
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
			+ "job_seek_posting.closing_date, "
			+ "job_seek_posting.booked "
			+ "from job_seek_posting "
			+ "inner join job_seeker on job_seek_posting.js_id = job_seeker.js_id "
			+ "where job_seek_posting.booked = 0 and closing_date > now() and job_seeker.js_career >= :jsCareer "
			+ "order by job_seek_posting.offer_wage desc;", nativeQuery = true)
	public List<JobSeekPostingEntity> jobSeekPostingListWithJsCareer(@Param("jsCareer") int jsCareer);
	
	//해당 유저가 게시한 공고 출력.
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
			+ "job_seek_posting.offer_wage,"
			+ "job_seek_posting.booked,"
			+ "job_seek_posting.closing_date "
			+ "from job_seek_posting "
			+ "inner join job_seeker on job_seek_posting.js_id = job_seeker.js_id "
			+ "where job_seek_posting.js_id = :jsId", nativeQuery = true)
	public List<JobSeekPostingEntity> jobSeekPostingListWithJsId(@Param("jsId") String jsId);
	
	@Modifying
	@Transactional
	@Query(value = "update job_seek_posting "
			+ "set booked = 1 "
			+ "where job_seek_posting_id = :job_seek_posting_id", nativeQuery = true)
	public void bookJobOfferPosting(@Param("job_seek_posting_id") String job_seek_posting_id);
}
