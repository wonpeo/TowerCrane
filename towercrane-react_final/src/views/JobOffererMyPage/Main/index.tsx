import * as React from 'react';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom"; 
import JobOfferPostingRecord from '../JobOfferPostingRecord';
import JobOfferRecord from '../JobOfferRecord';
import InterestPosting from '../InterestPosting';
import Assessment from '../Assessment';
import Delete from '../Delete';
import Information from '../Information';
import ChangingInfo from '../ChangingInfo';
import Message from '../Message';
import SendMessage from '../SendMessage';
import InputJobOfferPosting from '../InputJobOfferPosting';

export default function BasicCard() {
    const nav = useNavigate()
  
    const ChangingInfoHandler = () => {
      nav('/JoMainpage/1')
    }
    const JobOfferPostingRecordHandler = () => {
      nav('/JoMainpage/2')
    }
    const InterestHandler = () => {
      nav('/JoMainpage/3')
    }
    const JobOfferRecordHandler = () => {
      nav('/JoMainpage/4')
    }
    const DeleteHandler = () => {
      nav('/JoMainpage/5')
    }
    const MessageHandler = () => {
      nav('/JoMainpage/6')
    }
    const InputJobOfferPostingHandler = () => {
      nav('/JoMainpage/7')
    }
    const SendMessageHandler = () => {
      nav('/JoMainpage/8')
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
    return(
        <div style={{display:'flex'}}>
        <div style={{float:'left'}}>
    
        <Card sx={{ width:220, padding: 5  , margin: 5}}>
          
            <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
         
        >
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>기업 회원</span>} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText  onClick={() => ChangingInfoHandler()} primary="회원 정보 수정" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText onClick={() => JobOfferPostingRecordHandler()} primary="공고 관리" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick2}>
            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>근로</span>} />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText onClick={() => InterestHandler()} primary="관심 공고" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText onClick={() => JobOfferRecordHandler()} primary="구인내역" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText onClick={() => InputJobOfferPostingHandler()} primary="공고등록" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton sx={{ pl: 4 }}>
             <ListItemText onClick={() => MessageHandler()} primary="쪽지함" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
             <ListItemText onClick={() => SendMessageHandler()} primary="쪽지보내기" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 2 }}>
                <ListItemText onClick={() => DeleteHandler()} primary={<span style={{ fontWeight: 'bold' }}>회원 탈퇴</span>} />
              </ListItemButton>
        </List>
        </Card>
        </div>
        <Routes>
        <Route path='/' element={<Information></Information>}></Route>
        <Route path='/1' element={<ChangingInfo></ChangingInfo>}></Route>
        <Route path='/2' element={<JobOfferPostingRecord></JobOfferPostingRecord>}></Route>
        <Route path='/3' element={<InterestPosting></InterestPosting>}></Route>
        <Route path='/4' element={<JobOfferRecord></JobOfferRecord>}></Route>
        <Route path='/5' element={<Delete></Delete>}></Route>
        <Route path='/6' element={<Message></Message>}></Route>
        <Route path='/8' element={<SendMessage></SendMessage>}></Route>
        <Route path='/7' element={<InputJobOfferPosting></InputJobOfferPosting>}/>
        <Route path="/:contractId" element={<Assessment></Assessment>} />
    </Routes>
     </div>
    );
}
