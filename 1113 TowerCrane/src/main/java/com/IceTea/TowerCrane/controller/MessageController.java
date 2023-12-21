package com.IceTea.TowerCrane.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IceTea.TowerCrane.dto.MessageDto;
import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.entity.MessageEntity;
import com.IceTea.TowerCrane.service.MessageService;

@RestController
@RequestMapping("/api")
public class MessageController {
	@Autowired MessageService messageService;
	
	@PostMapping("/inputMessage")
	public ResponseDto<?> inputMessage(@RequestBody MessageDto requestBody){
		return messageService.inputMessage(requestBody);
	}
	@PostMapping("/messageRecord")
	public ResponseDto<List<MessageEntity>> getMessageRecord(@RequestBody MessageDto requestBody){
		return messageService.getMessageRecord(requestBody);
	}
	@PostMapping("/messageList")
	public ResponseDto<List<MessageEntity>> getMessageList(@RequestBody MessageDto requestBody){
		return messageService.getMessageList(requestBody);
	}

}
