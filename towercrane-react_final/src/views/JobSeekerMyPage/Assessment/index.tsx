import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'; 
import axios from 'axios';
import { Card, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { JobOffererAssessmentApi } from '../../../apis'; 

function JobOffererAssessment() {
   const [wagePaymentAbility, setWagePaymentAbility] = useState(0);
   const [workEnvironment, setWorkEnvironment] = useState(0);
   const [workIntensity, setWorkIntensity] = useState(0);
   const [orderValidity,setOrderValidity] = useState(0);
   const { contractId } = useParams<{ contractId: string }>();

   useEffect(() => {
    console.log('Contract ID:', contractId);
 }, []);
   const handleSubmit = async () => {
    const payload = {
        contractId,
        tempWagePaymentAbility: wagePaymentAbility,
        tempWorkEnvironment: workEnvironment,
        tempWorkIntensity: workIntensity,
        tempOrderValidity: orderValidity
      };
    
      console.log('Sending data:', payload);
    
      try {
        const responseData = await JobOffererAssessmentApi(payload);
   
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
   <div style={{float:'right'}}>
   <Card sx={{width: 1200, padding: 7, margin: 5}}>
     <h2>회사 평가</h2>
     <Table sx={{ minWidth: 650 }} aria-label="simple table">
       <TableBody>
         <TableRow key='wagePaymentAbility'>
           <TableCell component='th' scope='row'>임금 지불 능력</TableCell>
           <TableCell align='right'>
           <Rating 
                name="wage-payment-ability" 
                value={wagePaymentAbility} 
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                    setWagePaymentAbility(newValue);
                    }
           }} />
           </TableCell>
         </TableRow>

        <TableRow key='workEnvironment'>
           <TableCell component='th' scope='row'>업무 환경</TableCell>
           <TableCell align='right'>
           <Rating 
                name="work-environment" 
                value={workEnvironment} 
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setWorkEnvironment(newValue);
                    }
           }} />
           </TableCell>
        </TableRow>

        <TableRow key='workIntensity'>
           <TableCell component='th' scope='row'>업무 강도</TableCell>
           <TableCell align='right'>
           <Rating 
                name="work-intensity" 
                value={workIntensity} 
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setWorkIntensity(newValue);
                    }
           }} />
           </TableCell>
         </TableRow>

         <TableRow key='orderValidity'>
           <TableCell component='th' scope='row'>명령 타당성</TableCell>
           <TableCell align='right'>
           <Rating 
                name="order-validity" 
                value={orderValidity} 
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                    setOrderValidity(newValue);
                    }
           }} />
           </TableCell>
         </TableRow>
       </TableBody> 
     </Table>

     <Button variant="contained" onClick={handleSubmit} style={{marginLeft:"1130px",marginTop:"30px"}}>제출</Button>
     </Card>
   </div>
 );
          }

export default JobOffererAssessment;
export {};
