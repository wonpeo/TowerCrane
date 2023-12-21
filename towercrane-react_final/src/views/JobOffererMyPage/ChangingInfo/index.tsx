import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { JobOffererChangingInfoApi } from '../../../apis';

export default function Information() {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    setName(localStorage.getItem('username') || '');
    setCompanyName(localStorage.getItem('companyname') || '');
}, []);

  const updateUserInformation = async () => {
    const info = {
      joId: localStorage.getItem('joid'),
      joName: name,
      companyName: companyName
    }

    try {
          await JobOffererChangingInfoApi(info);

          localStorage.setItem('username', name);
          localStorage.setItem('companyname', companyName);

        alert("회원정보가 수정되었습니다.");
    } catch (error) {
          alert("회원정보 수정에 실패하였습니다.");
          console.error(error);
    }
    
    window.location.reload();
};

return (
  <div style={{ float: 'right' }}>
    <Card sx={{ width: 1200, padding: 7, margin: 5, height: 470 }}>
      <Box>
        <Typography variant='h5'>기업 정보 수정</Typography>
      </Box>
      <CardContent>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
            <p style={{ width: 100 }}>이름</p>
            <TextField
              sx={{ width: 1000 }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <p style={{ width: 100 }}>회사명</p>
            <TextField
              sx={{ width: 1000 }}
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
      </CardContent>
      <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={updateUserInformation}  sx={{ marginTop: '10px', marginLeft: '1000px' }}>
            회원정보수정
          </Button>
        </Stack>
      </Card>    
    </div>
);
}