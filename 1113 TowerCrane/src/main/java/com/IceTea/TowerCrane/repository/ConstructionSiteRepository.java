package com.IceTea.TowerCrane.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.ConstructionSiteEntity;


@Repository
public interface ConstructionSiteRepository extends JpaRepository<ConstructionSiteEntity, String> {

}
	