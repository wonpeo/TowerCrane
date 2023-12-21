import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { deleteJobSeekPostingApi, JobSeekPostingRecordApi } from '../../../apis';


interface RowData {
  id: string; 
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
export default function JobSeekPostingRecord() {
  
  const [rows, setRows] = React.useState<RowData[]>([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('jsid');
  
  const columns : GridColDef[] = [

    { field:'id', headerName:'작업 게시 아이디', width :200 },
    { field :'offerWage', headerName : "임금", type:'number', width :150 },
    { field :'jsId', headerName : "구직자 아이디", type:'string', width :200 },
    { field :'jsName', headerName : "구직자 이름", type:'string', width :200 },
    {
      field:'delete',
      headerName:'공고 삭제',
      sortable:false,
      width :100,
      renderCell:(params) => {
        const onClickDeleteButton=async(event : React.MouseEvent<HTMLButtonElement>)=>{
            event.stopPropagation();
            
            let result=await deleteJobSeekPostingApi(params.id.toString());
            
             if(result){
               alert('삭제되었습니다.');
               fetchData();
             }else{
               alert('삭제 실패하였습니다.');
             }
          };

        return <button onClick={onClickDeleteButton}>삭제</button>;
      }
    }
];

const fetchData=async()=>{

    let data=await JobSeekPostingRecordApi(userId || '');
    
    if(data !== null){
    const formattedData = data.map((item:any, index:number) => ({
    id:item.jobSeekPostingId.toString(),
    offerWage:item.offerWage,
    jsJobClass:item.jobSeeker.jsJobClass,
    jsAge:item.jobSeeker.jsAge,
    jsCareer:item.jobSeeker.jsCareer,
    jsName:item.jobSeeker.jsName,
    jsId:item.jobSeeker.jsId,
    
    workAttitude: item.workAttitude,
    jobPerformance: item.jobPerformance,
    rehiredRate: item.rehiredRate,
    attendanceRate: item.attendanceRate
    }));
    setRows(formattedData);
    }
    };
    
    React.useEffect(() => {
    fetchData();
    }, [userId]);
  
  

 return (
     <div style={{width: 1200, padding: 8, margin: 5, height:630,marginTop:"40px"}}>
         <DataGrid
             rows={rows}
             columns={columns}
             initialState={{
               pagination:{
                 paginationModel:{page :0 , pageSize :5},
               }
             }}
             pageSizeOptions={[5, 10, 15, 20]}
         />
     </div>
 );
}
