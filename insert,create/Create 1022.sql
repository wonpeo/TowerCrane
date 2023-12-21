drop database if exists TowerCrane;
CREATE DATABASE TowerCrane default CHARACTER SET UTF8;
use TowerCrane;

drop table if exists job_seeker;
create table job_seeker(
  js_id varchar(100),
  js_pw varchar(20),
  js_name varchar(20),
  js_job_class varchar(20),
  js_age int,
  js_career int,
  work_attitude int, #업무태도
  job_performance int, #업무 수행 능력
  rehired_rate int, #재고용률
  attendance_rate int, #근속률
  primary key(js_id)
);

drop table if exists job_offerer;
create table job_offerer(
  jo_id varchar(20),
  jo_pw varchar(20),
  jo_name varchar(20),
  company_name varchar(20),
  wage_payment_ability int, #임금지불능력
  work_environment int, #업무 환경
  work_intensity int, #업무강도
  order_validity int, #명령의 타당성
  primary key(jo_id)
);

drop table if exists construction_site;
create table construction_site(
  construction_site_id varchar(20),
  jo_id varchar(20),
  location varchar(20),
  primary key(construction_site_id),
  FOREIGN KEY (jo_id) REFERENCES job_offerer (jo_id)
);

drop table if exists contract;
create table contract(
  contract_id varchar(20),
  contract_wage int,
  js_id varchar(20),
  construction_site_id varchar(20),
  contract_date date,
  primary key(contract_id),
  FOREIGN KEY (js_id) REFERENCES job_seeker (js_id),
  FOREIGN KEY (construction_site_id) REFERENCES construction_site (construction_site_id)
);

drop table if exists job_offer_posting;
create table job_offer_posting(
  job_offer_posting_id varchar(40),
  requirement_job_class varchar(20),
  offer_wage int,
  required_career int, 
  booked boolean, 
  construction_site_id varchar(20),
  closing_date date,
  primary key(job_offer_posting_id),
  FOREIGN KEY (construction_site_id) REFERENCES construction_site (construction_site_id)
);

drop table if exists job_seek_posting;
create table job_seek_posting(
  job_seek_posting_id varchar(20), 
  js_id varchar(20), 
  offer_wage int, 
  booked boolean, 
  closing_date date, 
  primary key(job_seek_posting_id),
  FOREIGN KEY (js_id) REFERENCES job_seeker (js_id)
);

drop table if exists job_seeker_assessment;
create table job_seeker_assessment(
  job_seeker_assessment_id varchar(20),
  contract_id varchar(20),
  temp_work_attitude int,
  temp_job_performance int,
  temp_rehired_rate int,
  temp_attendance_rate int,
  primary key(job_seeker_assessment_id),
  FOREIGN KEY (contract_id) REFERENCES contract (contract_id)
);

drop table if exists job_offerer_assessment;
create table job_offerer_assessment(
  job_offerer_assessment_id varchar(20),
  contract_id varchar(20),
  temp_wage_payment_ability int,
  temp_work_environment int,
  temp_work_intensity int,
  temp_order_validity int,
  primary key(job_offerer_assessment_id),
  FOREIGN KEY (contract_id) REFERENCES contract (contract_id)
);

drop table if exists interested_job_seek_posting;
create table interested_job_seek_posting(
	interested_job_seek_posting_id varchar(20), 
    job_seek_posting_id varchar(20), 
    jo_id varchar(20), 
    primary key (interested_job_seek_posting_id), 
    unique key (job_seek_posting_id, jo_id),
    foreign key (job_seek_posting_id) references job_seek_posting (job_seek_posting_id), 
    foreign key (jo_id) references job_offerer (jo_id)
);

drop table if exists interested_job_offer_posting;
create table interested_job_offer_posting(
	interested_job_offer_posting_id varchar(20), 
    job_offer_posting_id varchar(20), 
    js_id varchar(20), 
    primary key (interested_job_offer_posting_id), 
    unique key (job_offer_posting_id, js_id),
    foreign key (job_offer_posting_id) references job_offer_posting (job_offer_posting_id), 
    foreign key (js_id) references job_seeker (js_id)
);

drop table if exists message;
create table message(
	message_id varchar(20),
    message_title varchar(20),
    message_contents text,
    sender_id varchar(20),
    receiver_id varchar(20),
    record_time datetime,
    primary key (message_id)
);
