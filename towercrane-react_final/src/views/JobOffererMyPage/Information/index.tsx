import { Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Information() {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [companyname, setCompanyName] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || location.state?.username);
    setCompanyName(localStorage.getItem('companyname') || location.state?.companyname);
  }, []);

  return (
    <div style={{ float: 'right' }}>
      <Card sx={{ width: 1200, padding: 7, margin: 5, height: 470 }}>
        <CardContent>
          <div style={{ display: 'flex', marginBottom: '40px', marginTop: 10 }}>
            <Typography variant="h6" noWrap style={{ width: 100, marginRight: '10px' }}>이름:</Typography>
            <Typography variant="h6" noWrap>{username}</Typography>
          </div>
          <div style={{ display: 'flex', marginBottom: '40px', marginTop: 10 }}>
            <Typography variant="h6" noWrap style={{ width: 100, marginRight: '10px' }}>회사명:</Typography>
            <Typography variant="h6" noWrap>{companyname}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
