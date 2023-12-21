import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { InterestedJobOfferPostingsListApi } from '../../../apis';
import { useNavigate } from 'react-router-dom';

interface RowData {
  id: string;
  jobOfferPostingId: string;
  requirementJobClass: string;
  requirementEmployeeNum: number;
  offerWage: number;
  requiredCareer: number;
  location: string;
  companyName: string;
  joName: string;

  wagePaymentAbility: number;
  workEnvironment: number;
  workIntensity: number;
  orderValidity: number;
}

const columns: GridColDef[] = [
  { field: 'companyName', headerName: '기업 이름', width: 200, disableColumnMenu: true },
  { field: 'requirementJobClass', headerName: '요구사항', width: 100, disableColumnMenu: true },
  { field: 'offerWage', headerName: '임금', type: 'number', width: 200, headerAlign: 'center', align: 'center', disableColumnMenu: true },
  { field: 'location', headerName: '지역', width: 250, headerAlign: 'center', align: 'center', disableColumnMenu: true },
  { field: 'requiredCareer', headerName: '경력', type: 'number', width: 300, disableColumnMenu: true },
];

export default function InterestedPostingsPage() {
  const [rows, setRows] = React.useState<RowData[]>([]);
  const navigate = useNavigate();
  const jsId = localStorage.getItem('jsid') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await InterestedJobOfferPostingsListApi(jsId);
        console.log(response);
        console.log(response.data);
        console.log(response.data[0].jobOfferPosting);
        if (response && response.data) {
          const dataWithIds = response.data
            .filter((row: any) => row !== undefined)
            .map((row: any, index: number) => {
              return {
                id: row.interestedJobOfferPostingId || `temp-id-${index}`,
                jobOfferPostingId: row.jobOfferPosting?.jobOfferPostingId || '',
                requirementJobClass: row.jobOfferPosting?.requirementJobClass || '',
                offerWage: row.jobOfferPosting?.offerWage || 0,
                requiredCareer: row.jobOfferPosting?.requiredCareer || 0,
                location: row.jobOfferPosting?.constructionSite?.location || '',
                companyName: row.jobOfferPosting?.constructionSite?.jobOfferer?.companyName || '',
                requirementEmployeeNum: row.jobOfferPosting?.requirementEmployeeNum || 0,
                joName: row.jobOfferPosting?.constructionSite?.jobOfferer?.joName || '',
              };
            });
          setRows(dataWithIds);
        } else {
          console.error('데이터 오류');
          setRows([]);
        }
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    };
    fetchData();
  }, [jsId]);

  const handleRowClick = (param: any) => {
    console.log('Clicked row ID:', param.id);
    const jobData = rows.find((row) => row.id === param.id);
    console.log('Found data:', jobData);
    if (jobData && jobData.jobOfferPostingId) {
      navigate(`/JobOfferPosting/${jobData.jobOfferPostingId}`, { state: { jobData } });
    }
  };

  return (
    <div style={{ height: 'auto', minHeight: '300px', width: '100%', marginTop: '40px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        style={{ height: '640px' }}
        onRowClick={handleRowClick}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 100]}
      />
    </div>
  );
}
