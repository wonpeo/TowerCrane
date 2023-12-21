import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { JobOfferPostingRecordApi, deleteJobOfferPostingApi } from '../../../apis';

interface RowData {
  id: string; 
  requirementJobClass: string;
  requirementEmployeeNum: number;
  offerWage: number;
  requiredCareer: number;
  location: string; 
  companyName: string;

  joName:string;
  wagePaymentAbility:number;	
  workEnvironment:number;	
  workIntensity:number;	
  orderValidity :number
}

export default function DataTable() {
  
  const [rows, setRows] = React.useState<RowData[]>([]);
  const navigate = useNavigate();
  
const userId = localStorage.getItem('joid');
  
const columns : GridColDef[] = [

    { field:'id', headerName:'게시 아이디', width :200 },
    { field:'companyName', headerName:'기업 이름', width :200  },
    { field:'requirementJobClass', headerName:'요구 직종', width :200 },
    { field :'offerWage', headerName : "임금", type:'number', width :150 },
    { field:'location', headerName:'지역', width :150 },
    { field :'requiredCareer', headerName : "요구 경력", type:'number' ,width :150 }, 
    {
      field: 'delete', headerName: '공고 삭제', sortable: false, width: 100,
        renderCell: (params) => {
            const onClickDeleteButton=async(event : React.MouseEvent<HTMLButtonElement>)=>{
                event.stopPropagation();
                let result=await deleteJobOfferPostingApi(params.id.toString());
                if(result){
                alert('삭제되었습니다.');
                fetchData();
                }else{
                alert('삭제 실패하였습니다.');
                }
                };
                return <button onClick={onClickDeleteButton}>삭제</button>;
                },
                }
                ];
                
                const fetchData=async()=>{
                
                let data=await JobOfferPostingRecordApi(userId || '');
                
                if(data !== null){
                const formattedData = data.map((item:any, index:number) => ({
                id:item.jobOfferPostingId.toString(),
                requirementJobClass:item.requirementJobClass,
                requirementEmployeeNum:item.requirementEmployeeNum,
                offerWage:item.offerWage,
                requiredCareer:item.requiredCareer,
                location:item.constructionSite.location,
                companyName:item.constructionSite.jobOfferer.companyName,
                
                joName:item.constructionSite.jobOfferer.joName,
                wagePaymentAbility: item.constructionSite.jobOfferer.wagePaymentAbility,	
                workEnvironment: item.constructionSite.jobOfferer.workEnvironment,	
                workIntensity: item.constructionSite.jobOfferer.workIntensity,	
                orderValidity :item.constructionSite.jobOfferer.orderValidity
                
                }));
                setRows(formattedData);
                }
                };
                
                React.useEffect(() => {
                fetchData();
                }, [userId]);

 return (
     <div style={{ width: 1200, padding: 20, margin: 17}}>
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

