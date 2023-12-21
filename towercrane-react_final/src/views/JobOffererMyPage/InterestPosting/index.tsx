import React, { useEffect,useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { InterestedJobSeekPostingsListApi } from '../../../apis'; 
import { useNavigate } from "react-router-dom";
import { Card, Typography } from '@mui/material';


interface RowData {
  id: string;
  jobSeekPostingId: string; 
  offerWage: number;
  jsJobClass: string;
  jsAge: number;
  jsCareer: number;
  jsName: string; 
  jsId: string;
  workAttitude: number;
  jobPerformance: number;
  rehiredRate: number;
  attendanceRate: number;
}

const columns: GridColDef[] = [
  { field:'id', headerName:'아이디', width: 200, disableColumnMenu: true },
  { field:'offerWage', headerName:'임금', type:'number', width:150, disableColumnMenu: true },
  { field:'jsId', headerName:'구직자 아이디', type:'string', width:200, disableColumnMenu: true },
  { field:'jsName', headerName:'구직자 이름', type:'string', width:200, disableColumnMenu: true },
];

export default function InterestedPostingsPage() { 
  const [rows, setRows] = React.useState<RowData[]>([]);
  const navigate = useNavigate();
  const joId = localStorage.getItem('joid') || ''; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await InterestedJobSeekPostingsListApi(joId);
        console.log(response);
        console.log(response.data); 
        if (response && response.data) {  
          const dataWithIds = response.data
  .filter((row: any) => row !== undefined) 
  .map((row: any, index: number) => {
    return {
      id: row.interestedJobSeekPostingId || `temp-id-${index}`, 
      jobSeekPostingId : row.jobSeekPosting?.jobSeekPostingId || '',
      offerWage: row.jobSeekPosting?.offerWage || 0,
      jsId: row.jobSeekPosting?.jobSeeker?.jsId || '',
      jsJobClass: row.jobSeekPosting?.jobSeeker?.jsJobClass || '',
      jsAge: row.jobSeekPosting?.jobSeeker?.jsAge || 0,
      jsCareer: row.jobSeekPosting?.jobSeeker?.jsCareer || 0,
      jsName: row.jobSeekPosting?.jobSeeker?.jsName || '',
      workAttitude: row.jobSeekPosting?.workAttitude || 0,
      jobPerformance: row.jobSeekPosting?.jobPerformance || 0,
      rehiredRate: row.jobSeekPosting?.rehiredRate || 0,
      attendanceRate: row.jobSeekPosting?.attendanceRate || 0,
    };
  });
          setRows(dataWithIds);
        } else {
          console.error("데이터 오류");
          setRows([]);
        }
                
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };    
    fetchData();
  }, [joId]);

  const handleRowClick = (param: any) => {
    console.log('Clicked row ID:', param.id);
    const jobData = rows.find(row => row.id === param.id);
    console.log('Found data:', jobData);
    if (jobData && jobData.jobSeekPostingId) {
      navigate(`/JobSeekPosting/${jobData.jobSeekPostingId}`, { state: { jobData } });
    }
}
           
  return (
      <Card sx={{width: 1200, padding: 10, height:415,marginTop:"40px"}}>
           <Typography sx={{ fontSize: 14 }} color="text.secondary"  marginBottom={2} gutterBottom>
        관심 공고
      </Typography>
      <div style={{ height: 420, width: '100%' ,marginTop:'10px'}}>
  <DataGrid
  rows={rows}
  columns={columns}
  onRowClick={handleRowClick}
  getRowId={(row) => row.id}
  initialState={{
    pagination:{
      paginationModel:{page:0, pageSize:5},
    }
  }}
  pageSizeOptions={[5,10,15,20,100]}
/>
</div>
</Card>
  );
  
}
