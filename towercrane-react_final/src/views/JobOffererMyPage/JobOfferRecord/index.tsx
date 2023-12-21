import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JobOffererBusinessRecordApi } from '../../../apis'; 

interface RowData {
  id: string;
  requirementJobClass: string;
  location:string;
  contractDate:string;
}


export default function BasicCard() {
  const [rows, setRows] = React.useState<RowData[]>([]);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'requirementJobClass', headerName: '직종', width: 150 },
    { field: 'location', headerName: '사업장 위치', width: 200 },
    { field: 'contractDate', headerName: '계약일', width: 200 },
    {
      field: 'dName',
      headerName: '상호평가 하러가기',
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              navigate(`/JobSeekerAssessment/${params.row.id}`);
            }}
          >
            상호평가 하러가기
          </Button>
        </strong>
      ),
    }
   
  ];
  
  React.useEffect(() => {

    const fetchData = async () => {
      const joId = localStorage.getItem('joid') || '';
      const data = await JobOffererBusinessRecordApi(joId);
      
      if (data !== null) {
          setRows(data);
      }
    };

    fetchData();
}, []);

  return (
    <div>
    <div style={{float:'right'}}>
    <Card sx={{width: 1200, padding: 7, margin: 5,height:"460px"}}>
    <Typography sx={{ fontSize: 14 }} color="text.secondary"  marginBottom={2} gutterBottom>
        구인 내역
      </Typography>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  </Card>
 </div>   
 
 </div>
  );
}