package com.IceTea.TowerCrane.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.IceTea.TowerCrane.dto.MessageDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="Message")
@Table(name="message")
public class MessageEntity {
	@Id
    private String messageId;
    private String messageTitle;
    private String messageContents;
    private String senderId;
    private String receiverId;
    
    @CreationTimestamp
    private LocalDateTime recordTime;
    
    public MessageEntity(MessageDto dto, String id) {
    	this.messageId = id;
    	this.messageTitle = dto.getMessageTitle();
    	this.messageContents = dto.getMessageContents();
    	this.senderId = dto.getSenderId();
    	this.receiverId = dto.getReceiverId();
    }
}
