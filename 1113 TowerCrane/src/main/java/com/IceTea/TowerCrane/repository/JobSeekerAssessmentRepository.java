package com.IceTea.TowerCrane.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.JobSeekerAssessmentEntity;


@Repository
public interface JobSeekerAssessmentRepository extends JpaRepository<JobSeekerAssessmentEntity, String> {

}
