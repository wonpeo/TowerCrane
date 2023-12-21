import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'; 
import axios from 'axios';
import { Card, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { JobSeekerAssessmentApi } from '../../../apis'; 

function JobSeekerAssessment() {
    const [workAttitude, setWorkAttitude] = useState(0);
    const [jobPerformance, setJobPerformance] = useState(0);
    const [rehiredRate, setRehiredRate] = useState(0);
    const [attendanceRate,setAttendanceRate] = useState(0);
    const { contractId } = useParams<{ contractId: string }>();
 
    useEffect(() => {
     console.log('Contract ID:', contractId);
  }, []);
    
   const handleSubmit = async () => {
     const payload = {
         contractId,
         tempWorkAttitude: workAttitude,
         tempJobPerformance: jobPerformance,
         tempRehiredRate: rehiredRate,
         tempAttendanceRate: attendanceRate
       };
     
       console.log('Sending data:', payload);
     
       try {
        const responseData = await JobSeekerAssessmentApi(payload);
   
        if (responseData !== null) {
            console.log('Response data:', responseData);
            alert("제출 성공");
        } else {
            throw new Error('Failed to submit');
        }
      } catch (error) {
        console.error(error);
        alert('제출 실패: ' + (error as any).message);
      }
   };

 return (
   <Card sx={{width:"1200px",margin:"auto",marginTop:"120px",height:"500px"}}>
    <div  style={{marginTop:"30px",marginLeft:"30px"}}>
     <h2>근로자 평가</h2>
     <Table sx={{ minWidth: 650 }} aria-label="simple table">
       <TableBody>
         <TableRow key='workAttitude'>
           <TableCell component='th' scope='row'>업무 태도</TableCell>
           <TableCell align='right'>
           <Rating 
                name="work-attitude" 
                value={workAttitude} 
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setWorkAttitude(newValue);
                    }
           }} />
           </TableCell>
         </TableRow>

        <TableRow key='jobPerformance'>
           <TableCell component='th' scope='row'>업무 수행 능력</TableCell>
           <TableCell align='right'>
           <Rating 
                name="job-performance" 
                value={jobPerformance} 
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setJobPerformance(newValue);
                    }
           }} />
           </TableCell>
        </TableRow>

        <TableRow key='rehiredRate'>
           <TableCell component='th' scope='row'>재고용률</TableCell>
           <TableCell align='right'>
           <Rating 
                name="rehired-rate" 
                value={rehiredRate} 
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setRehiredRate(newValue);
                    }
           }} />
           </TableCell>
         </TableRow>

         <TableRow key='attendanceRate'>
           <TableCell component='th' scope='row'>근속률</TableCell>
           <TableCell align='right'>
           <Rating 
                name="attendance-rate" 
                value={attendanceRate} 
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                    setAttendanceRate(newValue);
                    }
           }} />
           </TableCell>
         </TableRow>
       </TableBody> 
     </Table>

     <Button variant="contained" onClick={handleSubmit} style={{marginLeft:"1100px",marginTop:"20px"}}>제출</Button>
     </div>
   </Card>
 );
          }

export default JobSeekerAssessment;
export {};
