import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Button, Typography } from '@mui/material';
import { jobSeekerSignUpApi, jobOffererSignUpApi } from '../../../apis'; 

export default function JobOffererSignUp() {
    const navigate = useNavigate();

    const [joId,setJoId]=useState<string>(''); 
    const [joPw,setJoPw]=useState<string>(''); 
    const [joPwCheck,setJoPwCheck]=useState<string>(''); 
    const [joName,setJoName]=useState<string>(''); 
    const [companyName,setCompanyName]=useState('');

    const toLoginHandler = () => {
      navigate('/JoboffererSignIn');
      }
  // 회원 가입 핸들러
  const signUpHandler = async () => {
      if ( joPw !== joPwCheck ) {
          alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          return;
      }

      // 데이터 정리
      let data ={
          joId,
          joPw,
          joPwCheck,
          joName,
          companyName,
      }
   
    try{
       let signUpResponse=await jobOffererSignUpApi(data); 
       if(signUpResponse){
          alert("회원가입 성공");
          resetFields();
          navigate('/');
        }
        else throw new Error("회원 가입 실패");
   
    }catch (error) {
        if (error instanceof Error) {
          console.error(error);
          alert(`회원가입 실패: ${error.message}`);
        } else {
          console.error(error);
          alert("회원가입 실패");
        }
    }
   };

  // 모든 필드 초기화 함수
  function resetFields() {
     setJoId('');
     setJoPw('');
     setJoPwCheck('');
     setJoName('');
     setCompanyName('');
   }

  return (
    <Card sx={{width:"800px",margin:"auto",marginTop:"100px"}}>
        <Box>
           <Typography variant='h5' sx={{
            marginTop:"50px",textAlign:"center",fontFamily:"unset"
           }}>기업 회원가입</Typography>
            <Box sx={{marginTop:"30px",marginBottom:"20px"}}>
                <Button style={{width:"120px",height:"50px",marginLeft:"230px",backgroundColor:"#EEEEEE",color:"black"}} component={Link} to="/JobSeekerSignUp" variant="contained">개인</Button>
                <Button style={{width:"120px",height:"50px",marginLeft:"100px",backgroundColor:"#EEEEEE",color:"black"}} component={Link} to="/JobOffererSignUp" variant="contained">기업</Button>
            </Box>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
               <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}} label="ID" type="text" variant="standard" 
               onChange={(e) =>setJoId(e.target.value)}/>
               <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}} label="Password" type="password" variant="standard" 
               onChange={(e) =>setJoPw(e.target.value)}/>
               <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}} label="Password Check" type="password" variant="standard"
                onChange={ (e)=>setJoPwCheck(e.target.value)} />
                <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}} label='Your Name' type='text' variant='standard'
                 onChange={ (e)=>setJoName(e.target.value)} />
                <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"40px"}} label='Company Name' type='text' variant='standard'
                 onChange={ (e)=>setCompanyName(e.target.value)} />
           </Box>
           <Box sx={{textAlign:"center",marginBottom:"40px"}} component='div'>
           <Button style={{width:"150px",height:"50px",backgroundColor:"#EEEEEE",color:"black"}} onClick={() => signUpHandler()} variant="contained">Register</Button>
           </Box>
           <Box component='div' display='flex' mt={2}>
               <Typography style={{marginLeft:"280px",marginBottom:"60px"}}>Already have an account?</Typography>
               <Typography onClick={toLoginHandler} fontWeight={800} ml={1}>Login</Typography>
           </Box>
   </Card>

 )
}
