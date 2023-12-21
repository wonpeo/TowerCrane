package com.IceTea.TowerCrane.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="ConstructionSite")
@Table(name="construction_site")
public class ConstructionSiteEntity {
    @Id
    private String constructionSiteId;    
    private String location;

    @ManyToOne(targetEntity = JobOffererEntity.class)
	@JoinColumn(name = "joId", referencedColumnName = "joId") 
	private JobOffererEntity jobOfferer;  
}
