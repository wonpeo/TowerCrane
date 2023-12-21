import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Information() {
  const [value, setValue] = useState<number | null>(2);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [career, setCareer] = useState('');
  const [jobClass, setJobClass] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('username') || '';
    const storedAge = localStorage.getItem('age') || '';
    const storedCareer = localStorage.getItem('career') || '';
    const storedJobClass = localStorage.getItem('jobclass') || '';

    setName(storedName);
    setAge(storedAge);
    setCareer(storedCareer);
    setJobClass(storedJobClass);
  }, []);

  const updateUserInfo = () => {
    localStorage.setItem('username', name);
    localStorage.setItem('age', age);
    localStorage.setItem('career', career);
    localStorage.setItem('jobclass', jobClass);
    alert('회원정보가 수정되었습니다.');
    window.location.reload();
  };

  return (
    <div style={{ float: 'right' }}>
      <Card sx={{ width: 1200, padding: 8, margin: 5, height:510}}>
        <CardContent>
          <h2>개인정보수정</h2>
          <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
            <p style={{ width: 100 }}>이름:</p>
            <TextField
              sx={{ width: 1000 }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
            <p style={{ width: 100 }}>나이:</p>
            <TextField
              sx={{ width: 1000 }}
              id="outlined-basic"
              label="Age"
              variant="outlined"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
            <p style={{ width: 100 }}>경력:</p>
            <TextField
              sx={{ width: 1000 }}
              id="outlined-basic"
              label="Career"
              variant="outlined"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '20]px', alignItems: 'center' }}>
            <p style={{ width: 100 }}>직종:</p>
            <TextField
              sx={{ width: 1000 }}
              id="outlined-basic"
              label="JobClass"
              variant="outlined"
              value={jobClass}
              onChange={(e) => setJobClass(e.target.value)}
            />
          </div>
          <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={updateUserInfo} sx={{ marginTop: '10px', marginLeft: '982px' }}>
          회원정보수정
          </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}