import React, { useEffect,useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { NewComerPostingsApi, JobOfferPostingsByCareerApi, JobOfferPostingsByJobClassApi, JobOfferPostingsByLocationApi } from '../../../apis';
import { Button, Card, CardActionArea, CardContent, FormControl, InputLabel, List, ListItem, Menu, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment';

interface RowData {
    id: string;
    requirementJobClass: string;
    requirementEmployeeNum: number;  
    offerWage: number;
    requiredCareer: number,
    location: string; 
    companyName:string;
    joName:string;
    closingDate: string;
    wagePaymentAbility:number;
    workEnvironment:number;
    workIntensity:number;
    orderValidity:boolean;
  }

const columns: GridColDef[] = [
   { field:'companyName', headerName:'Company Name', width :200, disableColumnMenu: true },
   { field:'requirementJobClass', headerName:'Requirement Job Class', width :200, disableColumnMenu: true },
   { field :'offerWage', headerName : "Offer Wage", type:'number', width :150, disableColumnMenu: true },
   { field:'location', headerName:'Location', width :150, disableColumnMenu: true },
   { field :'requiredCareer', headerName : "Required Career", type:'number' ,width :150, disableColumnMenu: true }
];
const imghandler=(param:any) => {
  if(param=="보링공"){
    return <img width="240px" height="130px" src="assets/images/boring.png"></img>
  }
  else if(param=="보통인부"){
    return <img width="240px" height="130px" src="assets/images/normal.png"></img>
  }
  else if(param=="비계공"){
    return <img width="240px" height="130px" src="assets/images/scaffolder.png"></img>
  }
  else if(param=="용접공"){
    return <img width="240px" height="130px" src="assets/images/welder.png"></img>
  }
  else if(param=="작업반장"){
    return <img width="240px" height="130px" src="assets/images/workleader.png"></img>
  }
  else if(param=="제도사"){
    return <img width="240px" height="130px" src="assets/images/draftsman.png"></img>
  }
  else if(param=="조력공"){
    return <img width="240px" height="130px" src="assets/images/helper.png"></img>
  }
  else if(param=="조적공"){
    return <img width="240px" height="130px" src="assets/images/masonry.png"></img>
  }
  else if(param=="착암공"){
    return <img width="240px" height="130px" src="assets/images/jackhammer.png"></img>
  }
  else if(param=="철골공"){
    return <img width="240px" height="130px" src="assets/images/steelworker.png"></img>
  }
  else if(param=="철공"){
    return <img width="240px" height="130px" src="assets/images/ironworker.png"></img>
  }
  else if(param=="철근공"){
    return <img width="240px" height="130px" src="assets/images/rebar.png"></img>
  }
  else if(param=="철판공"){
    return <img width="240px" height="130px" src="assets/images/ironplate.png"></img>
  }
  else if(param=="콘크리트공"){
    return <img width="240px" height="130px" src="assets/images/concrete.png"></img>
  }
  else if(param=="특별인부"){
    return <img width="240px" height="130px" src="assets/images/specialworker.png"></img>
  }
  else if(param=="포설공"){
    return <img width="240px" height="130px" src="assets/images/laying.png"></img>
  }
  else if(param=="포장공"){
    return <img width="240px" height="130px" src="assets/images/packer.png"></img>
  }
  else if(param=="할석공"){
    return <img width="240px" height="130px" src="assets/images/hatsuri.png"></img>
  }
  else if(param=="형틀목공"){
    return <img width="240px" height="130px" src="assets/images/wood.png"></img>
  }
  else if(param=="화약취급공"){
    return <img width="240px" height="130px" src="assets/images/explosive.png"></img>
  }
}
export default function DataTable() {

    const [rows, setRows] = React.useState<RowData[]>([]);
    const [sortType, setSortType] = useState<keyof RowData | "">( "");
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

    const careers = ['0','1','2'];

    const locations = ['경기도 광명시','경기도 부천시','경기도 성남시 중원구','경기도 수원시 권선구',
    '경기도 수원시 영통구','경기도 수원시 장안구','경기도 수원시 팔달구','경기도 안양시 동안구','경기도 안양시 만안구',
    '경기도 의정부시','경기도 평택시','광주광역시 광산구','광주광역시 동구','광주광역시 북구','대구광역시 남구',
    '대구광역시 동구','대구광역시 북구','대구광역시 서구','대구광역시 중구','대전광역시 대덕구','대전광역시 서구',
    '대전광역시 유성구','대전광역시 중구','부산광역시 남구','부산광역시 동구','부산광역시 동래구','부산광역시 부산진구',
    '부산광역시 북구','부산광역시 서구','부산광역시 영도구','부산광역시 중구','부산광역시 해운대구','서울특별시 광진구',
    '서울특별시 노원구','서울특별시 마포구','서울특별시 서대문구','서울특별시 성동구','서울특별시 성북구','서울특별시 양천구',
    '서울특별시 용산구','서울특별시 은평구','서울특별시 중구','서울특별시 중랑구','울산광역시 남구',
    '울산광역시 동구','울산광역시 북구','울산광역시 울주군','울산광역시 중구','인천광역시 남동구','인천광역시 동구',
    '인천광역시 미추홀구','인천광역시 연수구','인천광역시 중구'];

    const [filterCareer, setFilterCareer] = React.useState<string[]>(['경력']);
    const [filterJobClass, setFilterJobClass] = React.useState<string[]>([]);
    const [filterLocation, setFilterLocation] = React.useState<string[]>([]);
    
    useEffect(() => {
      const fetchData = async () => {
        let data = await NewComerPostingsApi();
    
        if (filterJobClass.length > 0) {
          const responses = await Promise.all(filterJobClass.map(JobOfferPostingsByJobClassApi));
          data = data.filter((item: RowData) => responses.flat().some((response: RowData) => response.id === item.id));
        } 
    
        if (filterCareer.length > 0) {
          data = data.filter((item: RowData) => filterCareer.includes(item.requiredCareer.toString()));
        } 
    
        if (filterLocation.length > 0) {
          const responses = await Promise.all(filterLocation.map(JobOfferPostingsByLocationApi));
          data = data.filter((item: RowData) => responses.flat().some((response: RowData) => response.id === item.id));
        } 
    
        if (data) {
          if(sortType){
            data.sort((a:RowData,b:RowData)=> a[sortType] > b[sortType]?1:-1)
          }
          setRows(data);
        } else{
            console.error("데이터 오류");
            setRows([]);
        }
      };
    
      fetchData();
    }, [filterJobClass, filterCareer, filterLocation,sortType]);
    
    const handleRowClick = (param: any) => {
        console.log('Clicked row ID:', param.id);
        const jobData = rows.find(row => row.id === param.id);
        console.log('Found data:', jobData);
        navigate(`/JobOfferPosting/${param.id}`, { state: { jobData } });
    }

    const handleJobClassChange = async (
        event: SelectChangeEvent<typeof filterJobClass>
      ) => {
        let selectedClasses = event.target.value as typeof filterJobClass;
      
        if(selectedClasses.includes('all')) {
          setFilterJobClass([]);
        } else {
          setFilterJobClass(selectedClasses);
        }
      };
      
      const handleCareerChange = async (event: SelectChangeEvent<string>) => {
        let selectedCareer = event.target.value as string;
      
        if(selectedCareer === "all") {
          setFilterCareer([]);
        } else {
          setFilterCareer([selectedCareer]);
        }
      };
      
      const handleLocationChange = async (
      event: SelectChangeEvent<typeof filterLocation>
      ) => {
      let selectedLocations = event.target.value as typeof filterLocation;
      
      if(selectedLocations.includes('all')) {
        setFilterLocation([]);
      } else {
        setFilterLocation(selectedLocations);
      }
      };

      React.useEffect(() => {
        handleJobClassChange({ target:{value:["all"]}} as any);
        handleCareerChange({ target:{value:"all"}} as any); 
        handleLocationChange({ target:{value:["all"]}} as any); 
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
  <InputLabel>근무 지역</InputLabel>
  <Select style={{width:"200px",borderRadius:"10px"}}
id="location-select"
multiple
value={filterLocation.length === locations.length ? ['all'] : filterLocation}
onChange={handleLocationChange}
>
<MenuItem style={{paddingLeft:"70px"}}value={'all'}>초기화</MenuItem>
{locations.map((location, index) =>
    <MenuItem key={index} value={location}>{`${location}`}</MenuItem>
)}
</Select>
</FormControl>

<FormControl>
  <InputLabel>경력</InputLabel>
<Select style={{width:"100px",borderRadius:"10px"}}
id="career-select"
value={filterCareer.length >= 0 ? filterCareer[0] : "경력"}
onChange={handleCareerChange}
>
<MenuItem style={{paddingLeft:"20px"}}value={"all"}>초기화</MenuItem>
{careers.map((career, index) => 
<MenuItem key={index} value={`${career}`}>{`${career}년`}</MenuItem> 
)}
</Select>
</FormControl>

<Button style={{background:"#f9fafc",marginLeft:"700px"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
  정렬
</Button>
</div>
<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
 <MenuItem onClick={() => {setSortType("requiredCareer"); handleClose();}}>경력순</MenuItem>
 <MenuItem onClick={() => {setSortType("offerWage"); handleClose();}}>임금순</MenuItem>
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
                    {imghandler(row.requirementJobClass)}
                    </div>
                    <p style={{fontFamily:"Pretendard Black",fontWeight:"bold",marginBottom:"12px",fontSize:"20px"}}>{row.requirementJobClass} 모집</p>
                    <p style={{fontFamily:"Pretendard Black",fontSize:"17px",marginTop:"0px",marginBottom:"2px"}}>{row.companyName}</p>
                    <div style={{fontFamily:"Pretendard Black",display:"flex",marginTop:"0px",fontSize:"14px"}}>
                    <p style={{borderRight:"1px solid",borderColor:"#D7DCE5",paddingRight:"5px",marginRight:"5px"}}>{row.location}</p>
                    <p style={{borderRight:"1px solid",borderColor:"#D7DCE5",paddingRight:"5px",marginRight:"5px"}}>{row.offerWage}원</p>
                    <p>{row.requiredCareer}년</p>
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