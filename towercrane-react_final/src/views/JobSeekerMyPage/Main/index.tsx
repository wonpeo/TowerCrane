import * as React from 'react';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChangingInfo from '../ChangingInfo';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 

import Delete from '../Delete';
import InterestPosting from '../InterestPosting';
import JobSeekPostingRecord from '../JobSeekPostingRecord';
import FixedTerm from '../FixedTermContract';
import JobSeekRecord from '../JobSeekRecord';
import Assessment from '../Assessment';
import Information from '../Information';
import InputJobSeekPosting from '../InputJobSeekPosting';
import Message from '../Message';
import SendMessage from '../SendMessage';

export default function MyPage() {

  const navigate = useNavigate()
  const nav = useNavigate()
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 로그인 상태 확인
  

  const ChangingInfoHandler = () => {
    nav('/JSMainpage/1')
  }
  const InterestPostingHandler = () => {
    nav('/JSMainpage/3')
  }
  const JobSeekPostingRecordHandler = () => {
    nav('/JSMainpage/4')
  }
  const FixedTermHandler = () => {
    nav('/JSMainpage/5')
  }
  const JobOfferRecordHandler = () => {
    nav('/JSMainpage/6')
  }
  const DeleteHandler = () => {
    nav('/JSMainpage/7')
  }
  const InputJobSeekPostingHandler = () => {
    nav('/JSMainpage/8')
  }
  const MessageHandler = () => {
    nav('/JSMainpage/9')
  }
  const SendMessageHandler = () => {
    nav('/JSMainpage/10')
  }
 
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  
  const [open2, setOpen2] = React.useState(true);

  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const [open3, setOpen3] = React.useState(true);

  const handleClick3 = () => {
    setOpen3(!open3);
  };
  

  return (
    <div style={{display:'flex'}}>
    <div style={{float:'left'}}>

    <Card sx={{ width:220, padding: 5  , margin: 5}}>
      
        <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
      <ListItemButton onClick={handleClick}>
  <ListItemText
    primary={<span style={{ fontWeight: 'bold', fontSize: '18px' }}>회원</span>}
  />
  {open ? <ExpandLess /> : <ExpandMore />}
</ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText onClick={() => ChangingInfoHandler()} primary="개인정보수정" />
          </ListItemButton>
          
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick2}>
  <ListItemText primary={<span style={{ fontWeight: 'bold', fontSize: '18px'}}>근로</span>} />
  {open2 ? <ExpandLess /> : <ExpandMore />}
</ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText onClick={() => InterestPostingHandler()} primary="관심 공고" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText onClick={() => JobSeekPostingRecordHandler()} primary="공고 관리" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText onClick={() => InputJobSeekPostingHandler()} primary="공고 등록" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick3}>
  <ListItemText primary={<span style={{ fontWeight: 'bold',fontSize: '18px' }}>기록 조회</span>} />
  {open3 ? <ExpandLess /> : <ExpandMore />}
</ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText onClick={() => JobOfferRecordHandler()}primary="근무 내역 조회" />
          </ListItemButton>
        </List>
        <ListItemButton sx={{ pl: 4 }}>
            <ListItemText onClick={() => MessageHandler()} primary="쪽지함" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText onClick={() => SendMessageHandler()} primary="쪽지보내기" />
          </ListItemButton>
      </Collapse>
      <ListItemButton sx={{ pl: 2 }}>
                <ListItemText onClick={() => DeleteHandler()} primary={<span style={{ fontWeight: 'bold' }}>회원 탈퇴</span>} />
         </ListItemButton>
    </List>
    </Card>
    
    </div>
    <Routes>
    <Route path='/' element={<Information></Information>}></Route>
    <Route path='/1' element={<ChangingInfo></ChangingInfo>}></Route>
    <Route path='/3' element={<InterestPosting></InterestPosting>}></Route>
    <Route path='/4' element={<JobSeekPostingRecord></JobSeekPostingRecord>}></Route>
    <Route path='/5' element={<FixedTerm></FixedTerm>}></Route>
    <Route path='/6' element={<JobSeekRecord></JobSeekRecord>}></Route>
    <Route path='/7' element={<Delete></Delete>}></Route>
    <Route path='/8' element={<InputJobSeekPosting></InputJobSeekPosting>}/>
    <Route path='/9' element={<Message></Message>}/>
    <Route path='/10' element={<SendMessage></SendMessage>}/>
    <Route path="/:contractId" element={<Assessment/>} />
    </Routes>
 </div>
  );
}