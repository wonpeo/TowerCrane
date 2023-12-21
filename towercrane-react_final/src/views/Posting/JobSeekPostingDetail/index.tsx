import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useLocation, useParams }  from 'react-router-dom';
import Rating from '@mui/material/Rating';
import axios  from 'axios';
import {interestedJobSeekPostingApi} from '../../../apis';

function JobSeekPostingDetail() {
  const location = useLocation();
  const data = location.state.jobData;
  console.log('data:', data);

  const inputInterestedJobSeekPostingHandler =async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isLoggedInJo = localStorage.getItem('isLoggedInJo') === 'true';
    const isLoggedInJs = localStorage.getItem('isLoggedInJs') === 'true';
    const joId = localStorage.getItem('joid');
    
    if (isLoggedInJs) {
      alert("구직자는 구직공고를 관심 공고로 등록할 수 없습니다.");
      return;
    }
  
    if (!isLoggedIn || !isLoggedInJo || !joId) {
      alert("관심 공고를 등록하려면 로그인해야 합니다.");
      return;
    }
    const jobSeekPostingId = data?.id;
  
    let set = {
      joId,
      jobSeekPostingId
    }

    try{
      const response = await interestedJobSeekPostingApi(set)
      if(response){
        alert("입력 성공")
      }
      else throw new Error("실패")
    }
    catch(error){
      if (error instanceof Error) {
        console.error(error);
        alert(`관심 공고 등록 실패: ${error.message}`);
      } else {
        console.error(error);
        alert("관심 공고 등록 실패");
      }
    }
  }
  
   return (
    <div>   
    <Box display="flex" flexDirection="column" alignItems="center">
    <Box display="flex" flexDirection="row" gap={2}>
    
    {/* 구직공고 정보 카드 */}
    <Card sx={{ minWidth: "50%", marginTop: "150px"}}>
      <CardContent>
        <Typography sx={{ fontSize: "30px"}} color="text.secondary" gutterBottom>
          구직공고 정보
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow key="jsName">
                <TableCell component="th" scope="row">성명</TableCell>
                <TableCell align="right">{data?.jsName}</TableCell>
              </TableRow>
              <TableRow key="jsJobClass">
                <TableCell component="th" scope="row">직종</TableCell>
                <TableCell align="right">{data?.jsJobClass}</TableCell>
              </TableRow>
              <TableRow key="jsAge">
                <TableCell component="th" scope="row">나이</TableCell>
                <TableCell align="right">{data?.jsAge}</TableCell>
              </TableRow>
              <TableRow key="jsCareer">
                <TableCell component="th" scope="row">경력</TableCell>
                <TableCell align="right">{data?.jsCareer}</TableCell>
              </TableRow>
              <TableRow key="offerWage">
                <TableCell component="th" scope="row">요구 임금</TableCell>
                <TableCell align="right">
                  {
                    data?.offerWage 
                      ? data.offerWage.toLocaleString() 
                      : '요구 임금 정보가 없습니다.'
                  }
                </TableCell>
              </TableRow>
            </TableBody> 
          </Table> 
        </TableContainer> 
      </CardContent>
     </Card>

   {/* 구직자 평가 정보 카드 */}
{data && (
<Card sx={{ minWidth: "50%", marginTop: "150px"}}>
  <CardContent>
    <Typography sx={{ fontSize: "30px"}} color="text.secondary" gutterBottom>
      구직자 평가 정보
    </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow key='workAttitude'>
            <TableCell component='th' scope='row'>업무 태도</TableCell>
            <TableCell align='right'>
              {data.workAttitude ? 
                (<Rating name='work-attitude' value={data.workAttitude} readOnly />) : '평가없음'}
            </TableCell>
          </TableRow>
          <TableRow key='jobPerformance'>
            <TableCell component='th' scope='row'>업무 수행 능력</TableCell>
            <TableCell align='right'>
              {data.jobPerformance ? 
                (<Rating name='job-performance' value={data.jobPerformance} readOnly />) : '평가없음'}
            </TableCell>
          </TableRow>
          <TableRow key='rehiredRate'>
            <TableCell component='th' scope='row'>재고용률</TableCell>
            <TableCell align='right'>
              {data.rehiredRate ? 
                (<Rating name='rehired-rate' value={data.rehiredRate} readOnly />) : '평가없음'}
            </TableCell>
          </TableRow>
          <TableRow key='attendanceRate'>
            <TableCell component='th' scope='row'>근속률</TableCell>
            <TableCell align='right'>
              {data.attendanceRate ? 
                (<Rating name='attendance-rate' value={data.attendanceRate} readOnly />) : '평가없음'}
            </TableCell>
          </TableRow>
        </TableBody> 
      </Table> 
    </TableContainer> 
  </CardContent>
</Card>)}

        </Box> 

     <Card sx={{ minWidth: 275, marginTop:"60px"}}>
     <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" style={{ width: '80%',backgroundColor:"#EEEEEE",color:"black",marginRight:"50px" }}>구인 신청</Button>
        <Button variant="contained" style={{ width: '80%',backgroundColor:"#EEEEEE",color:"black",}} onClick={() => inputInterestedJobSeekPostingHandler()}>관심 공고 등록</Button>
        </CardContent>
        </Card>
    </Box>
    </div>
  );
}

export default JobSeekPostingDetail;
