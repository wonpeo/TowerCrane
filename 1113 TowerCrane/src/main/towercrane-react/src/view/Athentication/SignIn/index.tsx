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

export default function SignIn() {
  const [jsId, setJsId] = useState<string>('');
  const [jsPw, setJsPw] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertProps['severity']>('success');

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);   // 로그인 여부
  const [jsName,setJSname]=useState<string>('');       // 사용자 이름

  const navigate = useNavigate();

  const signInHandler = () => {
    const data = {
      jsId,
      jsPw,
    };
    axios
      .post('http://localhost:4000/api/auth/signIn', data)
      .then((response) => {
        if (response.data.token) {
          sessionStorage.setItem('token', response.data.token);
          setIsLoggedIn(true);                          // 로그인 상태 업데이트
          setSnackbarOpen(true);
          setSnackbarMessage('로그인에 성공했습니다.');
          setSnackbarSeverity('success');
          navigate('/'); // 로그인 성공 후 이동할 경로
        }
      })
      .catch((error) => {
          console.log(error);
          setSnackbarOpen(true);
          setSnackbarMessage('로그인에 실패했습니다.');
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
            <TextField fullWidth label="ID" variant="standard" onChange={(e) => setJsId(e.target.value)} />
            <TextField fullWidth label="PW" variant="standard" type="password" onChange={(e) => setJsPw(e.target.value)} />
          </Box>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" onClick={() => signInHandler()}>
            Sign In
          </Button>
        </CardActions>
        {isLoggedIn ? (
          <>
            <p>Welcome back {jsName}!</p> 
              <Button fullWidth variant="contained" onClick={() => setIsLoggedIn(false)}>
                Logout
              </Button>
          </>
) : (
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button fullWidth variant="contained">
            돌아가기
          </Button>
        </Link>
)}
      </Card>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
