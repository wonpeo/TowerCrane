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
import { interestedJobOfferPostingApi } from '../../../apis';
import { bookJobOfferPostingApi } from '../../../apis';

function JobOfferPostingDetail() {
  const location = useLocation();
  const data = location.state.jobData;

  const inputInterestedJobOfferPostingHandler =async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isLoggedInJo = localStorage.getItem('isLoggedInJo') === 'true';
    const isLoggedInJs = localStorage.getItem('isLoggedInJs') === 'true';
    const jsId = localStorage.getItem('jsid');
    if (isLoggedInJo) {
      alert("구인자는 구인공고를 관심 공고로 등록할 수 없습니다.");
      return;
    }
  
    if (!isLoggedIn || !isLoggedInJs || !jsId) {
      alert("관심 공고를 등록하려면 로그인해야 합니다.");
      return;
    }
    const jobOfferPostingId = data?.id;

    let set = {
      jsId,
      jobOfferPostingId
    }

    try{
      const response = await interestedJobOfferPostingApi(set)
      if(response){
        alert("입력 성공")
      }
      else throw new Error("실패")
    }
    catch(error){
      if (error instanceof Error) {
        console.error(error);
        alert(`회원가입 실패: ${error.message}`);
      } else {
        console.error(error);
        alert("회원가입 실패");
      }
    }
  }

  const bookJobOfferPostingHandler = async () => {
    const jsId = localStorage.getItem('jsid');
    const jobOfferPostingId = data?.id;

    if (!jsId || !jobOfferPostingId) {
        alert("잘못된 접근입니다.");
        return;
    }
    console.log(data);

    let requestBody = {
      jobOfferPostingId,
      jobSeekPostingId: jsId,
      offerWage: data?.offerWage,
      jsId,
      constructionSiteId: data?.constructionSiteId
    };

    try {
        const response = await bookJobOfferPostingApi(requestBody);
        if (response) {
            alert("구직 신청이 완료되었습니다.");
        } else {
            throw new Error("구직 신청에 실패하였습니다.");
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            alert(`구직 신청 실패: ${error.message}`);
        } else {
            console.error(error);
            alert("구직 신청 실패");
        }
    }
};

   return (
    <div>   
    <Box display="flex" flexDirection="column" alignItems="center">
    <Box display="flex" flexDirection="row" gap={2}>
    
    {/* 구인공고 정보 카드 */}
    <Card sx={{ minWidth: "50%", marginTop: "150px"}}>
      <CardContent>
        <Typography sx={{ fontSize: "30px"}} color="text.secondary" gutterBottom>
          구인공고 정보
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow key="companyName">
                <TableCell component="th" scope="row">사명</TableCell>
                <TableCell align="right">{data?.companyName}</TableCell>
              </TableRow>
              <TableRow key="joName">
                <TableCell component="th" scope="row">대표자 명</TableCell>
                <TableCell align="right">{data?.joName}</TableCell>
              </TableRow>
              <TableRow key="location">
                <TableCell component="th" scope="row">사업장 위치</TableCell>
                <TableCell align="right">{data?.location}</TableCell>
              </TableRow>
              <TableRow key="jobClass">
                <TableCell component="th" scope="row">요구 직종</TableCell>
                <TableCell align="right">{data?.requirementJobClass}</TableCell>
              </TableRow>
              <TableRow key="offerWage">
                <TableCell component="th" scope="row">임금</TableCell>
                <TableCell align="right">{data?.offerWage.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody> 
          </Table> 
        </TableContainer> 
      </CardContent>
     </Card>

   {/* 회사 평가 정보 카드 */}
{data && (
<Card sx={{ minWidth: "50%", marginTop: "150px"}}>
  <CardContent>
    <Typography sx={{ fontSize: "30px"}} color="text.secondary" gutterBottom>
      회사 평가 정보
    </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow key='wagePaymentAbility'>
            <TableCell component='th' scope='row'>임금 지불 능력</TableCell>
            <TableCell align='right'>
              {data.wagePaymentAbility ? 
                (<Rating name='wage-payment-ability' value={data.wagePaymentAbility} readOnly />) : '평가없음'}
            </TableCell>
          </TableRow>
          <TableRow key='workEnvironment'>
            <TableCell component='th' scope='row'>업무 환경</TableCell>
            <TableCell align='right'>
              {data.workEnvironment ? 
                (<Rating name='work-environment' value={data.workEnvironment} readOnly />) : '평가없음'}
            </TableCell>
          </TableRow>
          <TableRow key='workIntensity'>
            <TableCell component='th' scope='row'>업무 강도</TableCell>
            <TableCell align='right'>
              {data.workIntensity ? 
                (<Rating name='work-intensity' value={data.workIntensity} readOnly />) : '평가없음'}
            </TableCell>
          </TableRow>
          <TableRow key='orderValidity'>
            <TableCell component='th' scope='row'>명령 타당성</TableCell>
            <TableCell align='right'>
              {data.orderValidity ? 
                (<Rating name='order-Validity' value={data.orderValidity} readOnly />) : '평가없음'}
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
     <Button variant="contained" style={{ width: '80%' ,backgroundColor:"#EEEEEE",color:"black",marginRight:"50px"}} onClick={bookJobOfferPostingHandler}>구직 신청</Button>
     <Button variant="contained" style={{ width: '80%' ,backgroundColor:"#EEEEEE",color:"black"}} onClick={() => inputInterestedJobOfferPostingHandler()}>관심 공고 등록</Button>
        </CardContent>
        </Card>
    </Box>
    </div>
  );
}

export default JobOfferPostingDetail;