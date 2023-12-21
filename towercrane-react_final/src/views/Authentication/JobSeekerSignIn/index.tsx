// JobSeekerSignIn.tsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Button, Typography } from '@mui/material';
import { jobSeekerSignInApi } from '../../../apis'; 

export default function JobSeekerSignIn() {
    const navigate = useNavigate();

    const [id, setId] = useState<string>('')
    const [pw, setPw] = useState<string>('')
    

  // 로그인 핸들러
  const signInHandler = async () => {
      let data ={
          jsId: id,
          jsPw: pw,
          
      }

      try{
        let signInResponse = await jobSeekerSignInApi(data);
        if (signInResponse && signInResponse.result === true) {
          console.log(signInResponse.data.jobSeeker);
          alert("Welcome");
           // 성공 후 필드 초기화
           resetFields();
           const user = signInResponse.data.jobSeeker;
           localStorage.setItem('username', user.jsName);
           localStorage.setItem('jsid', user.jsId); 
           localStorage.setItem('age', user.jsAge);
           localStorage.setItem('jobclass', user.jsJobClass);
           localStorage.setItem('career', user.jsCareer);
           
         localStorage.setItem('isLoggedIn', 'true');
         localStorage.setItem('isLoggedInJs', 'true');
         navigate('/');
         window.location.reload();
        }
         else throw new Error(signInResponse.message);

       }catch(error){
          console.error(error);
          if (error instanceof Error) {
            alert(`로그인 실패: ${error.message}`);
          } else {
            alert('로그인 실패');
          }
       }
    };

  // 모든 필드 초기화 함수
  function resetFields() {
     setId('');
     setPw('');
   }

   return (
   <Card sx={{ width:"500px",margin:"auto",marginTop:"100px"}}>
        <Box>
           <Typography sx={{textAlign:"center",marginTop:"50px",fontFamily:"unset"}}variant='h5'>개인 로그인</Typography>
            <Box sx={{marginTop:"40px",marginBottom:"30px"}}>
                <Button style={{width:"100px",marginLeft:"124px",backgroundColor:"#EEEEEE",color:"black"}} component={Link} to="/JobSeekerSignIn" variant="contained">개인</Button>
                <Button style={{width:"100px",marginLeft:"60px",backgroundColor:"#EEEEEE",color:"black"}} component={Link} to="/JobOffererSignIn" variant="contained">기업</Button>
            </Box>
        </Box>

      <Box  marginBottom={"50px"} display="flex" flexDirection="column" justifyContent="space-between">
            <TextField style={{width:"400px",marginLeft:"auto",marginRight:"auto",marginBottom:"50px"}} label="ID" type="text" variant="standard"
                       onChange={(e) =>setId(e.target.value)}/>
            <TextField style={{width:"400px",marginLeft:"auto",marginRight:"auto",marginBottom:"70px"}}label="Password" type="password" variant="standard"
                       onChange={ (e)=>setPw(e.target.value)} />
            <Button style={{width:"200px",marginLeft:"auto",marginRight:"auto",backgroundColor:"#EEEEEE",color:"black"}} onClick={signInHandler} variant="contained">로그인</Button>
      </Box>

    </Card>)
}