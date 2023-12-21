import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Button, MenuItem, Typography } from '@mui/material';
import { jobSeekerSignUpApi, jobOffererSignUpApi } from '../../../apis'; 


export default function JobSeekerSignUp() {
  
    const navigate = useNavigate();

    const [jsId, setJsId] = useState<string>('')
    const [jsPw, setJsPw] = useState<string>('')
    const [jsPwCheck, setJsPwCheck] = useState<string>('')
    const [jsName, setJsName] = useState<string>('')
    const [jsJobClass,setJsJobClass]=useState<string>('')
    const [jsAge,setJsAge]=useState<number>(0)
    const [jsCareer,setJsCareer]=useState<number>(0)

    const toLoginHandler = () => {
      navigate('/JobSeekerSignIn');
      }
  // 회원 가입 핸들러
  const signUpHandler = async () => {
      if (isNaN(jsAge) || isNaN(jsCareer)) {
          alert("나이와 경력은 숫자로 입력해주세요.");
          return;
      }
   // 비밀번호 일치 검사
   if (jsPw !== jsPwCheck) {
    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    return;
}

let data ={
    jsId,
    jsPw,
    jsPwCheck,
    jsName,
    jsJobClass,
    jsAge: Number(jsAge),
    jsCareer: Number(jsCareer),
}
try{
    let signUpResponse = await jobSeekerSignUpApi(data);
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
    setJsId('');
    setJsPw('');
    setJsPwCheck('');
    setJsName('');
    setJsJobClass('');
    setJsAge(0);
    setJsCareer(0);
 }

  return (
   <Card sx={{width:"800px",margin:"auto",marginTop:"100px"}}>
        <Box>
           <Typography variant='h5' sx={{
            marginTop:"50px",textAlign:"center",fontFamily:"unset"
           }}>개인 회원가입</Typography>
            <Box sx={{marginTop:"30px",marginBottom:"20px"}}>
                <Button style={{width:"120px",height:"50px",marginLeft:"230px",backgroundColor:"#EEEEEE",color:"black"}} component={Link} to="/JobSeekerSignUp" variant="contained">개인</Button>
                <Button style={{width:"120px",height:"50px",marginLeft:"100px",backgroundColor:"#EEEEEE",color:"black"}} component={Link} to="/JobOffererSignUp" variant="contained">기업</Button>
            </Box>
        </Box>
           <Box display="flex" flexDirection="column" justifyContent="space-between">
               <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}} label="ID" type="text" variant="standard" 
               onChange={(e) =>setJsId(e.target.value)}/>
               <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}} label="Password" type="password" variant="standard" 
               onChange={(e) =>setJsPw(e.target.value)}/>
               <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}} label="PasswordCheck" type="password" variant="standard" 
               onChange={(e) =>setJsPwCheck(e.target.value)}/>
               <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}}label="Name" variant="standard" 
               onChange={(e) => setJsName(e.target.value)}/>
               <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}} label="Job Class" variant="standard"
                onChange={(e) => setJsJobClass(e.target.value)} />
                <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}} label="Age" type='number' variant='standard'
                 onChange={ (e)=>setJsAge(parseInt(e.target.value))} />
                <TextField style={{width:"500px",marginLeft:"auto",marginRight:"auto",marginBottom:"40px"}} label='Career' type='number' variant='standard'
                 onChange={ (e)=>setJsCareer(parseInt(e.target.value))} />
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
