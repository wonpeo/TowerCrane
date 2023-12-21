package com.IceTea.TowerCrane.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.IceTea.TowerCrane.entity.MessageEntity;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, String> {

	@Query(value = "select "
			+ "message.message_id, "
			+ "message.message_title, "
			+ "message.message_contents, "
			+ "message.sender_id, "
			+ "message.receiver_id, "
			+ "message.record_time, "
			+ "job_seeker.js_name, "
			+ "job_seeker.js_job_class "
			+ "from message, job_seeker "
			+ "where message.sender_id = job_seeker.js_id and message.sender_id = :senderId "
			+ "order by message.record_time desc ", nativeQuery = true)
	public List<MessageEntity> jobSeekerMessageRecord(@Param("senderId") String senderId);
	
	@Query(value = "select "
			+ "message.message_id, "
			+ "message.message_title, "
			+ "message.message_contents, "
			+ "message.sender_id, "
			+ "message.receiver_id, "
			+ "message.record_time, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name "
			+ "from message, job_offerer "
			+ "where message.sender_id = job_offerer.jo_id and message.sender_id = :senderId "
			+ "order by message.record_time desc ", nativeQuery = true)
	public List<MessageEntity> jobOffererMessageRecord(@Param("senderId") String senderId);
	
	@Query(value = "select "
			+ "message.message_id, "
			+ "message.message_title, "
			+ "message.message_contents, "
			+ "message.sender_id, "
			+ "message.receiver_id, "
			+ "message.record_time, "
			+ "job_seeker.js_name, "
			+ "job_seeker.js_job_class "
			+ "from message, job_seeker "
			+ "where message.receiver_id = job_seeker.js_id and message.receiver_id = :receiverId ", nativeQuery = true)
	public List<MessageEntity> jobSeekerMessageList(@Param("receiverId") String receiverId);
	
	@Query(value = "select "
			+ "message.message_id, "
			+ "message.message_title, "
			+ "message.message_contents, "
			+ "message.sender_id, "
			+ "message.receiver_id, "
			+ "message.record_time, "
			+ "job_offerer.jo_name, "
			+ "job_offerer.company_name "
			+ "from message, job_offerer "
			+ "where message.receiver_id = job_offerer.jo_id and message.receiver_id = :receiverId "
			+ "order by message.record_time desc ", nativeQuery = true)
	public List<MessageEntity> jobOffererMessageList(@Param("receiverId") String receiverId);
}
