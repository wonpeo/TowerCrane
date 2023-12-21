package com.IceTea.TowerCrane.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.JobOffererAssessmentEntity;


@Repository
public interface JobOffererAssessmentRepository extends JpaRepository<JobOffererAssessmentEntity, String> {

}
