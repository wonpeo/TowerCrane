import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'ApplicationDate', headerName: '신청일', width: 200 },
  { field: 'Period', headerName: '기간', width: 200 },
  { field: 'ContractEnd', headerName: '계약 종료', width: 300 },
  { field: 'ReceiptState', headerName: '접수상태',width: 200,},

];

const rows = [
  { id:'1', ApplicationDate:'OO월OO일', Period: 'OO일', ContractEnd: 'OO월OO일', ReceiptState: '접수중' },
  { id:'2', ApplicationDate:'OO월OO일', Period: 'OO일', ContractEnd: 'OO월OO일', ReceiptState: '마감' },
  { id:'3', ApplicationDate:'OO월OO일', Period: 'OO일', ContractEnd: 'OO월OO일', ReceiptState: '접수중' },
  { id:'4', ApplicationDate:'OO월OO일', Period: 'OO일', ContractEnd: 'OO월OO일', ReceiptState: '마감' },
  { id:'5', ApplicationDate:'OO월OO일', Period: 'OO일', ContractEnd: 'OO월OO일', ReceiptState: '마감' },
  { id:'6', ApplicationDate:'OO월OO일', Period: 'OO일', ContractEnd: 'OO월OO일', ReceiptState: '접수중' },
  { id:'7', ApplicationDate:'OO월OO일', Period: 'OO일', ContractEnd: 'OO월OO일', ReceiptState: '마감' },
  { id:'8', ApplicationDate:'OO월OO일', Period: 'OO일', ContractEnd: 'OO월OO일', ReceiptState: '접수중' },
  { id:'9', ApplicationDate:'OO월OO일', Period: 'OO일', ContractEnd: 'OO월OO일', ReceiptState: '마감' },
  { id:'10', ApplicationDate:'OO월OO일', Period: 'OO일', ContractEnd: 'OO월OO일', ReceiptState: '접수중' },

];


export default function FixedTerm() {
  return (
    <Card sx={{width: 1200, padding: 8, margin: 5, height:510}}>
    <CardContent>
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
        // 클릭시 선택하는 체크박스 여부.
        // checkboxSelection
      />
    </div>
    </CardContent>
    </Card> 
  );
}