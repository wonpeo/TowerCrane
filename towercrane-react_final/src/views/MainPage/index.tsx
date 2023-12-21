import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Box, CardActionArea, List, ListItem } from '@mui/material';
import { MainPageApi } from '../../apis';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import moment from 'moment';

interface RowData {
  id: string;
  requirementJobClass: string;
  requirementEmployeeNum: number;  
  offerWage: number;
  requiredCareer: number,
  location: string; 
  companyName:string;
  closingDate: string;
}
interface DataTableProps {
    url: string;
    name: string;
}
const DataTable = ({ url, name }: DataTableProps) => {
    const [rows, setRows] = useState<RowData[]>([]);
    const navigate = useNavigate();

    const handleRowClick = (param:any) => {
        console.log('Clicked row ID:', param.id);
        navigate(`/JobOfferPosting/${param.id}`, { state: { jobData : param } });
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await MainPageApi(url);
            
            if (data !== null) {
                setRows(data);
            }
        };
    
        fetchData();
    }, [url]);

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

    return (
      <div style={{backgroundColor:"#FAFAFA",paddingTop:"100px"}}>
        <div style={{width:"1400px",margin:"auto"}}>
          <p style={{fontFamily:"Pretendard Black",fontWeight:"bold",margin:"0"}}>{name}</p> {/* display the table name */}
          <List>
            <div style={{display:"flex"}}>
            {rows.map((row) => (
              <ListItem>
                <Card sx={{width:"300px",marginBottom:"30px",borderRadius:"10px",fontFamily:"Malgun Gothic",marginTop:"20px"}}>
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
            ))}
            </div>
          </List>  
        </div>  
        </div> 
       );
  }

const MainPage = () => (
   <div>
     <DataTable url="/1stList" name="임금지불 능력 TOP 4"/>
     <DataTable url="/2ndList" name="업무 환경 점수 TOP 4"/>
     <DataTable url="/3rdList" name="업무 강도 점수 TOP 4"/>
     <DataTable url="/4thList" name="명령 타당성 점수 TOP 4"/>
   </div>
);

export default MainPage;
