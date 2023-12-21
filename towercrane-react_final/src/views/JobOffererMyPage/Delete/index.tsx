import * as React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Delete(){

    return(
        <div style={{float:'right'}}>
        <Card sx={{width: 1200, padding: 14, margin: 5}}>
            <h3>회원탈퇴</h3>
        <CardContent>
          <div style={{display:'flex',marginBottom:'20px'}}>
         <p style={{width:120}}>비밀번호 확인</p>
         <TextField sx={{width:940}}id="outlined-basic" label="비밀번호 확인" variant="outlined" />
          </div>
                 </CardContent>
                 <Stack spacing={2} direction="row">
                 <Button variant="outlined" sx={{ marginTop: '10px', marginLeft: '982px' }}>회원탈퇴</Button>
    </Stack>
      </Card>
      
     </div>   
    )

}