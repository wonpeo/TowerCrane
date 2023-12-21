import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { JobSeekerBusinessRecordApi, getMessageList, getMessageRecord } from '../../../apis'; 


interface RowData {
  messageId: string;
  messageTitle: string;
  messageContents:string;
  senderId:string;
  receiverId:string;
}

export default function BasicCard() {
  const [rows, setRows] = React.useState<RowData[]>([]);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'messageId', headerName: 'ID', width: 150 },
    { field: 'messageTitle', headerName: '제목', width: 200 },
    { field: 'messageContents', headerName: '내용', width: 200 },
    { field: 'senderId', headerName: '송신자', width: 200 },
    { field: 'receiverId', headerName: '수신자', width: 300 }
  ];
  React.useEffect(() => {
    const fetchData = async () => {
      const jsId = localStorage.getItem('jsid') || '';
      const data = await getMessageList(jsId);
      if (data !== null) {
          setRows(data);
      }
    };

    fetchData();
}, []);

  return (
    <div>
    <div style={{float:'right'}}>
    <Card sx={{width: 1200, padding: 12, margin: 5, height:440,marginTop:"40px"}}>
    <Typography sx={{ fontSize: 14 }} color="text.secondary"  marginBottom={2} gutterBottom>
        받은 쪽지
      </Typography>
    <div style={{ height: 400, width: '100%' ,marginTop:'10px'}}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.messageId}
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