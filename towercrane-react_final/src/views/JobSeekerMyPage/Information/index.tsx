import { Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Information() {
    
    const location = useLocation();
    const [username, setUsername] = useState(location.state?.username || localStorage.getItem('username') || '');
    const [age, setAge] = useState(location.state?.age || localStorage.getItem('age') || '');
    const [jobclass, setJobclass] = useState(location.state?.jobclass || localStorage.getItem('jobclass') || '');
    const [career, setCareer] = useState(location.state?.career || localStorage.getItem('career') || '');
 
    useEffect(() => {
        setUsername(localStorage.getItem('username') || '');
        setAge(localStorage.getItem('age') || '');
        setJobclass(localStorage.getItem('jobclass') || '');
        setCareer(localStorage.getItem('career') || '');
    }, []);

    return (
        <div>
            <div style={{ float: 'right' }}>
                <Card sx={{ width: 1200, padding: 8, margin: 5, height: 510 }}>
                    <CardContent>
                        <div style={{ display: 'flex', marginBottom: '40px', marginTop: 10 }}>
                            <Typography variant="h6" noWrap style={{ width: 50, marginRight: '10px' }}>이름:</Typography>
                            <Typography variant="h6" noWrap>{username}</Typography>
                        </div>
                        <div style={{ display: 'flex', marginBottom: '40px', marginTop: 10 }}>
                            <Typography variant="h6" noWrap style={{ width: 50, marginRight: '10px' }}>나이:</Typography>
                            <Typography variant="h6" noWrap>{age}</Typography>
                        </div>
                        <div style={{ display: 'flex', marginBottom: '40px', marginTop: 10 }}>
                            <Typography variant="h6" noWrap style={{ width: 50, marginRight: '10px' }}>직종:</Typography>
                            <Typography variant="h6" noWrap>{jobclass}</Typography>
                        </div>
                        <div style={{ display: 'flex', marginBottom: '40px', marginTop: 10 }}>
                            <Typography variant="h6" noWrap style={{ width: 50, marginRight: '10px' }}>경력:</Typography>
                            <Typography variant="h6" noWrap>{career}</Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
