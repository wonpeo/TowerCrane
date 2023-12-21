import React, { useEffect,useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { JobSeekPostingsApi, JobSeekPostingsByJobClassApi, JobSeekPostingsByCareerApi } from '../../../apis';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardContent, FormControl, InputLabel, List, ListItem, Menu, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment';

interface RowData {
  id: string;
  jobSeekPostingId: string; 
  offerWage: number;
  jsJobClass: string;
  jsAge: number;
  jsCareer: number;
  jsName: string; 
  jsId: string;
  closingDate: string;
  workAttitude: number;
  jobPerformance: number;
  rehiredRate: number;
  attendanceRate: number;
}

const columns: GridColDef[] = [
    { field:'id', headerName:'ID', width :200, disableColumnMenu: true },
    { field :'offerWage', headerName : "Offer Wage", type:'number', width :150, disableColumnMenu: true},
    { field :'jsId', headerName : "Related Job Seeker ID", type:'string', width :200, disableColumnMenu: true },
    { field :'jsName', headerName : "Job Seeker Name", type:'string', width :200, disableColumnMenu: true },
  ];

export default function DataTable() {
  
  const [rows, setRows] = React.useState<RowData[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">( "");
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const jobClasses = ['보링공', '보통인부', '비계공', '용접공', '작업반장', '제도사', 
                      '조력공','조적공','착암공','철골공','철공',
                      '철근공','철판공','콘크리트공','특별인부',
                      '포설공','포장공','할석공 ','형틀목공 ','화약취급공'];

  const careers = ['0','1','2','3','4','5','6','7',
                   '8','9','10','11','12','13',
                  '14', '15', '16', '17', '18', '19', '20'];
  
  const [filterJobClass, setFilterJobClass] = React.useState<string[]>([]);
  const [filterCareer, setFilterCareer] = React.useState<string[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      let data;
  
      if (filterJobClass.length === 0 && filterCareer.length === 0) {
        data = await JobSeekPostingsApi();
      } else if (filterJobClass.length > 0 && filterCareer.length === 0) {
        const responses = await Promise.all(filterJobClass.map(JobSeekPostingsByJobClassApi));
        data = responses.flat();
      } else if (filterJobClass.length === 0 && filterCareer.length > 0) {
        data = await JobSeekPostingsByCareerApi(Number(filterCareer[0]));
      } else {
        const jobResponses = await Promise.all(filterJobClass.map(JobSeekPostingsByJobClassApi));
        const careerData = await JobSeekPostingsByCareerApi(Number(filterCareer[0]));
  
        data = jobResponses.flat().filter((jobData: RowData) =>
          careerData.some((careerData: RowData) => careerData.id === jobData.id)
        );
      }
  
      if(data){
          setRows(data);
      }else{
          console.error("데이터 오류");
          setRows([]);
      }

      if (data) {
        if (sortOrder === "asc") {
          data.sort((a: RowData,b: RowData) => a.offerWage - b.offerWage);
        } else if (sortOrder === "desc") {
          data.sort((a: RowData,b: RowData) => b.offerWage - a.offerWage);
        }
  
        setRows(data);
      } else{
          console.error("데이터 오류");
          setRows([]);
      }
  };
  
  fetchData();
  }, [filterJobClass, filterCareer, sortOrder]);
  
  const handleRowClick = (param: any) => {
      console.log('Clicked row ID:', param.id);
      const jobData = rows.find(row => row.id === param.id);
      console.log('Found data:', jobData);
      navigate(`/JobSeekPosting/${param.id}`, { state: { jobData } });
  }

  const [displayFilter, setDisplayFilter] = React.useState<string>('전체직종');

  const handleJobClassChange = async (event: SelectChangeEvent<typeof filterJobClass>) => {
    const selectedClasses = event.target.value as typeof filterJobClass;
    
    if(selectedClasses.includes('all')) {
      if(filterJobClass.length === jobClasses.length) { 
        setFilterJobClass([]);
        setDisplayFilter('전체직종');
      } else {
        setFilterJobClass(jobClasses);
        setDisplayFilter('전체직종');
      }
      
      const data = await JobSeekPostingsApi();
      if(data){
          setRows(data);
      }else{
          console.error("데이터 오류");
          setRows([]);
      }
    } else {
      setFilterJobClass(selectedClasses);
      
      if (selectedClasses.length > 0) {
        const responses = await Promise.all(selectedClasses.map(JobSeekPostingsByJobClassApi));
    
        let newRows: any[] = [];
  
        responses.forEach(response => {
          if(response) newRows.push(...response);
        });
  
        setRows(newRows);
  
        setDisplayFilter(selectedClasses.join(', '));
        
       } else {
         const data = await JobSeekPostingsApi();
         if(data){
             setRows(data);
         }else{
             console.error("데이터 오류");
             setRows([]);
         }
       }
     }
  
  };

  const handleCareerChange = async (event: SelectChangeEvent<string>) => {
    const selectedCareer = event.target.value as string;

    if(selectedCareer === "all") {
      setFilterCareer([]);
    
      const data = await JobSeekPostingsApi();
      if(data){
          setRows(data);
      }else{
          console.error("데이터 오류");
          setRows([]);
      }
    } else {
        setFilterCareer([selectedCareer]);
    
        let data=await JobSeekPostingsByCareerApi(Number(selectedCareer)); 
    
        if (data) {
             setRows(data);
             setDisplayFilter(`${selectedCareer}년 이상`);
        } else {
            console.error("데이터 오류");
            setDisplayFilter('전체경력');
            setRows([]);
        }
     }
  
  };
  
  React.useEffect(() => {
    handleJobClassChange({ target:{value:["all"]}} as any);
    handleCareerChange({ target:{value:"all"}} as any); 
  }, []);

return (
<div style={{backgroundColor:"#FAFAFA"}}>
<div style={{margin:"auto",width:"1400px"}}>
<div style={{display:"flex",paddingTop:"50px",paddingBottom:"50px",paddingLeft:"15px"}}>

<FormControl style={{marginRight:"10px"}}>
  <InputLabel>직종</InputLabel>
<Select style={{width:"200px",borderRadius:"10px"}}
    id="job-class-select"
    multiple
    value={filterJobClass.length === jobClasses.length ? ['all'] : filterJobClass}
    onChange={handleJobClassChange}
>
<MenuItem style={{paddingLeft:"70px"}} value={'all'}>초기화</MenuItem>
{jobClasses.map((jobClas, index) =>
    <MenuItem key={index} value={jobClas}>{`${jobClas}`}</MenuItem>
)}
</Select>
</FormControl>

<FormControl style={{marginRight:"10px"}}>
  <InputLabel>경력</InputLabel>
<Select style={{width:"100px",borderRadius:"10px"}}
value={filterCareer.length >= 0 ? filterCareer[0] : "all"}
onChange={handleCareerChange}
>
<MenuItem style={{paddingLeft:"20px"}} value={"all"}>초기화</MenuItem>
{careers.map((career, index) => 
<MenuItem key={index} value={`${career}`}>{`${career}년`}</MenuItem> 
)}
</Select>
</FormControl>

<Button style={{background:"#f9fafc",marginLeft:"900px"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
  정렬
</Button>
</div>
<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
 <MenuItem onClick={() => {setSortOrder("asc"); handleClose();}}>오름차순</MenuItem>
 <MenuItem onClick={() => {setSortOrder("desc"); handleClose();}}>내림차순</MenuItem>
</Menu>
          <List>
            <div style={{width:"1400px",margin:"auto",display:"flex",flexWrap:"wrap"}}>
            {rows.map((row) => (
              <div>
              <ListItem>
                <Card sx={{width:"300px",marginBottom:"30px",borderRadius:"10px",fontFamily:"Malgun Gothic"}}>
                <CardActionArea onClick={() => handleRowClick(row)}>
                <CardContent>
                    <div style={{textAlign:"center"}}>
                    <img width="150px" height="130px" src="assets/images/personimg.png"></img>
                    </div>
                    <p style={{fontFamily:"Pretendard Black",fontWeight:"bold",marginBottom:"12px",fontSize:"20px"}}>{row.jsName}</p>
                    <p style={{fontFamily:"Pretendard Black",fontSize:"17px",marginTop:"0px",marginBottom:"2px"}}>{row.jsJobClass}</p>
                    <div style={{fontFamily:"Pretendard Black",display:"flex",marginTop:"0px",fontSize:"14px"}}>
                    <p style={{borderRight:"1px solid",borderColor:"#D7DCE5",paddingRight:"5px",marginRight:"5px"}}>{row.jsAge}세</p>
                    <p>{row.jsCareer}년차</p>
                    </div>
                    <p>마감일: {moment(row.closingDate, 'YYYY-MM-DD').toDate().toLocaleDateString()}</p>
                </CardContent>
                </CardActionArea>
                </Card>
              </ListItem>
              </div>   
            ))}
            </div>
          </List>
          </div>  
</div>
);
}
