import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {
  const [jsId, setJsId] = useState<string>('');
  const [jsPw, setJsPw] = useState<string>('');
  const [jsPwCheck, setJsPwCheck] = useState<string>('');
  const [jsName, setJsName] = useState<string>('');
  const [jsJobClass, setJsJobClass] = useState<string>('');
  const [jsAge, setJsAge] = useState<string>('');
  const [jsCareer, setJsCareer] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertProps['severity']>('success');

  const navigate = useNavigate();

  const checkId = (idToCheck: string) => {
    axios.get(`http://localhost:4000/api/auth/checkId/${encodeURIComponent(idToCheck)}`)
      .then((response) => {
        if (response.data.result === false) { // 응답 데이터의 result 값이 false인 경우
          setSnackbarOpen(true);
          setSnackbarMessage(response.data.message); // 응답 메시지 설정
          setSnackbarSeverity('error');
        }
      })
  }
  
  const signUpHandler = () => {

    if (jsPw !== jsPwCheck) {
      setSnackbarOpen(true);
      setSnackbarMessage('비밀번호가 일치하지 않습니다.');
      setSnackbarSeverity('error');
      return;
    }

    const data = {
      jsId,
      jsPw,
      jsPwCheck,
      jsName,
      jsJobClass,
      jsAge,
      jsCareer,
    };

    axios
      .post('http://localhost:4000/api/auth/signUp', data)
      .then((response) => {
        setSnackbarOpen(true);
        setSnackbarMessage('회원가입에 성공했습니다.');
        setSnackbarSeverity('success');
        setTimeout(() => {
          navigate('/');
        }, 1000); // 1초 뒤 페이지 이동
        
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setSnackbarMessage('회원가입에 실패했습니다.');
        setSnackbarSeverity('error');
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Card sx={{ minWidth: 275, maxWidth: '50vw' }}>
        <CardContent>
          <Box>
          <TextField fullWidth label="ID" variant="standard" onChange={(e) => {const value = e.target.value;setJsId(value);
            if (value && value.trim() !== '') {checkId(value);}}} /> 
            <TextField fullWidth label="PW" variant="standard" type="password" onChange={(e) => setJsPw(e.target.value)} />
            <TextField fullWidth label="PW Check" variant="standard" type="password" onChange={(e) => setJsPwCheck(e.target.value)} />
            <TextField fullWidth label="Name" variant="standard" onChange={(e) => setJsName(e.target.value)} />
            <TextField fullWidth label="Job Class" variant="standard" onChange={(e) => setJsJobClass(e.target.value)} />
            <TextField fullWidth label="Age" variant="standard" onChange={(e) => setJsAge(e.target.value)} />
            <TextField fullWidth label="Career" variant="standard" onChange={(e) => setJsCareer(e.target.value)} />
          </Box>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" onClick={() => signUpHandler()}>
            Sign Up
          </Button>
        </CardActions>
        <CardActions>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button fullWidth variant="contained">
              돌아가기
            </Button>
          </Link>
        </CardActions>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => handleCloseSnackbar()}>
      <div> 
        <Alert onClose={() => handleCloseSnackbar()} severity= { snackbarSeverity }>
         { snackbarMessage }
        </Alert> 
     </div>
      </Snackbar>
    </div>
  );
}
