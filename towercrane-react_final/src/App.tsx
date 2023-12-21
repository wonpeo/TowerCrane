import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import JobSeekPosting from './views/Posting/JobSeekPosting';
import JobOfferPosting from './views/Posting/JobOfferPosting'
import NewComerPosting from './views/Posting/NewComerPosting'
import Navigation from './views/Navigation';
import JobSeekerSignUp from './views/Authentication/JobSeekerSignUp'
import JobSeekerSignIn from './views/Authentication/JobSeekerSignIn' 
import JobOffererSignIn from './views/Authentication/JobOffererSignIn' 
import JobOffererSignUp from './views/Authentication/JobOffererSignUp'
import JobOfferPostingDetail from './views/Posting/JobOfferPostingDetail';
import JobSeekPostingDetail from './views/Posting/JobSeekPostingDetail';
import JSMainpage from './views/JobSeekerMyPage/Main'
import JOMainpage from './views/JobOffererMyPage/Main'
import MainPage from './views/MainPage'
import { Box } from '@mui/material';
import JobSeekerAssessment from './views/JobOffererMyPage/Assessment'
import JobOffererAssessment from './views/JobSeekerMyPage/Assessment'

export default function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path='/JobOfferPosting' element={<JobOfferPosting/>}/>
          <Route path='/NewComerPosting' element={<NewComerPosting/>}/>
          <Route path='/JobSeekPosting' element={<JobSeekPosting/>}/>
          <Route path='/JobSeekerSignUp' element={<JobSeekerSignUp/>}/>
          <Route path='/JobOffererSignUp' element={<JobOffererSignUp/>}/>
          <Route path='/JobSeekerSignIn' element={<JobSeekerSignIn/>}/>
          <Route path='/JobOffererSignIn' element={<JobOffererSignIn/>}/>
          <Route path='/' element={<MainPage/>}/>
          <Route path="/JobSeekerAssessment/:contractId" element={<JobSeekerAssessment />} />
          <Route path="/JobOffererAssessment/:contractId" element={<JobOffererAssessment />} />

          <Route path="/JobOfferPosting/:id" element={<JobOfferPostingDetail />} />
          <Route path="/JobSeekPosting/:id" element={<JobSeekPostingDetail />} />
          <Route path="/NewComerPosting/:id" element={<JobOfferPostingDetail />} />
          <Route path='/JSMainpage/*' element={<JSMainpage/>}/>
          <Route path='/JOMainpage/*' element={<JOMainpage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}
