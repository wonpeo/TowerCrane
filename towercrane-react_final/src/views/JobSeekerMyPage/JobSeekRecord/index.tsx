import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JobSeekerBusinessRecordApi } from '../../../apis'; 


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
    { field: 'companyName', headerName: '회사명', width: 150 },
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
              navigate(`/JSMainpage/${params.row.id}`);
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
      const jsId = localStorage.getItem('jsid') || '';
      const data = await JobSeekerBusinessRecordApi(jsId);
      
      if (data !== null) {
          setRows(data);
      }
    };

    fetchData();
}, []);

  return (
    <div>
    <div style={{float:'right'}}>
    <Card sx={{width: 1200, padding: 8, margin: 5, height:510}}>
    <Typography sx={{ fontSize: 14 }} color="text.secondary"  marginBottom={2} gutterBottom>
        근무 내역
      </Typography>
    <div style={{ height: 410, width: '100%' }}>
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