import React, { useState } from 'react';
import { InputJobOfferPostingApi } from '../../../apis';  
import { Card } from '@mui/material';

function InputJobOfferPosting() {
    const [jobOfferPosting, setJobOfferPosting] = useState({
      requirementJobClass: '',
      offerWage: 0,
      requiredCareer: 0,
      constructionSiteId: '',
      closingDate: ''
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobOfferPosting({
      ...jobOfferPosting,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await InputJobOfferPostingApi(jobOfferPosting); 
      console.log('서버 응답:', response);
      if (response.data !== false) {
        alert('등록 성공');
      } else {
        alert('등록 실패');
      }
    } catch (err) {
      console.error(err);
      alert('등록 실패: ' + err);
    }
  }

  return (
    <Card sx={{width: 1200, padding: 7, margin: 5,height:"460px"}}>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '20px',marginLeft:"400px",marginTop:"30px" }}>
      <label>
        요구 직종
        <input type="text" name="requirementJobClass" value={jobOfferPosting.requirementJobClass} onChange={handleChange} placeholder="Requirement Job Class" style={{width: '300px',height:"30px",marginLeft:"30px",marginBottom:"20px" }}/>
      </label>
      <label>
        제안 임금
        <input type="number" name="offerWage" value={jobOfferPosting.offerWage} onChange={handleChange} placeholder="Offer Wage" style={{ width: '300px',height:"30px",marginLeft:"30px",marginBottom:"20px"}} step="10000"/>
      </label>
      <label>
        요구 경력
        <input type="number" name="requiredCareer" value={jobOfferPosting.requiredCareer} onChange={handleChange} placeholder="Required Career" style={{width: '300px',height:"30px",marginLeft:"30px",marginBottom:"20px" }}/>
      </label>
      <label>
        공사장 ID
        <input type="text" name="constructionSiteId" value={jobOfferPosting.constructionSiteId} onChange={handleChange} placeholder="Construction Site ID" style={{width: '300px',height:"30px",marginLeft:"30px",marginBottom:"20px" }}/>
      </label>
      <label>
        마감일
        <input type="date" name="closingDate" value={jobOfferPosting.closingDate} onChange={handleChange} placeholder="Closing Date" style={{width: '300px',height:"30px",marginLeft:"50px",marginBottom:"20px" }}/>
      </label>
      <button type="submit" style={{ width: '120px', height: '40px',marginLeft:"150px"}}>구인공고 등록</button>
    </form>
    </Card>
  );
}

export default InputJobOfferPosting;
