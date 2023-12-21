import React, { useState } from 'react';
import { InputJobSeekPostingApi } from '../../../apis';  
import { Card } from '@mui/material';

function InputJobSeekPosting() {
    const [jobSeekPosting, setJobSeekPosting] = useState({
      jsId: '',
      offerWage: 0,
      closingDate: ''
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobSeekPosting({
      ...jobSeekPosting,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await InputJobSeekPostingApi(jobSeekPosting); 
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
    <Card sx={{width: 1200, padding: 8, margin: 5, height:510}}>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '20px',marginLeft:"400px",marginTop:"80px" }}>
      <label>
        구직자 ID
        <input type="text" name="jsId" value={jobSeekPosting.jsId} onChange={handleChange} placeholder="Job Seeker ID" style={{ marginLeft:"40px",marginBottom:"30px", width: '300px',height:"30px"}}/>
      </label>
      <label>
        제안 임금
        <input type="number" name="offerWage" value={jobSeekPosting.offerWage} onChange={handleChange} placeholder="Offer Wage" style={{ marginLeft:"40px",marginBottom:"30px", width: '300px',height:"30px" }} step="10000"/>
      </label>
      <label>
        마감일
        <input type="date" name="closingDate" value={jobSeekPosting.closingDate} onChange={handleChange} placeholder="Closing Date" style={{ marginLeft:"60px", marginBottom:"30px",width: '300px',height:"30px" }}/>
      </label>
      <button type="submit" style={{ width: '120px', height: '40px', marginTop: '10px',marginLeft:"120px" }}>구직공고 등록</button>
    </form>
    </Card>
  );
}

export default InputJobSeekPosting;
