package com.IceTea.TowerCrane.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
	private String messageId;
	private String messageTitle;
	private String messageContents;
	private String senderId;
	private String receiverId;
}
