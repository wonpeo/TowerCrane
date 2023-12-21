package com.IceTea.TowerCrane.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IceTea.TowerCrane.dto.MessageDto;
import com.IceTea.TowerCrane.dto.ResponseDto;
import com.IceTea.TowerCrane.entity.MessageEntity;
import com.IceTea.TowerCrane.repository.JobOffererRepository;
import com.IceTea.TowerCrane.repository.JobSeekerRepository;
import com.IceTea.TowerCrane.repository.MessageRepository;

@Service
public class MessageService {
	@Autowired MessageRepository messageRepository;
	@Autowired JobSeekerRepository jobSeekerRepository;
	@Autowired JobOffererRepository jobOffererRepository;

	public ResponseDto<?> inputMessage(MessageDto dto){
		String messageId = "MSG_" + randomStringGenerator();
		try {
			MessageEntity messageEntity = new MessageEntity(dto, messageId);
			messageRepository.save(messageEntity);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseDto.setFaild("DB Error.");
		}
		return ResponseDto.setSuccess("Sign Up Success", null);
	}
	
	public ResponseDto<List<MessageEntity>> getMessageRecord(MessageDto dto){
		List<MessageEntity> messageList = new ArrayList<MessageEntity>();
		if(jobSeekerRepository.existsById(dto.getSenderId())) {
			try {
				messageList = messageRepository.jobSeekerMessageRecord(dto.getSenderId());
			} catch (Exception e) {
				// TODO: handle exception
				return ResponseDto.setFaild("DB Error.");
			}
		}
		else if(jobOffererRepository.existsById(dto.getSenderId())) {
			try {
				messageList = messageRepository.jobOffererMessageRecord(dto.getSenderId());
			} catch (Exception e) {
				// TODO: handle exception
				return ResponseDto.setFaild("DB Error.");
			}
		}
		else
			return ResponseDto.setFaild("DB Error.");
		return ResponseDto.setSuccess("Success.", messageList);
	}
	
	public ResponseDto<List<MessageEntity>> getMessageList(MessageDto dto){
		List<MessageEntity> messageList = new ArrayList<MessageEntity>();
		if(dto.getSenderId() == dto.getReceiverId())
			return ResponseDto.setFaild("Same User in Sender & Receiver.");
		if(jobSeekerRepository.existsById(dto.getReceiverId())) {
			try {
				messageList = messageRepository.jobSeekerMessageList(dto.getReceiverId());
			} catch (Exception e) {
				// TODO: handle exception
				return ResponseDto.setFaild("DB Error.");
			}
		}
		else if(jobOffererRepository.existsById(dto.getReceiverId())) {
			try {
				messageList = messageRepository.jobOffererMessageList(dto.getReceiverId());
				System.out.println(messageList);
			} catch (Exception e) {
				// TODO: handle exception
				return ResponseDto.setFaild("DB Error.");
			}
		}
		else
			return ResponseDto.setFaild("DB Error.");
		return ResponseDto.setSuccess("Success.", messageList);
	}
	
	public String randomStringGenerator() {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 6;
		Random random = new Random();

		String generatedString  = random.ints(leftLimit,rightLimit + 1)
		  .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
		  .limit(targetStringLength)
		  .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
		  .toString();
		
		return generatedString;
	}
}
